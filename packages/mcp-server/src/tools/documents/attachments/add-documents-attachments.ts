// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd a new attachment to an invoice or credit note\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/document_attachment',\n  $defs: {\n    document_attachment: {\n      type: 'object',\n      title: 'DocumentAttachment',\n      properties: {\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        file_name: {\n          type: 'string',\n          title: 'File Name'\n        },\n        file_size: {\n          type: 'integer',\n          title: 'File Size'\n        },\n        file_type: {\n          type: 'string',\n          title: 'File Type'\n        },\n        file_url: {\n          type: 'string',\n          title: 'File Url'\n        }\n      },\n      required: [        'id',\n        'file_name'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['document_id', 'file'],
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(args, await client.documents.attachments.add(document_id, body)),
  );
};

export default { metadata, tool, handler };
