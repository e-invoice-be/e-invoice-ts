// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'inbox',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/inbox/credit-notes',
  operationId: 'get_inbox_credit_notes_api_inbox_credit_notes_get',
};

export const tool: Tool = {
  name: 'list_credit_notes_inbox',
  description: 'Retrieve a paginated list of received credit notes with filtering options.',
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
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.inbox.listCreditNotes(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
