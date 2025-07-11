// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'inbox',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/inbox/invoices',
  operationId: 'get_inbox_invoices_api_inbox_invoices_get',
};

export const tool: Tool = {
  name: 'list_invoices_inbox',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of received invoices with filtering options.",
  inputSchema: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        title: 'Page',
        description: 'Page number',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
        description: 'Number of items per page',
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.inbox.listInvoices(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
