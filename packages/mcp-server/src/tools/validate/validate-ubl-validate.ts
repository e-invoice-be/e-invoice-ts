// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoiceAPI from 'e-invoice-api';

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
  description: 'Validate the correctness of a UBL document',
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
    },
  },
};

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.validate.validateUbl(body);
};

export default { metadata, tool, handler };
