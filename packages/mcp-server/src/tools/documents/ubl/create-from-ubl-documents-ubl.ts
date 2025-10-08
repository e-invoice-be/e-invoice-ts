// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.ubl',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/ubl',
  operationId: 'post_document_ubl',
};

export const tool: Tool = {
  name: 'create_from_ubl_documents_ubl',
  description: 'Create a new invoice or credit note from a UBL file',
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
    },
    required: ['file'],
  },
  annotations: {},
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.documents.ubl.createFromUbl(body));
};

export default { metadata, tool, handler };
