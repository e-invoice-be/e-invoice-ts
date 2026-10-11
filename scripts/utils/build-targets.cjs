// @ts-check
// Compiles `tsconfig.build.json` of the current directory one time for each
// target (CommonJS -> `.js`/`.d.ts`, ES modules -> `.mjs`/`.d.mts`).
//
// Usage: node build-targets.cjs [--share-helpers=<path in outDir, no extension>]
//
// For each target, this script:
// - adds the target extension to all relative import/export/require specifiers,
//   in the JavaScript output and in the declaration output;
// - renames the output files and updates the source map references;
// - with `--share-helpers`, makes TypeScript import its helpers, points these
//   imports to one generated file in the output and writes only the helpers
//   that are used into that file. Thus `tslib` is not necessary at runtime.
const path = require('path');

const cwd = process.cwd();
/** @type {typeof import('typescript')} */
const ts = require(require.resolve('typescript', { paths: [cwd] }));

const TARGETS = [
  { extname: '.js', declExtname: '.d.ts', module: 'commonjs' },
  { extname: '.mjs', declExtname: '.d.mts', module: 'esnext' },
];
const PROJECT = 'tsconfig.build.json';

const shareHelpersArg = process.argv.slice(2).find((arg) => arg.startsWith('--share-helpers='));
const shareHelpers = shareHelpersArg ? shareHelpersArg.slice('--share-helpers='.length) : undefined;

const formatHost = {
  getCurrentDirectory: () => cwd,
  getCanonicalFileName: (/** @type {string} */ fileName) => fileName,
  getNewLine: () => ts.sys.newLine,
};

/** @param {readonly import('typescript').Diagnostic[]} diagnostics */
function report(diagnostics) {
  if (diagnostics.length) {
    process.stderr.write(ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost));
  }
  return diagnostics.some((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
}

/** @param {string} input @param {string} suffix */
function trimSuffix(input, suffix) {
  return input.endsWith(suffix) ? input.slice(0, input.length - suffix.length) : input;
}

/** @param {string} from @param {string} to */
function relativeSpecifier(from, to) {
  const relative = path.relative(from, to).split(path.sep).join('/');
  return /^\.?\.?\//.test(relative) ? relative : './' + relative;
}

/**
 * Returns the source of the given `tslib` helpers and of the declarations that
 * they use, as an ES module.
 *
 * @param {Set<string>} helpersNeeded
 */
function getHelpersSource(helpersNeeded) {
  const tslibPath = require.resolve('tslib/tslib.es6.mjs', { paths: [cwd] });
  const tslib = ts.createSourceFile(
    tslibPath,
    /** @type {string} */ (ts.sys.readFile(tslibPath)),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );

  /** @type {Map<string, import('typescript').Statement>} */
  const declarations = new Map();
  for (const statement of tslib.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      declarations.set(statement.name.text, statement);
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) declarations.set(declaration.name.text, statement);
      }
    }
  }

  /** @type {Set<import('typescript').Statement>} */
  const used = new Set();
  /** @param {string} name */
  const use = (name) => {
    const statement = declarations.get(name);
    if (!statement) throw new Error(`tslib has no helper with the name ${name}`);
    if (used.has(statement)) return;
    used.add(statement);
    /** @param {import('typescript').Node} node */
    const visit = (node) => {
      if (ts.isIdentifier(node) && declarations.has(node.text)) use(node.text);
      ts.forEachChild(node, visit);
    };
    visit(statement);
  };
  for (const name of helpersNeeded) use(name);

  const printer = ts.createPrinter({ removeComments: true });
  const code = tslib.statements
    .filter((statement) => used.has(statement))
    .map((statement) => {
      const text = printer.printNode(ts.EmitHint.Unspecified, statement, tslib);
      return text.replace(/^export /, '');
    });
  return `${code.join('\n\n')}\n\nexport { ${[...helpersNeeded].join(', ')} };\n`;
}

/**
 * @param {object} options
 * @param {string} options.extname
 * @param {string | undefined} options.helpersPath absolute path of the shared helpers file, in the source tree
 * @param {Set<string>} options.helpersNeeded
 * @returns {import('typescript').TransformerFactory<any>}
 */
