// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.attachments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/documents/{document_id}/attachments',
  operationId: 'get_document_attachments_api_documents__document_id__attachments_get',
};

export const tool: Tool = {
  name: 'list_documents_attachments',
  description: 'Get all attachments for an invoice or credit note',
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

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return client.documents.attachments.list(document_id);
};

export default { metadata, tool, handler };
