// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import EInvoiceAPI from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/documents/{document_id}/transmission-report',
  operationId: 'get_transmission_report_api_documents__document_id__transmission_report_get',
};

export const tool: Tool = {
  name: 'get_transmission_report_documents',
  description: 'Get the transmission report for an invoice or credit note',
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
        title: 'Document Id',
      },
    },
  },
};

export const handler = (client: EInvoiceAPI, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return client.documents.getTransmissionReport(document_id);
};

export default { metadata, tool, handler };
