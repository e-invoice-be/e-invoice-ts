import { parseCLIOptions } from '../src/options';

// Mock process.argv
const mockArgv = (args: string[]) => {
  const originalArgv = process.argv;
  process.argv = ['node', 'test.js', ...args];
  return () => {
    process.argv = originalArgv;
  };
};

describe('parseCLIOptions', () => {
  it('default parsing should be stdio', () => {
    const cleanup = mockArgv([]);

    const result = parseCLIOptions();

    expect(result.transport).toBe('stdio');

    cleanup();
  });

  it('using http transport with a port', () => {
    const cleanup = mockArgv(['--transport=http', '--port=2222']);

    const result = parseCLIOptions();

    expect(result.transport).toBe('http');
    expect(result.port).toBe(2222);
    cleanup();
  });

  it('defaults to local code execution and local docs search', () => {
    const cleanup = mockArgv([]);

    const result = parseCLIOptions();

    expect(result.codeExecutionMode).toBe('local');
    expect(result.docsSearchMode).toBe('local');
    expect(Object.keys(result).filter((key) => /api.?key/i.test(key))).toEqual([]);

    cleanup();
  });

  it('accepts the local modes when they are passed explicitly', () => {
    const cleanup = mockArgv(['--code-execution-mode=local', '--docs-search-mode=local']);

    const result = parseCLIOptions();

    expect(result.codeExecutionMode).toBe('local');
    expect(result.docsSearchMode).toBe('local');

    cleanup();
  });

  it.each(['--code-execution-mode=remote', '--docs-search-mode=remote'])(
    'rejects the non-local mode %s',
    (arg) => {
      const cleanup = mockArgv([arg]);
      const exit = jest.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit');
      });
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => parseCLIOptions()).toThrow();

      exit.mockRestore();
      error.mockRestore();
      cleanup();
    },
  );
});
