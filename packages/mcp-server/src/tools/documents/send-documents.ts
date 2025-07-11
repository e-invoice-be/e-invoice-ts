// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/{document_id}/send',
  operationId: 'post_document_send_api_documents__document_id__send_post',
};

export const tool: Tool = {
  name: 'send_documents',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend an invoice or credit note via Peppol",
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
      email: {
        type: 'string',
        title: 'Email',
      },
      receiver_peppol_id: {
        type: 'string',
        title: 'Receiver Peppol Id',
      },
      receiver_peppol_scheme: {
        type: 'string',
        title: 'Receiver Peppol Scheme',
      },
      sender_peppol_id: {
        type: 'string',
        title: 'Sender Peppol Id',
      },
      sender_peppol_scheme: {
        type: 'string',
        title: 'Sender Peppol Scheme',
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asTextContentResult(await client.documents.send(document_id, body));
};

export default { metadata, tool, handler };
