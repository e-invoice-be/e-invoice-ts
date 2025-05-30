// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/webhooks/{webhook_id}',
  operationId: 'update_webhook_api_webhooks__webhook_id__put',
};

export const tool: Tool = {
  name: 'update_webhooks',
  description: 'Update a webhook by ID',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        title: 'Webhook Id',
      },
      enabled: {
        type: 'boolean',
        title: 'Enabled',
      },
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
    },
  },
};

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { webhook_id, ...body } = args as any;
  return client.webhooks.update(webhook_id, body);
};

export default { metadata, tool, handler };
