// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/webhooks/',
  operationId: 'get_webhooks_api_webhooks__get',
};

export const tool: Tool = {
  name: 'list_webhooks',
  description: 'Get all webhooks for the current tenant',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  return asTextContentResult(await client.webhooks.list());
};

export default { metadata, tool, handler };
