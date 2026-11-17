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

  describe('http transport options', () => {
    const parse = (args: string[]) => {
      const cleanup = mockArgv(args);
      try {
        return parseCLIOptions();
      } finally {
        cleanup();
      }
    };

    const clearEnv = () => {
      delete process.env['MCP_SERVER_HOST'];
      delete process.env['MCP_SERVER_ALLOWED_HOSTS'];
      delete process.env['MCP_SERVER_ALLOWED_ORIGINS'];
    };

    beforeEach(clearEnv);
    afterEach(clearEnv);

    it('listens on the loopback interface by default', () => {
      const result = parse(['--transport=http']);

      expect(result.host).toBe('127.0.0.1');
      expect(result.allowedHosts).toBeUndefined();
      expect(result.allowedOrigins).toBeUndefined();
    });

    it('takes the host from --host', () => {
      expect(parse(['--transport=http', '--host=0.0.0.0']).host).toBe('0.0.0.0');
    });

    it('takes the host from MCP_SERVER_HOST', () => {
      process.env['MCP_SERVER_HOST'] = '192.0.2.10';

      expect(parse(['--transport=http']).host).toBe('192.0.2.10');
    });

    it('falls back to the loopback interface when the host is empty', () => {
      process.env['MCP_SERVER_HOST'] = '';

      expect(parse(['--transport=http']).host).toBe('127.0.0.1');
      expect(parse(['--transport=http', '--host=']).host).toBe('127.0.0.1');
    });

    it('uses the last value of a repeated --host', () => {
      expect(parse(['--host=192.0.2.10', '--host=192.0.2.11']).host).toBe('192.0.2.11');
    });

    it('takes allowed hosts and origins from repeated or comma-separated flags', () => {
      const result = parse([
        '--allowed-hosts=mcp.example.com',
        '--allowed-hosts=mcp.example.com:8443, other.example.com',
        '--allowed-origins=https://app.example.com,https://other.example.com',
      ]);

      expect(result.allowedHosts).toEqual(['mcp.example.com', 'mcp.example.com:8443', 'other.example.com']);
      expect(result.allowedOrigins).toEqual(['https://app.example.com', 'https://other.example.com']);
    });

    it('takes allowed hosts and origins from the environment', () => {
      process.env['MCP_SERVER_ALLOWED_HOSTS'] = 'mcp.example.com,other.example.com';
      process.env['MCP_SERVER_ALLOWED_ORIGINS'] = 'https://app.example.com';

      const result = parse([]);

      expect(result.allowedHosts).toEqual(['mcp.example.com', 'other.example.com']);
      expect(result.allowedOrigins).toEqual(['https://app.example.com']);
    });
  });
});
