// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'outbox',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/outbox/drafts',
  operationId: 'get_drafts',
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
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.outbox.listDraftDocuments(body).asResponse();
  try {
    return asTextContentResult(await response.json());
  } catch (error) {
    if (error instanceof EInvoice.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
