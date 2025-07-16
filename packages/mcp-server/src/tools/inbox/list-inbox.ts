// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'inbox',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/inbox/',
  operationId: 'get_inbox_api_inbox__get',
};

export const tool: Tool = {
  name: 'list_inbox',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a paginated list of received documents with filtering options.",
  inputSchema: {
    type: 'object',
    properties: {
      date_from: {
        type: 'string',
        title: 'Date From',
        description: 'Filter by issue date (from)',
        format: 'date-time',
      },
      date_to: {
        type: 'string',
        title: 'Date To',
        description: 'Filter by issue date (to)',
        format: 'date-time',
      },
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
      search: {
        type: 'string',
        title: 'Search',
        description: 'Search in invoice number, seller/buyer names',
      },
      sender: {
        type: 'string',
        title: 'Sender',
        description: 'Filter by sender ID',
      },
      state: {
        $ref: '#/$defs/document_state',
      },
      type: {
        $ref: '#/$defs/document_type',
      },
    },
    $defs: {
      document_state: {
        type: 'string',
        title: 'DocumentState',
        enum: ['DRAFT', 'TRANSIT', 'FAILED', 'SENT', 'RECEIVED'],
      },
      document_type: {
        type: 'string',
        title: 'DocumentType',
        enum: ['INVOICE', 'CREDIT_NOTE', 'DEBIT_NOTE'],
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.inbox.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
