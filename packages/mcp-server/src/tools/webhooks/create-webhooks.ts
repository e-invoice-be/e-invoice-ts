// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/webhooks/',
  operationId: 'create_webhook_api_webhooks__post',
};

export const tool: Tool = {
  name: 'create_webhooks',
  description: 'Create a new webhook',
  inputSchema: {
    type: 'object',
    properties: {
      events: {
        type: 'array',
        title: 'Events',
        items: {
          type: 'string',
        },
      },
      url: {
        type: 'string',
        title: 'Url',
      },
      enabled: {
        type: 'boolean',
        title: 'Enabled',
      },
    },
  },
};

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.webhooks.create(body);
};

export default { metadata, tool, handler };
