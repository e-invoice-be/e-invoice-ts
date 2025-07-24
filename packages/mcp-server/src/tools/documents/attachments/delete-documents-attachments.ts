// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete an attachment from an invoice or credit note\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'DocumentAttachmentDelete',\n  properties: {\n    is_deleted: {\n      type: 'boolean',\n      title: 'Is Deleted'\n    }\n  },\n  required: [    'is_deleted'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['document_id', 'attachment_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { attachment_id, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(args, await client.documents.attachments.delete(attachment_id, body)),
  );
};

export default { metadata, tool, handler };
