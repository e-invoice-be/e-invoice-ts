// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/documents/{document_id}',
  operationId: 'delete_document_api_documents__document_id__delete',
};

export const tool: Tool = {
  name: 'delete_documents',
  description: 'Delete an invoice or credit note',
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
    },
  },
};

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return client.documents.delete(document_id);
};

export default { metadata, tool, handler };
