// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'validate',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/validate/peppol-id',
  operationId: 'validate_peppol_id_api_validate_peppol_id_get',
};

export const tool: Tool = {
  name: 'validate_peppol_id_validate',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nValidate if a Peppol ID exists in the Peppol network and retrieve supported document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/validate_validate_peppol_id_response',\n  $defs: {\n    validate_validate_peppol_id_response: {\n      type: 'object',\n      title: 'PeppolIdValidationResponse',\n      description: 'Response for a Peppol ID validation request.\\n\\nThis model represents the validation result of a Peppol ID in the Peppol network,\\nincluding whether the ID is valid and what document types it supports.',\n      properties: {\n        business_card: {\n          type: 'object',\n          title: 'BusinessCard',\n          description: 'Business card information for the Peppol ID',\n          properties: {\n            country_code: {\n              type: 'string',\n              title: 'Country Code'\n            },\n            name: {\n              type: 'string',\n              title: 'Name'\n            },\n            registration_date: {\n              type: 'string',\n              title: 'Registration Date',\n              format: 'date'\n            }\n          }\n        },\n        business_card_valid: {\n          type: 'boolean',\n          title: 'Business Card Valid',\n          description: 'Whether a business card is set at the SMP'\n        },\n        dns_valid: {\n          type: 'boolean',\n          title: 'Dns Valid',\n          description: 'Whether the DNS resolves to a valid SMP'\n        },\n        is_valid: {\n          type: 'boolean',\n          title: 'Is Valid',\n          description: 'Whether the Peppol ID is valid and registered in the Peppol network'\n        },\n        supported_document_types: {\n          type: 'array',\n          title: 'Supported Document Types',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'business_card',\n        'business_card_valid',\n        'dns_valid',\n        'is_valid'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      peppol_id: {
        type: 'string',
        title: 'Peppol Id',
        description:
          'Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a Belgian company.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['peppol_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.validate.validatePeppolID(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
