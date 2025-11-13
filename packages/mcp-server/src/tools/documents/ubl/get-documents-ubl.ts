// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents.ubl',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/documents/{document_id}/ubl',
  operationId: 'get_document_ubl',
};

export const tool: Tool = {
  name: 'get_documents_ubl',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet the UBL for an invoice or credit note\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/ubl_get_response',\n  $defs: {\n    ubl_get_response: {\n      type: 'object',\n      title: 'DocumentUBL',\n      properties: {\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        file_name: {\n          type: 'string',\n          title: 'File Name'\n        },\n        file_hash: {\n          type: 'string',\n          title: 'File Hash'\n        },\n        file_size: {\n          type: 'integer',\n          title: 'File Size'\n        },\n        receiver_peppol_id: {\n          type: 'string',\n          title: 'Receiver Peppol Id'\n        },\n        receiver_peppol_scheme: {\n          type: 'string',\n          title: 'Receiver Peppol Scheme'\n        },\n        sender_peppol_id: {\n          type: 'string',\n          title: 'Sender Peppol Id'\n        },\n        sender_peppol_scheme: {\n          type: 'string',\n          title: 'Sender Peppol Scheme'\n        },\n        signed_url: {\n          type: 'string',\n          title: 'Signed Url'\n        },\n        validated_at: {\n          type: 'string',\n          title: 'Validated At',\n          format: 'date-time'\n        }\n      },\n      required: [        'id',\n        'file_name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['document_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { document_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.documents.ubl.get(document_id)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
