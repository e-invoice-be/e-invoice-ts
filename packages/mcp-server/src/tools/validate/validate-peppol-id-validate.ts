// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
    'Validate if a Peppol ID exists in the Peppol network and retrieve supported document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).',
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

export const handler = (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.validate.validatePeppolID(body);
};

export default { metadata, tool, handler };
