// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'me',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/me/',
  operationId: 'get_me_api_me__get',
};

export const tool: Tool = {
  name: 'retrieve_me',
  description: 'Retrieve information about your account.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  return client.me.retrieve();
};

export default { metadata, tool, handler };
