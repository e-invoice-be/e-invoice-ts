// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/webhooks/{webhook_id}',
  operationId: 'delete_webhook_api_webhooks__webhook_id__delete',
};

export const tool: Tool = {
  name: 'delete_webhooks',
  description: 'Delete a webhook',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        title: 'Webhook Id',
      },
    },
  },
};

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { webhook_id, ...body } = args as any;
  return client.webhooks.delete(webhook_id);
};

export default { metadata, tool, handler };
