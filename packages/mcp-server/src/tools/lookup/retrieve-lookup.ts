// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoiceAPI from 'e-invoice-api';

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
    'Lookup Peppol ID. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).',
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

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.lookup.retrieve(body);
};

export default { metadata, tool, handler };
