import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'e-invoice-api';

/** The request carries no usable client credentials. */
export class ClientAuthError extends Error {}

const firstHeaderValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/**
 * Reads the client's API key from the `Authorization` header (Bearer scheme) or, when that header is
 * absent, from `x-e-invoice-api-key`.
 *
 * @param required - Throw a {@link ClientAuthError} when the request has no API key in either header.
 */
export const parseClientAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  let apiKey: string | undefined;

  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    if (scheme.toLowerCase() !== 'bearer') {
      throw new ClientAuthError(
        'Unsupported authorization scheme. Expected the "Authorization" header to be a supported scheme (Bearer).',
      );
    }
    apiKey = req.headers.authorization.slice(scheme.length + 1).trim();
  } else {
    apiKey = firstHeaderValue(req.headers['x-e-invoice-api-key'])?.trim();
  }

  if (required && !apiKey) {
    throw new ClientAuthError(
      'Missing required Authorization header; send "Authorization: Bearer <api key>" or an "x-e-invoice-api-key" header.',
    );
  }

  return { apiKey };
};
