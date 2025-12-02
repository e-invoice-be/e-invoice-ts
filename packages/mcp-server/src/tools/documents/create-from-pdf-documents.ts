// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/pdf',
  operationId: 'post_document_pdf',
};

export const tool: Tool = {
  name: 'create_from_pdf_documents',
  description:
    "Create a new invoice or credit note from a PDF file. If the 'ubl_document' field is set in the response, it indicates that sufficient details were extracted from the PDF to automatically generate a valid UBL document ready for sending. If 'ubl_document' is not set, human intervention may be required to ensure compliance.",
  inputSchema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        title: 'File',
      },
      customer_tax_id: {
        type: 'string',
        title: 'Customer Tax Id',
      },
      vendor_tax_id: {
        type: 'string',
        title: 'Vendor Tax Id',
      },
    },
    required: ['file'],
  },
  annotations: {},
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.documents.createFromPdf(body));
  } catch (error) {
    if (error instanceof EInvoice.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
