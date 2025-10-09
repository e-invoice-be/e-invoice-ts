// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'e-invoice-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/webhooks/',
  operationId: 'get_webhooks_api_webhooks__get',
};

export const tool: Tool = {
  name: 'list_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet all webhooks for the current tenant\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_list_response',\n  $defs: {\n    webhook_list_response: {\n      type: 'array',\n      title: 'Response Get Webhooks Api Webhooks  Get',\n      items: {\n        $ref: '#/$defs/webhook_response'\n      }\n    },\n    webhook_response: {\n      type: 'object',\n      title: 'WebhookResponse',\n      description: 'Response model for webhook API endpoints.',\n      properties: {\n        id: {\n          type: 'string',\n          title: 'Id'\n        },\n        events: {\n          type: 'array',\n          title: 'Events',\n          items: {\n            type: 'string'\n          }\n        },\n        secret: {\n          type: 'string',\n          title: 'Secret'\n        },\n        url: {\n          type: 'string',\n          title: 'Url'\n        },\n        enabled: {\n          type: 'boolean',\n          title: 'Enabled'\n        }\n      },\n      required: [        'id',\n        'events',\n        'secret',\n        'url'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.list()));
};

export default { metadata, tool, handler };
