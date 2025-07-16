// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'validate',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/validate/ubl',
  operationId: 'validate_ubl_api_validate_ubl_post',
};

export const tool: Tool = {
  name: 'validate_ubl_validate',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nValidate the correctness of a UBL document\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/ubl_document_validation',\n  $defs: {\n    ubl_document_validation: {\n      type: 'object',\n      title: 'UBLDocumentValidationResponse',\n      properties: {\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        file_name: {\n          type: 'string',\n          title: 'File Name'\n        },\n        is_valid: {\n          type: 'boolean',\n          title: 'Is Valid'\n        },\n        issues: {\n          type: 'array',\n          title: 'Issues',\n          items: {\n            type: 'object',\n            title: 'ValidationIssue',\n            properties: {\n              message: {\n                type: 'string',\n                title: 'Message'\n              },\n              schematron: {\n                type: 'string',\n                title: 'Schematron'\n              },\n              type: {\n                type: 'string',\n                title: 'IssueType',\n                enum: [                  'error',\n                  'warning'\n                ]\n              },\n              flag: {\n                type: 'string',\n                title: 'Flag'\n              },\n              location: {\n                type: 'string',\n                title: 'Location'\n              },\n              rule_id: {\n                type: 'string',\n                title: 'Rule Id'\n              },\n              test: {\n                type: 'string',\n                title: 'Test'\n              }\n            },\n            required: [              'message',\n              'schematron',\n              'type'\n            ]\n          }\n        },\n        ubl_document: {\n          type: 'string',\n          title: 'Ubl Document'\n        }\n      },\n      required: [        'id',\n        'file_name',\n        'is_valid',\n        'issues'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.validate.validateUbl(body)));
};

export default { metadata, tool, handler };