function createTransformer({ extname, helpersPath, helpersNeeded }) {
  const { factory } = ts;

  /**
   * @param {import('typescript').TransformationContext} ctx
   * @param {import('typescript').SourceFile} sourceFile
   * @param {import('typescript').Expression} node
   */
  function updateModuleSpecifier(ctx, sourceFile, node) {
    if (!ts.isStringLiteral(node)) return node;
    if (!node.text.startsWith('./') && !node.text.startsWith('../')) return node;

    const ext = path.extname(node.text);
    if (ext === '.mjs' || ext === '.cjs') return node;
    if (ext === '.json' && ctx.getCompilerOptions().resolveJsonModule) return node;

    const base = ext === '.js' ? trimSuffix(node.text, '.js') : node.text;
    const resolved = path.resolve(path.dirname(sourceFile.fileName), base);
    if (
      !ts.sys.fileExists(`${resolved}.ts`) &&
      !ts.sys.fileExists(`${resolved}.js`) &&
      ts.sys.directoryExists(path.resolve(path.dirname(sourceFile.fileName), node.text))
    ) {
      return factory.createStringLiteral(`${node.text}/index${extname}`);
    }
    return factory.createStringLiteral(`${base}${extname}`);
  }

  return (ctx) => {
    /** @type {import('typescript').SourceFile} */
    let sourceFile;

    /** @param {import('typescript').Expression} node */
    const isTslib = (node) => helpersPath !== undefined && ts.isStringLiteral(node) && node.text === 'tslib';
    /** @param {import('typescript').Expression} node */
    const rewrite = (node) =>
      isTslib(node) ?
        factory.createStringLiteral(
          relativeSpecifier(path.dirname(sourceFile.fileName), /** @type {string} */ (helpersPath)),
        )
      : updateModuleSpecifier(ctx, sourceFile, node);

    /** @type {import('typescript').Visitor} */
    const visitor = (node) => {
      if (ts.isImportDeclaration(node)) {
        return factory.updateImportDeclaration(
          node,
          node.modifiers,
          node.importClause,
          rewrite(node.moduleSpecifier),
          node.attributes,
        );
      }
      if (ts.isExportDeclaration(node)) {
        if (!node.moduleSpecifier) return node;
        return factory.updateExportDeclaration(
          node,
          node.modifiers,
          node.isTypeOnly,
          node.exportClause,
          updateModuleSpecifier(ctx, sourceFile, node.moduleSpecifier),
          node.attributes,
        );
      }
      if (
        ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
          (ts.isIdentifier(node.expression) && node.expression.escapedText === 'require'))
      ) {
        const [firstArg, ...restArgs] = node.arguments;
        if (!firstArg) return node;
        const isRequire = node.expression.kind !== ts.SyntaxKind.ImportKeyword;
        return factory.updateCallExpression(node, node.expression, node.typeArguments, [
          isRequire ? rewrite(firstArg) : updateModuleSpecifier(ctx, sourceFile, firstArg),
          ...restArgs,
        ]);
      }
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
        return factory.updateImportTypeNode(
          node,
          factory.createLiteralTypeNode(
            /** @type {import('typescript').StringLiteral} */ (
              updateModuleSpecifier(
                ctx,
                sourceFile,
                /** @type {import('typescript').Expression} */ (node.argument.literal),
              )
            ),
          ),
          node.attributes,
          node.qualifier,
          node.typeArguments,
          node.isTypeOf,
        );
      }
      return ts.visitEachChild(node, visitor, ctx);
    };

    /** @param {import('typescript').SourceFile} file */
    const transformFile = (file) => {
      sourceFile = file;
      if (helpersPath !== undefined) {
        // `emitNode` is internal to TypeScript. It holds the helpers that
        // TypeScript imports from `tslib` for this file.
        for (const helper of /** @type {any} */ (file).emitNode?.helpers ?? []) {
          if (!helper.scoped && helper.importName) helpersNeeded.add(helper.importName);
        }
      }
      return ts.visitNode(file, visitor);
    };

    return (file) =>
      ts.isBundle(file) ? factory.createBundle(file.sourceFiles.map(transformFile)) : transformFile(file);
  };
}

/** @param {(typeof TARGETS)[number]} target */
function buildTarget(target) {
  const { extname, declExtname } = target;
  /** @type {import('typescript').CompilerOptions} */
  const overrides = ts.convertCompilerOptionsFromJson({ module: target.module }, cwd).options;
  if (shareHelpers) overrides.importHelpers = true;

  let configFailed = false;
  const config = ts.getParsedCommandLineOfConfigFile(path.resolve(cwd, PROJECT), overrides, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      configFailed = true;
      report([diagnostic]);
    },
  });
  if (!config || configFailed) return false;

  const outDir = config.options.outDir;
  if (shareHelpers && !outDir) throw new Error('outDir must be set when --share-helpers is used');
  const helpersPath =
    shareHelpers ?
      path.resolve(ts.getCommonSourceDirectoryOfConfig(config, false), shareHelpers + extname)
    : undefined;
  /** @type {Set<string>} */
  const helpersNeeded = new Set();

  /** @param {string} file */
  const rewritePath = (file) => {
    if (file.endsWith('.d.ts')) return trimSuffix(file, '.d.ts') + declExtname;
    if (file.endsWith('.d.ts.map')) return trimSuffix(file, '.d.ts.map') + declExtname + '.map';
    if (file.endsWith('.js')) return trimSuffix(file, '.js') + extname;
    if (file.endsWith('.js.map')) return trimSuffix(file, '.js.map') + extname + '.map';
    return file;
  };
  /** @param {string} file @param {string} data */
  const rewriteData = (file, data) => {
    if (file.endsWith('.js') || file.endsWith('.d.ts')) {
      return data.replace(
        /\/\/# sourceMappingURL=(.+)/g,
        (_, url) => `//# sourceMappingURL=${rewritePath(url)}`,
      );
    }
    if (file.endsWith('.js.map') || file.endsWith('.d.ts.map')) {
      const json = JSON.parse(data);
      json.file = rewritePath(json.file);
      return JSON.stringify(json);
    }
    return data;
  };

  const program = ts.createProgram({
    rootNames: config.fileNames,
    options: config.options,
    projectReferences: config.projectReferences,
    configFileParsingDiagnostics: config.errors,
  });
  const transformer = createTransformer({ extname, helpersPath, helpersNeeded });
  const emitResult = program.emit(
    undefined,
    (file, data, writeByteOrderMark) =>
      ts.sys.writeFile(rewritePath(file), rewriteData(file, data), writeByteOrderMark),
    undefined,
    false,
    { after: [transformer], afterDeclarations: [transformer] },
  );

  if (shareHelpers && outDir) {
    const { outputText } = ts.transpileModule(getHelpersSource(helpersNeeded), {
      compilerOptions: { module: config.options.module },
      fileName: 'helpers.js',
      reportDiagnostics: false,
    });
    ts.sys.writeFile(path.resolve(outDir, shareHelpers + extname), outputText, false);
  }

  const failed = report(
    ts.sortAndDeduplicateDiagnostics([...ts.getPreEmitDiagnostics(program), ...emitResult.diagnostics]),
  );
  return !failed;
}

let ok = true;
for (const target of TARGETS) {
  if (!buildTarget(target)) ok = false;
}
process.exit(ok ? 0 : 1);
