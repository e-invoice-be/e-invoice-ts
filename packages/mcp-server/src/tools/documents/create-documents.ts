// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'e-invoice-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import EInvoice from 'e-invoice-api';

export const metadata: Metadata = {
  resource: 'documents',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/documents/',
  operationId: 'post_document_api_documents__post',
};

export const tool: Tool = {
  name: 'create_documents',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new invoice or credit note",
  inputSchema: {
    type: 'object',
    properties: {
      amount_due: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Amount Due',
      },
      attachments: {
        type: 'array',
        title: 'Attachments',
        items: {
          $ref: '#/$defs/document_attachment_create',
        },
      },
      billing_address: {
        type: 'string',
        title: 'Billing Address',
      },
      billing_address_recipient: {
        type: 'string',
        title: 'Billing Address Recipient',
      },
      currency: {
        $ref: '#/$defs/currency_code',
      },
      customer_address: {
        type: 'string',
        title: 'Customer Address',
      },
      customer_address_recipient: {
        type: 'string',
        title: 'Customer Address Recipient',
      },
      customer_email: {
        type: 'string',
        title: 'Customer Email',
      },
      customer_id: {
        type: 'string',
        title: 'Customer Id',
      },
      customer_name: {
        type: 'string',
        title: 'Customer Name',
      },
      customer_tax_id: {
        type: 'string',
        title: 'Customer Tax Id',
      },
      direction: {
        $ref: '#/$defs/document_direction',
      },
      document_type: {
        $ref: '#/$defs/document_type',
      },
      due_date: {
        type: 'string',
        title: 'Due Date',
        format: 'date',
      },
      invoice_date: {
        type: 'string',
        title: 'Invoice Date',
        format: 'date',
      },
      invoice_id: {
        type: 'string',
        title: 'Invoice Id',
      },
      invoice_total: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Invoice Total',
      },
      items: {
        type: 'array',
        title: 'Items',
        items: {
          type: 'object',
          title: 'LineItemCreate',
          properties: {
            amount: {
              anyOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
              title: 'Amount',
            },
            date: {
              type: 'null',
              title: 'Date',
            },
            description: {
              type: 'string',
              title: 'Description',
            },
            product_code: {
              type: 'string',
              title: 'Product Code',
            },
            quantity: {
              anyOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
              title: 'Quantity',
            },
            tax: {
              anyOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
              title: 'Tax',
            },
            tax_rate: {
              type: 'string',
              title: 'Tax Rate',
            },
            unit: {
              $ref: '#/$defs/unit_of_measure_code',
            },
            unit_price: {
              anyOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
              title: 'Unit Price',
            },
          },
        },
      },
      note: {
        type: 'string',
        title: 'Note',
      },
      payment_details: {
        type: 'array',
        title: 'Payment Details',
        items: {
          $ref: '#/$defs/payment_detail_create',
        },
      },
      payment_term: {
        type: 'string',
        title: 'Payment Term',
      },
      previous_unpaid_balance: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Previous Unpaid Balance',
      },
      purchase_order: {
        type: 'string',
        title: 'Purchase Order',
      },
      remittance_address: {
        type: 'string',
        title: 'Remittance Address',
      },
      remittance_address_recipient: {
        type: 'string',
        title: 'Remittance Address Recipient',
      },
      service_address: {
        type: 'string',
        title: 'Service Address',
      },
      service_address_recipient: {
        type: 'string',
        title: 'Service Address Recipient',
      },
      service_end_date: {
        type: 'string',
        title: 'Service End Date',
        format: 'date',
      },
      service_start_date: {
        type: 'string',
        title: 'Service Start Date',
        format: 'date',
      },
      shipping_address: {
        type: 'string',
        title: 'Shipping Address',
      },
      shipping_address_recipient: {
        type: 'string',
        title: 'Shipping Address Recipient',
      },
      state: {
        $ref: '#/$defs/document_state',
      },
      subtotal: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Subtotal',
      },
      tax_details: {
        type: 'array',
        title: 'Tax Details',
        items: {
          type: 'object',
          title: 'TaxDetailCreate',
          properties: {
            amount: {
              anyOf: [
                {
                  type: 'number',
                },
                {
                  type: 'string',
                },
              ],
              title: 'Amount',
            },
            rate: {
              type: 'string',
              title: 'Rate',
            },
          },
        },
      },
      total_discount: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Total Discount',
      },
      total_tax: {
        anyOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
        title: 'Total Tax',
      },
      vendor_address: {
        type: 'string',
        title: 'Vendor Address',
      },
      vendor_address_recipient: {
        type: 'string',
        title: 'Vendor Address Recipient',
      },
      vendor_email: {
        type: 'string',
        title: 'Vendor Email',
      },
      vendor_name: {
        type: 'string',
        title: 'Vendor Name',
      },
      vendor_tax_id: {
        type: 'string',
        title: 'Vendor Tax Id',
      },
    },
    required: [],
    $defs: {
      document_attachment_create: {
        type: 'object',
        title: 'DocumentAttachmentCreate',
        properties: {
          file_name: {
            type: 'string',
            title: 'File Name',
          },
          file_data: {
            type: 'string',
            title: 'File Data',
          },
          file_size: {
            type: 'integer',
            title: 'File Size',
          },
          file_type: {
            type: 'string',
            title: 'File Type',
          },
        },
        required: ['file_name'],
      },
      currency_code: {
        type: 'string',
        title: 'CurrencyCode',
        enum: [
          'EUR',
          'USD',
          'GBP',
          'JPY',
          'CHF',
          'CAD',
          'AUD',
          'NZD',
          'CNY',
          'INR',
          'SEK',
          'NOK',
          'DKK',
          'SGD',
          'HKD',
        ],
      },
      document_direction: {
        type: 'string',
        title: 'DocumentDirection',
        enum: ['INBOUND', 'OUTBOUND'],
      },
      document_type: {
        type: 'string',
        title: 'DocumentType',
        enum: ['INVOICE', 'CREDIT_NOTE', 'DEBIT_NOTE'],
      },
      unit_of_measure_code: {
        type: 'string',
        title: 'UnitOfMeasureCode',
        description: 'Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.',
        enum: [
          '10',
          '11',
          '13',
          '14',
          '15',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '27',
          '28',
          '33',
          '34',
          '35',
          '37',
          '38',
          '40',
          '41',
          '56',
          '57',
          '58',
          '59',
          '60',
          '61',
          '74',
          '77',
          '80',
          '81',
          '85',
          '87',
          '89',
          '91',
          '1I',
          'EA',
          'E01',
          'E07',
          'E09',
          'E10',
          'E12',
          'E14',
          'E17',
          'E20',
          'E23',
          'E25',
          'E27',
          'E31',
          'E34',
          'E35',
          'E36',
          'E37',
          'E38',
          'E39',
          'E40',
          'E41',
          'E42',
          'E43',
          'E44',
          'E45',
          'E46',
          'E47',
          'E48',
          'E49',
          'E50',
          'E51',
          'E52',
          'E53',
          'E54',
          'E55',
          'E56',
          'E57',
          'E58',
          'E60',
          'E62',
          'E65',
          'E66',
          'E67',
          'E69',
          'E70',
          'E71',
          'E73',
          'E75',
          'E76',
          '2A',
          '2B',
          '2C',
          'ZZ',
          'NAR',
          'C62',
        ],
      },
      payment_detail_create: {
        type: 'object',
        title: 'PaymentDetailCreate',
        properties: {
          bank_account_number: {
            type: 'string',
            title: 'Bank Account Number',
          },
          iban: {
            type: 'string',
            title: 'Iban',
          },
          payment_reference: {
            type: 'string',
            title: 'Payment Reference',
          },
          swift: {
            type: 'string',
            title: 'Swift',
          },
        },
      },
      document_state: {
        type: 'string',
        title: 'DocumentState',
        enum: ['DRAFT', 'TRANSIT', 'FAILED', 'SENT', 'RECEIVED'],
      },
    },
  },
};

export const handler = async (client: EInvoice, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.documents.create(body));
};

export default { metadata, tool, handler };
