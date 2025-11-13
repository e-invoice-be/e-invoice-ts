// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'lookup',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/lookup/participants',
  operationId: 'get_lookup_participants',
};

export const tool: Tool = {
  name: 'retrieve_participants_lookup',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLookup Peppol participants by name or other identifiers. You can limit the search to a specific country by providing the country code.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/lookup_retrieve_participants_response',\n  $defs: {\n    lookup_retrieve_participants_response: {\n      type: 'object',\n      title: 'PeppolSearchResult',\n      description: 'Represents the result of a Peppol directory search',\n      properties: {\n        query_terms: {\n          type: 'string',\n          title: 'Query Terms',\n          description: 'Query terms used for search'\n        },\n        search_date: {\n          type: 'string',\n          title: 'Search Date',\n          description: 'Search date of the result'\n        },\n        total_count: {\n          type: 'integer',\n          title: 'Total Count',\n          description: 'Total number of results'\n        },\n        used_count: {\n          type: 'integer',\n          title: 'Used Count',\n          description: 'Number of results returned by the API'\n        },\n        participants: {\n          type: 'array',\n          title: 'Participants',\n          description: 'List of participants',\n          items: {\n            type: 'object',\n            title: 'PeppolParticipant',\n            description: 'Represents a Peppol participant with their details',\n            properties: {\n              peppol_id: {\n                type: 'string',\n                title: 'Peppol Id',\n                description: 'Peppol ID of the participant'\n              },\n              peppol_scheme: {\n                type: 'string',\n                title: 'Peppol Scheme',\n                description: 'Peppol scheme of the participant'\n              },\n              document_types: {\n                type: 'array',\n                title: 'Document Types',\n                description: 'List of supported document types',\n                items: {\n                  type: 'object',\n                  title: 'PeppolDocumentType',\n                  description: 'Represents a supported document type',\n                  properties: {\n                    scheme: {\n                      type: 'string',\n                      title: 'Scheme',\n                      description: 'Document type scheme'\n                    },\n                    value: {\n                      type: 'string',\n                      title: 'Value',\n                      description: 'Document type value'\n                    }\n                  },\n                  required: [                    'scheme',\n                    'value'\n                  ]\n                }\n              },\n              entities: {\n                type: 'array',\n                title: 'Entities',\n                description: 'List of business entities',\n                items: {\n                  type: 'object',\n                  title: 'PeppolEntity',\n                  description: 'Represents a business entity',\n                  properties: {\n                    additional_info: {\n                      type: 'string',\n                      title: 'Additional Info',\n                      description: 'Additional information'\n                    },\n                    country_code: {\n                      type: 'string',\n                      title: 'Country Code',\n                      description: 'Country code'\n                    },\n                    geo_info: {\n                      type: 'string',\n                      title: 'Geo Info',\n                      description: 'Geographic information'\n                    },\n                    identifiers: {\n                      type: 'array',\n                      title: 'Identifiers',\n                      description: 'List of business identifiers',\n                      items: {\n                        type: 'object',\n                        title: 'PeppolIdentifier',\n                        description: 'Represents a business identifier',\n                        properties: {\n                          scheme: {\n                            type: 'string',\n                            title: 'Scheme',\n                            description: 'Identifier scheme'\n                          },\n                          value: {\n                            type: 'string',\n                            title: 'Value',\n                            description: 'Identifier value'\n                          }\n                        },\n                        required: [                          'scheme',\n                          'value'\n                        ]\n                      }\n                    },\n                    name: {\n                      type: 'string',\n                      title: 'Name',\n                      description: 'Business entity name'\n                    },\n                    registration_date: {\n                      type: 'string',\n                      title: 'Registration Date',\n                      description: 'Registration date'\n                    },\n                    website: {\n                      type: 'string',\n                      title: 'Website',\n                      description: 'Website URL'\n                    }\n                  }\n                }\n              }\n            },\n            required: [              'peppol_id',\n              'peppol_scheme'\n            ]\n          }\n        }\n      },\n      required: [        'query_terms',\n        'search_date',\n        'total_count',\n        'used_count'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        title: 'Query',
        description: 'Query to lookup',
      },
      country_code: {
        type: 'string',
        title: 'Country Code',
        description: 'Country code of the company to lookup. If not provided, the search will be global.',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['query'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.lookup.retrieveParticipants(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
