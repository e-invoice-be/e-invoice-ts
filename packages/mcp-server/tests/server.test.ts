import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getInstructions } from '../src/instructions';
import docsSearchTool from '../src/docs-search-tool';
import { configureLogger } from '../src/logger';
import { initMcpServer, newMcpServer, selectTools } from '../src/server';

describe('getInstructions', () => {
  it('returns the built-in instructions without a network request', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch');

    const instructions = await getInstructions({});

    expect(instructions).toContain('search_docs');
    expect(instructions).toContain('execute');
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it('reads custom instructions from a file', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mcp-instructions-'));
    const customInstructionsPath = path.join(dir, 'instructions.md');
    await fs.writeFile(customInstructionsPath, 'My custom instructions');

    expect(await getInstructions({ customInstructionsPath })).toBe('My custom instructions');

    await fs.rm(dir, { recursive: true });
  });
});

describe('initMcpServer', () => {
  beforeAll(() => configureLogger({ level: 'error', pretty: false }));

  it('provides the code and docs tools by default', () => {
    expect(selectTools().map((t) => t.tool.name)).toEqual(['execute', 'search_docs']);
  });

  it('initializes the local docs search by default', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch');
    const server = await newMcpServer();
    await initMcpServer({ server });

    const result = await docsSearchTool.handler({
      reqContext: { client: undefined as any },
      args: { query: 'create document', language: 'typescript' },
    });

    expect(result.isError).toBeUndefined();
    expect(result.content[0]).toMatchObject({ type: 'text' });
    expect((result.content[0] as { text: string }).text).toContain('documents');
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
