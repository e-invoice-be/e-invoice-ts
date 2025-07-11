// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'lookup',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/lookup',
  operationId: 'get_lookup_peppol_id_api_lookup_get',
};

export const tool: Tool = {
  name: 'retrieve_lookup',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nLookup Peppol ID. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).",
  inputSchema: {
    type: 'object',
    properties: {
      peppol_id: {
        type: 'string',
        title: 'Peppol Id',
        description:
          'Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a Belgian company.',
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.lookup.retrieve(body));
};

export default { metadata, tool, handler };
