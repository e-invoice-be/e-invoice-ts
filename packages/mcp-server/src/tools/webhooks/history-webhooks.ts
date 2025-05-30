// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/webhooks/{webhook_id}/history',
  operationId: 'get_webhook_history_api_webhooks__webhook_id__history_get',
};

export const tool: Tool = {
  name: 'history_webhooks',
  description: 'Get the history of a webhook',
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

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const { webhook_id, ...body } = args as any;
  return client.webhooks.history(webhook_id);
};

export default { metadata, tool, handler };
