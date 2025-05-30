// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.ubl',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/documents/{document_id}/ubl',
  operationId: 'get_document_ubl_api_documents__document_id__ubl_get',
};

export const tool: Tool = {
  name: 'get_documents_ubl',
  description: 'Get the UBL for an invoice or credit note',
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
  return client.documents.ubl.get(document_id);
};

export default { metadata, tool, handler };
