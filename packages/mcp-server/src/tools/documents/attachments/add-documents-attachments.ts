// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.attachments',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/{document_id}/attachments',
  operationId: 'post_document_attachments_api_documents__document_id__attachments_post',
};

export const tool: Tool = {
  name: 'add_documents_attachments',
  description: 'Add a new attachment to an invoice or credit note',
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
      file: {
        type: 'string',
        title: 'File',
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asTextContentResult(await client.documents.attachments.add(document_id, body));
};

export default { metadata, tool, handler };
