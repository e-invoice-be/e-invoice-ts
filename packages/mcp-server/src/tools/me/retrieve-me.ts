// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'me',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/me/',
  operationId: 'get_me_api_me__get',
};

export const tool: Tool = {
  name: 'retrieve_me',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve information about your account.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/me_retrieve_response',\n  $defs: {\n    me_retrieve_response: {\n      type: 'object',\n      title: 'TenantPublic',\n      properties: {\n        credit_balance: {\n          type: 'integer',\n          title: 'Credit Balance',\n          description: 'Credit balance of the tenant'\n        },\n        name: {\n          type: 'string',\n          title: 'Name'\n        },\n        plan: {\n          type: 'string',\n          title: 'TenantPlan',\n          description: 'Plan of the tenant',\n          enum: [            'starter',\n            'pro',\n            'enterprise'\n          ]\n        },\n        bcc_recipient_email: {\n          type: 'string',\n          title: 'Bcc Recipient Email',\n          description: 'BCC recipient email to deliver documents'\n        },\n        company_address: {\n          type: 'string',\n          title: 'Company Address',\n          description: 'Address of the company. Must be in the form of `Street Name Street Number`'\n        },\n        company_city: {\n          type: 'string',\n          title: 'Company City',\n          description: 'City of the company'\n        },\n        company_country: {\n          type: 'string',\n          title: 'Company Country',\n          description: 'Country of the company'\n        },\n        company_email: {\n          type: 'string',\n          title: 'Company Email',\n          description: 'Email of the company'\n        },\n        company_name: {\n          type: 'string',\n          title: 'Company Name',\n          description: 'Name of the company. Must include the company type. For example: `BV`, `NV`, `CVBA`, `VOF`'\n        },\n        company_number: {\n          type: 'string',\n          title: 'Company Number',\n          description: 'Company number. For Belgium this is the CBE number or their EUID (European Unique Identifier) number'\n        },\n        company_tax_id: {\n          type: 'string',\n          title: 'Company Tax Id',\n          description: 'Company tax ID. For Belgium this is the VAT number. Must include the country prefix'\n        },\n        company_zip: {\n          type: 'string',\n          title: 'Company Zip',\n          description: 'Zip code of the company'\n        },\n        description: {\n          type: 'string',\n          title: 'Description'\n        },\n        ibans: {\n          type: 'array',\n          title: 'Ibans',\n          description: 'IBANs of the tenant',\n          items: {\n            type: 'string'\n          }\n        },\n        peppol_ids: {\n          type: 'array',\n          title: 'Peppol Ids',\n          description: 'Peppol IDs of the tenant',\n          items: {\n            type: 'string'\n          }\n        },\n        smp_registration: {\n          type: 'boolean',\n          title: 'Smp Registration',\n          description: 'Whether the tenant is registered on our SMP'\n        },\n        smp_registration_date: {\n          type: 'string',\n          title: 'Smp Registration Date',\n          description: 'Date when the tenant was registered on SMP',\n          format: 'date-time'\n        }\n      },\n      required: [        'credit_balance',\n        'name',\n        'plan'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.me.retrieve()));
};

export default { metadata, tool, handler };
