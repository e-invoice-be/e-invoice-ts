// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'outbox',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/outbox/drafts',
  operationId: 'get_drafts_api_outbox_drafts_get',
};

export const tool: Tool = {
  name: 'list_draft_documents_outbox',
  description: 'Retrieve a paginated list of draft documents with filtering options.',
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
  return asTextContentResult(await client.outbox.listDraftDocuments(body));
};

export default { metadata, tool, handler };
