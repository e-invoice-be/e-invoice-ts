import { IncomingMessage } from 'node:http';
import { parseClientAuthHeaders } from '../src/auth';

const request = (headers: IncomingMessage['headers']) => ({ headers }) as IncomingMessage;

describe('parseClientAuthHeaders', () => {
  it('takes the api key from a Bearer authorization header', () => {
    expect(parseClientAuthHeaders(request({ authorization: 'Bearer my-api-key' }))).toEqual({
      apiKey: 'my-api-key',
    });
  });

  it('prefers the authorization header over x-e-invoice-api-key', () => {
    expect(
      parseClientAuthHeaders(
        request({ authorization: 'Bearer from-authorization', 'x-e-invoice-api-key': 'from-header' }),
      ),
    ).toEqual({ apiKey: 'from-authorization' });
  });

  it('rejects unsupported authorization schemes', () => {
    expect(() => parseClientAuthHeaders(request({ authorization: 'Basic dXNlcjpwYXNz' }))).toThrow(
      /Unsupported authorization scheme/,
    );
  });

  it('falls back to the x-e-invoice-api-key header', () => {
    expect(parseClientAuthHeaders(request({ 'x-e-invoice-api-key': 'my-api-key' }))).toEqual({
      apiKey: 'my-api-key',
    });
    expect(parseClientAuthHeaders(request({ 'x-e-invoice-api-key': ['first', 'second'] as any }))).toEqual({
      apiKey: 'first',
    });
  });

  it('returns no api key when no credentials are sent and auth is optional', () => {
    expect(parseClientAuthHeaders(request({}), false)).toEqual({ apiKey: undefined });
  });

  it('throws when no authorization header is sent and auth is required', () => {
    expect(() => parseClientAuthHeaders(request({}), true)).toThrow(/Missing required Authorization header/);
  });
});
