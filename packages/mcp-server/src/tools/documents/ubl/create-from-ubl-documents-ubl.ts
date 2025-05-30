// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.ubl',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/ubl',
  operationId: 'post_document_ubl_api_documents_ubl_post',
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
  },
};

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.documents.ubl.createFromUbl(body);
};

export default { metadata, tool, handler };
