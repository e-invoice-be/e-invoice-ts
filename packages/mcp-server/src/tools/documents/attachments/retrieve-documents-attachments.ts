// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.attachments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/documents/{document_id}/attachments/{attachment_id}',
  operationId: 'get_document_attachment_api_documents__document_id__attachments__attachment_id__get',
};

export const tool: Tool = {
  name: 'retrieve_documents_attachments',
  description:
    'Get attachment details with for an invoice or credit note with link to download file (signed URL, valid for 1 hour)',
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
      attachment_id: {
        type: 'string',
        title: 'Attachment Id',
      },
    },
  },
};

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const { attachment_id, ...body } = args as any;
  return client.documents.attachments.retrieve(attachment_id, body);
};

export default { metadata, tool, handler };
