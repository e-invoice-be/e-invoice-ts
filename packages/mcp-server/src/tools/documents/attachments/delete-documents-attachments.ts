// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.attachments',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/documents/{document_id}/attachments/{attachment_id}',
  operationId: 'delete_document_attachment_api_documents__document_id__attachments__attachment_id__delete',
};

export const tool: Tool = {
  name: 'delete_documents_attachments',
  description: 'Delete an attachment from an invoice or credit note',
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

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { attachment_id, ...body } = args as any;
  return client.documents.attachments.delete(attachment_id, body);
};

export default { metadata, tool, handler };
