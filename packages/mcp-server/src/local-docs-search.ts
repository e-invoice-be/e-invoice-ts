// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'create',
    endpoint: '/api/documents/',
    httpMethod: 'post',
    summary: 'Create Document',
    description: 'Create a new invoice or credit note',
    stainlessPath: '(resource) documents > (method) create',
    qualified: 'client.documents.create',
    params: [
      'construct_pdf?: boolean;',
      "allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[];",
      'amount_due?: number | string;',
      'attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[];',
      'billing_address?: string;',
      'billing_address_recipient?: string;',
      "charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[];",
      'currency?: string;',
      'customer_address?: string;',
      'customer_address_recipient?: string;',
      'customer_company_id?: string;',
      'customer_email?: string;',
      'customer_id?: string;',
      'customer_name?: string;',
      'customer_peppol_id?: string;',
      'customer_tax_id?: string;',
      "direction?: 'INBOUND' | 'OUTBOUND';",
      "document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE';",
      'due_date?: string;',
      'invoice_date?: string;',
      'invoice_id?: string;',
      'invoice_total?: number | string;',
      "items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[];",
      'note?: string;',
      'payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[];',
      'payment_term?: string;',
      'previous_unpaid_balance?: number | string;',
      'purchase_order?: string;',
      'remittance_address?: string;',
      'remittance_address_recipient?: string;',
      'service_address?: string;',
      'service_address_recipient?: string;',
      'service_end_date?: string;',
      'service_start_date?: string;',
      'shipping_address?: string;',
      'shipping_address_recipient?: string;',
      "state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED';",
      'subtotal?: number | string;',
      "tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';",
      'tax_details?: { amount?: number | string; rate?: string; }[];',
      'total_discount?: number | string;',
      'total_tax?: number | string;',
      'vatex?: string;',
      'vatex_note?: string;',
      'vendor_address?: string;',
      'vendor_address_recipient?: string;',
      'vendor_company_id?: string;',
      'vendor_email?: string;',
      'vendor_name?: string;',
      'vendor_tax_id?: string;',
    ],
    response: 'object',
    markdown:
      "## create\n\n`client.documents.create(construct_pdf?: boolean, allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[], amount_due?: number | string, attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[], billing_address?: string, billing_address_recipient?: string, charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[], currency?: string, customer_address?: string, customer_address_recipient?: string, customer_company_id?: string, customer_email?: string, customer_id?: string, customer_name?: string, customer_peppol_id?: string, customer_tax_id?: string, direction?: 'INBOUND' | 'OUTBOUND', document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE', due_date?: string, invoice_date?: string, invoice_id?: string, invoice_total?: number | string, items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[], note?: string, payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[], payment_term?: string, previous_unpaid_balance?: number | string, purchase_order?: string, remittance_address?: string, remittance_address_recipient?: string, service_address?: string, service_address_recipient?: string, service_end_date?: string, service_start_date?: string, shipping_address?: string, shipping_address_recipient?: string, state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED', subtotal?: number | string, tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B', tax_details?: { amount?: number | string; rate?: string; }[], total_discount?: number | string, total_tax?: number | string, vatex?: string, vatex_note?: string, vendor_address?: string, vendor_address_recipient?: string, vendor_company_id?: string, vendor_email?: string, vendor_name?: string, vendor_tax_id?: string): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**post** `/api/documents/`\n\nCreate a new invoice or credit note\n\n### Parameters\n\n- `construct_pdf?: boolean`\n  If true, generate a constructed PDF from the document and include it both as document attachment and embedded in the UBL.\n\n- `allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]`\n\n- `amount_due?: number | string`\n  The amount due for payment. Must be positive and rounded to maximum 2 decimals\n\n- `attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[]`\n\n- `billing_address?: string`\n  The billing address (if different from customer address)\n\n- `billing_address_recipient?: string`\n  The recipient name at the billing address\n\n- `charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]`\n\n- `currency?: string`\n  Currency of the invoice (ISO 4217 currency code)\n\n- `customer_address?: string`\n  The address of the customer/buyer\n\n- `customer_address_recipient?: string`\n  The recipient name at the customer address\n\n- `customer_company_id?: string`\n  Customer company ID. For Belgium this is the CBE number or their EUID (European Unique Identifier) number. In the Netherlands this is the KVK number.\n\n- `customer_email?: string`\n  The email address of the customer\n\n- `customer_id?: string`\n  The unique identifier for the customer in your system\n\n- `customer_name?: string`\n  The company name of the customer/buyer\n\n- `customer_peppol_id?: string`\n  Customer Peppol ID\n\n- `customer_tax_id?: string`\n  Customer tax ID. For Belgium this is the VAT number. Must include the country prefix\n\n- `direction?: 'INBOUND' | 'OUTBOUND'`\n  The direction of the document: INBOUND (purchases) or OUTBOUND (sales)\n\n- `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE\n\n- `due_date?: string`\n  The date when payment is due\n\n- `invoice_date?: string`\n  The date when the invoice was issued\n\n- `invoice_id?: string`\n  The unique invoice identifier/number\n\n- `invoice_total?: number | string`\n  The total amount of the invoice including tax (invoice_total = subtotal + total_tax + total_discount). Must be positive and rounded to maximum 2 decimals\n\n- `items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[]`\n  At least one line item is required\n\n- `note?: string`\n  Additional notes or comments for the invoice\n\n- `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n\n- `payment_term?: string`\n  The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')\n\n- `previous_unpaid_balance?: number | string`\n  The previous unpaid balance from prior invoices, if any. Must be positive and rounded to maximum 2 decimals\n\n- `purchase_order?: string`\n  The purchase order reference number\n\n- `remittance_address?: string`\n  The address where payment should be sent or remitted to\n\n- `remittance_address_recipient?: string`\n  The recipient name at the remittance address\n\n- `service_address?: string`\n  The address where services were performed or goods were delivered\n\n- `service_address_recipient?: string`\n  The recipient name at the service address\n\n- `service_end_date?: string`\n  The end date of the service period or delivery period\n\n- `service_start_date?: string`\n  The start date of the service period or delivery period\n\n- `shipping_address?: string`\n  The shipping/delivery address\n\n- `shipping_address_recipient?: string`\n  The recipient name at the shipping address\n\n- `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED\n\n- `subtotal?: number | string`\n  The taxable base of the invoice. Should be the sum of all line items - allowances (for example commercial discounts) + charges with impact on VAT. Must be positive and rounded to maximum 2 decimals\n\n- `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E for exempt)\n\n- `tax_details?: { amount?: number | string; rate?: string; }[]`\n\n- `total_discount?: number | string`\n  The net financial discount/charge of the invoice (non-VAT charges minus non-VAT allowances). Can be positive (net charge), negative (net discount), or zero. Must be rounded to maximum 2 decimals\n\n- `total_tax?: number | string`\n  The total tax amount of the invoice. Must be positive and rounded to maximum 2 decimals\n\n- `vatex?: string`\n  VATEX code list for VAT exemption reasons\n\nAgency: CEF\nIdentifier: vatex\n\n- `vatex_note?: string`\n  Textual explanation for VAT exemption\n\n- `vendor_address?: string`\n  The address of the vendor/seller\n\n- `vendor_address_recipient?: string`\n  The recipient name at the vendor address\n\n- `vendor_company_id?: string`\n  Vendor company ID. For Belgium this is the CBE number or their EUID (European Unique Identifier) number. In the Netherlands this is the KVK number.\n\n- `vendor_email?: string`\n  The email address of the vendor\n\n- `vendor_name?: string`\n  The name of the vendor/seller/supplier\n\n- `vendor_tax_id?: string`\n  Vendor tax ID. For Belgium this is the VAT number. Must include the country prefix\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentResponse = await client.documents.create();\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.create',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.documents.create();\n\nconsole.log(documentResponse.id);",
      },
      python: {
        method: 'documents.create',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.documents.create()\nprint(document_response.id)',
      },
      java: {
        method: 'documents().create',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentCreate params = DocumentCreate.builder().build();\n        DocumentResponse documentResponse = client.documents().create(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.create',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_response = e_invoice.documents.create\n\nputs(document_response)',
      },
      php: {
        method: 'documents->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->documents->create(\n  constructPdf: true,\n  allowances: [\n    [\n      'amount' => 0,\n      'baseAmount' => 0,\n      'multiplierFactor' => 0,\n      'reason' => 'reason',\n      'reasonCode' => '41',\n      'taxCode' => 'AE',\n      'taxRate' => 0,\n    ],\n  ],\n  amountDue: 0,\n  attachments: [\n    [\n      'fileName' => 'file_name',\n      'fileData' => 'file_data',\n      'fileSize' => 0,\n      'fileType' => 'file_type',\n    ],\n  ],\n  billingAddress: 'billing_address',\n  billingAddressRecipient: 'billing_address_recipient',\n  charges: [\n    [\n      'amount' => 0,\n      'baseAmount' => 0,\n      'multiplierFactor' => 0,\n      'reason' => 'reason',\n      'reasonCode' => 'AA',\n      'taxCode' => 'AE',\n      'taxRate' => '21.00',\n    ],\n  ],\n  currency: CurrencyCode::EUR,\n  customerAddress: 'customer_address',\n  customerAddressRecipient: 'customer_address_recipient',\n  customerCompanyID: '1018265814',\n  customerEmail: 'customer_email',\n  customerID: 'customer_id',\n  customerName: 'customer_name',\n  customerPeppolID: '0208:0123456789',\n  customerTaxID: 'BE1018265814',\n  direction: DocumentDirection::INBOUND,\n  documentType: DocumentType::INVOICE,\n  dueDate: '2019-12-27',\n  invoiceDate: '2019-12-27',\n  invoiceID: 'invoice_id',\n  invoiceTotal: 0,\n  items: [\n    [\n      'allowances' => [\n        [\n          'amount' => 0,\n          'baseAmount' => 0,\n          'multiplierFactor' => 0,\n          'reason' => 'reason',\n          'reasonCode' => '41',\n          'taxCode' => 'AE',\n          'taxRate' => 0,\n        ],\n      ],\n      'amount' => 0,\n      'charges' => [\n        [\n          'amount' => 0,\n          'baseAmount' => 0,\n          'multiplierFactor' => 0,\n          'reason' => 'reason',\n          'reasonCode' => 'AA',\n          'taxCode' => 'AE',\n          'taxRate' => '21.00',\n        ],\n      ],\n      'date' => null,\n      'description' => 'description',\n      'productCode' => 'product_code',\n      'quantity' => 0,\n      'tax' => 0,\n      'taxRate' => '21.00',\n      'unit' => UnitOfMeasureCode::_10,\n      'unitPrice' => 0,\n    ],\n  ],\n  note: 'note',\n  paymentDetails: [\n    [\n      'bankAccountNumber' => 'bank_account_number',\n      'iban' => 'iban',\n      'paymentReference' => 'payment_reference',\n      'swift' => 'swift',\n    ],\n  ],\n  paymentTerm: 'payment_term',\n  previousUnpaidBalance: 0,\n  purchaseOrder: 'purchase_order',\n  remittanceAddress: 'remittance_address',\n  remittanceAddressRecipient: 'remittance_address_recipient',\n  serviceAddress: 'service_address',\n  serviceAddressRecipient: 'service_address_recipient',\n  serviceEndDate: '2019-12-27',\n  serviceStartDate: '2019-12-27',\n  shippingAddress: 'shipping_address',\n  shippingAddressRecipient: 'shipping_address_recipient',\n  state: DocumentState::DRAFT,\n  subtotal: 0,\n  taxCode: 'AE',\n  taxDetails: [['amount' => 0, 'rate' => 'rate']],\n  totalDiscount: 0,\n  totalTax: 0,\n  vatex: 'VATEX-EU-79-C',\n  vatexNote: 'vatex_note',\n  vendorAddress: 'vendor_address',\n  vendorAddressRecipient: 'vendor_address_recipient',\n  vendorCompanyID: '1018265814',\n  vendorEmail: 'vendor_email',\n  vendorName: 'vendor_name',\n  vendorTaxID: 'BE1018265814',\n);\n\nvar_dump($documentResponse);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/ \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY" \\\n    -d \'{\n          "customer_company_id": "1018265814",\n          "customer_peppol_id": "0208:0123456789",\n          "customer_tax_id": "BE1018265814",\n          "vendor_company_id": "1018265814",\n          "vendor_tax_id": "BE1018265814"\n        }\'',
      },
    },
  },
  {
    name: 'send',
    endpoint: '/api/documents/{document_id}/send',
    httpMethod: 'post',
    summary: 'Send Document',
    description:
      'Send an invoice or credit note via Peppol. By default, the sender and receiver Peppol IDs are derived from the company (tax) IDs in the document, regardless of whether the document was created from a UBL with a different endpoint ID. To explicitly set the sender or receiver Peppol ID, provide them via the query parameters (sender_peppol_scheme, sender_peppol_id, receiver_peppol_scheme, receiver_peppol_id).',
    stainlessPath: '(resource) documents > (method) send',
    qualified: 'client.documents.send',
    params: [
      'document_id: string;',
      'email?: string;',
      'receiver_peppol_id?: string;',
      'receiver_peppol_scheme?: string;',
      'sender_peppol_id?: string;',
      'sender_peppol_scheme?: string;',
    ],
    response: 'object',
    markdown:
      "## send\n\n`client.documents.send(document_id: string, email?: string, receiver_peppol_id?: string, receiver_peppol_scheme?: string, sender_peppol_id?: string, sender_peppol_scheme?: string): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**post** `/api/documents/{document_id}/send`\n\nSend an invoice or credit note via Peppol. By default, the sender and receiver Peppol IDs are derived from the company (tax) IDs in the document, regardless of whether the document was created from a UBL with a different endpoint ID. To explicitly set the sender or receiver Peppol ID, provide them via the query parameters (sender_peppol_scheme, sender_peppol_id, receiver_peppol_scheme, receiver_peppol_id).\n\n### Parameters\n\n- `document_id: string`\n\n- `email?: string`\n\n- `receiver_peppol_id?: string`\n\n- `receiver_peppol_scheme?: string`\n\n- `sender_peppol_id?: string`\n\n- `sender_peppol_scheme?: string`\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentResponse = await client.documents.send('document_id');\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.send',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.documents.send('document_id');\n\nconsole.log(documentResponse.id);",
      },
      python: {
        method: 'documents.send',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.documents.send(\n    document_id="document_id",\n)\nprint(document_response.id)',
      },
      java: {
        method: 'documents().send',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.documents.DocumentSendParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentResponse documentResponse = client.documents().send("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.send_',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_response = e_invoice.documents.send_("document_id")\n\nputs(document_response)',
      },
      php: {
        method: 'documents->send',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->documents->send(\n  'document_id',\n  email: 'email',\n  receiverPeppolID: 'receiver_peppol_id',\n  receiverPeppolScheme: 'receiver_peppol_scheme',\n  senderPeppolID: 'sender_peppol_id',\n  senderPeppolScheme: 'sender_peppol_scheme',\n);\n\nvar_dump($documentResponse);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/send \\\n    -X POST \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/documents/{document_id}',
    httpMethod: 'get',
    summary: 'Get Document',
    description: 'Get an invoice or credit note by ID',
    stainlessPath: '(resource) documents > (method) retrieve',
    qualified: 'client.documents.retrieve',
    params: ['document_id: string;'],
    response: 'object',
    markdown:
      "## retrieve\n\n`client.documents.retrieve(document_id: string): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/documents/{document_id}`\n\nGet an invoice or credit note by ID\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentResponse = await client.documents.retrieve('document_id');\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.retrieve',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.documents.retrieve('document_id');\n\nconsole.log(documentResponse.id);",
      },
      python: {
        method: 'documents.retrieve',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.documents.retrieve(\n    "document_id",\n)\nprint(document_response.id)',
      },
      java: {
        method: 'documents().retrieve',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.documents.DocumentRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentResponse documentResponse = client.documents().retrieve("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.retrieve',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_response = e_invoice.documents.retrieve("document_id")\n\nputs(document_response)',
      },
      php: {
        method: 'documents->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->documents->retrieve('document_id');\n\nvar_dump($documentResponse);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/documents/{document_id}',
    httpMethod: 'delete',
    summary: 'Delete Document',
    description: 'Delete an invoice or credit note',
    stainlessPath: '(resource) documents > (method) delete',
    qualified: 'client.documents.delete',
    params: ['document_id: string;'],
    response: '{ is_deleted: boolean; }',
    markdown:
      "## delete\n\n`client.documents.delete(document_id: string): { is_deleted: boolean; }`\n\n**delete** `/api/documents/{document_id}`\n\nDelete an invoice or credit note\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ is_deleted: boolean; }`\n\n  - `is_deleted: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst document = await client.documents.delete('document_id');\n\nconsole.log(document);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.delete',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.documents.delete('document_id');\n\nconsole.log(document.is_deleted);",
      },
      python: {
        method: 'documents.delete',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.documents.delete(\n    "document_id",\n)\nprint(document.is_deleted)',
      },
      java: {
        method: 'documents().delete',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentDeleteParams;\nimport com.e_invoice.api.models.documents.DocumentDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentDeleteResponse document = client.documents().delete("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.delete',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument = e_invoice.documents.delete("document_id")\n\nputs(document)',
      },
      php: {
        method: 'documents->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$document = $client->documents->delete('document_id');\n\nvar_dump($document);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'create_from_pdf',
    endpoint: '/api/documents/pdf',
    httpMethod: 'post',
    summary: 'Create Document from PDF',
    description:
      "Create a new invoice or credit note from a PDF file. If the 'ubl_document' field is set in the response, it indicates that sufficient details were extracted from the PDF to automatically generate a valid UBL document ready for sending. If 'ubl_document' is not set, human intervention may be required to ensure compliance.",
    stainlessPath: '(resource) documents > (method) create_from_pdf',
    qualified: 'client.documents.createFromPdf',
    params: ['file: string;', 'customer_tax_id?: string;', 'vendor_tax_id?: string;'],
    response: 'object',
    markdown:
      "## create_from_pdf\n\n`client.documents.createFromPdf(file: string, customer_tax_id?: string, vendor_tax_id?: string): { allowances?: allowance[]; amount_due?: string; attachments?: document_attachment_create[]; billing_address?: string; billing_address_recipient?: string; charges?: charge[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: payment_detail_create[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; success?: boolean; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; ubl_document?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**post** `/api/documents/pdf`\n\nCreate a new invoice or credit note from a PDF file. If the 'ubl_document' field is set in the response, it indicates that sufficient details were extracted from the PDF to automatically generate a valid UBL document ready for sending. If 'ubl_document' is not set, human intervention may be required to ensure compliance.\n\n### Parameters\n\n- `file: string`\n\n- `customer_tax_id?: string`\n\n- `vendor_tax_id?: string`\n\n### Returns\n\n- `{ allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; success?: boolean; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; ubl_document?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `success?: boolean`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `ubl_document?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst response = await client.documents.createFromPdf({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.createFromPdf',
        example:
          "import fs from 'fs';\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.documents.createFromPdf({\n  file: fs.createReadStream('path/to/file'),\n});\n\nconsole.log(response.customer_company_id);",
      },
      python: {
        method: 'documents.create_from_pdf',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.documents.create_from_pdf(\n    file=b"Example data",\n)\nprint(response.customer_company_id)',
      },
      java: {
        method: 'documents().createFromPdf',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfParams;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfResponse;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentCreateFromPdfParams params = DocumentCreateFromPdfParams.builder()\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .build();\n        DocumentCreateFromPdfResponse response = client.documents().createFromPdf(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.create_from_pdf',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nresponse = e_invoice.documents.create_from_pdf(file: StringIO.new("Example data"))\n\nputs(response)',
      },
      php: {
        method: 'documents->createFromPdf',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->documents->createFromPdf(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n  customerTaxID: 'customer_tax_id',\n  vendorTaxID: 'vendor_tax_id',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          "curl https://api.e-invoice.be/api/documents/pdf \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $E_INVOICE_API_KEY\" \\\n    -F 'file=@/path/to/file'",
      },
    },
  },
  {
    name: 'validate',
    endpoint: '/api/documents/{document_id}/validate',
    httpMethod: 'post',
    summary: 'Validate Document',
    description: 'Validate a UBL document according to Peppol BIS Billing 3.0',
    stainlessPath: '(resource) documents > (method) validate',
    qualified: 'client.documents.validate',
    params: ['document_id: string;'],
    response:
      "{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }",
    markdown:
      "## validate\n\n`client.documents.validate(document_id: string): { id: string; file_name: string; is_valid: boolean; issues: object[]; ubl_document?: string; }`\n\n**post** `/api/documents/{document_id}/validate`\n\nValidate a UBL document according to Peppol BIS Billing 3.0\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `is_valid: boolean`\n  - `issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]`\n  - `ubl_document?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst ublDocumentValidation = await client.documents.validate('document_id');\n\nconsole.log(ublDocumentValidation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.validate',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst ublDocumentValidation = await client.documents.validate('document_id');\n\nconsole.log(ublDocumentValidation.id);",
      },
      python: {
        method: 'documents.validate',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nubl_document_validation = client.documents.validate(\n    "document_id",\n)\nprint(ubl_document_validation.id)',
      },
      java: {
        method: 'documents().validate',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentValidateParams;\nimport com.e_invoice.api.models.validate.UblDocumentValidation;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        UblDocumentValidation ublDocumentValidation = client.documents().validate("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.validate',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nubl_document_validation = e_invoice.documents.validate("document_id")\n\nputs(ubl_document_validation)',
      },
      php: {
        method: 'documents->validate',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$ublDocumentValidation = $client->documents->validate('document_id');\n\nvar_dump($ublDocumentValidation);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/validate \\\n    -X POST \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'add',
    endpoint: '/api/documents/{document_id}/attachments',
    httpMethod: 'post',
    summary: 'Add Attachment',
    description:
      'Add one or more attachments to an invoice. Be careful: the attachments ARE NOT ADDED to the UBL! They are only stored in our database and can be downloaded later. To add attachments to the UBL, you need to add the attachment(s) via POST /api/documents',
    stainlessPath: '(resource) documents.attachments > (method) add',
    qualified: 'client.documents.attachments.add',
    params: ['document_id: string;', 'file: string;'],
    response: '{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }',
    markdown:
      "## add\n\n`client.documents.attachments.add(document_id: string, file: string): { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }`\n\n**post** `/api/documents/{document_id}/attachments`\n\nAdd one or more attachments to an invoice. Be careful: the attachments ARE NOT ADDED to the UBL! They are only stored in our database and can be downloaded later. To add attachments to the UBL, you need to add the attachment(s) via POST /api/documents\n\n### Parameters\n\n- `document_id: string`\n\n- `file: string`\n\n### Returns\n\n- `{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `file_size?: number`\n  - `file_type?: string`\n  - `file_url?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentAttachment = await client.documents.attachments.add('document_id', { file: fs.createReadStream('path/to/file') });\n\nconsole.log(documentAttachment);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.attachments.add',
        example:
          "import fs from 'fs';\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentAttachment = await client.documents.attachments.add('document_id', {\n  file: fs.createReadStream('path/to/file'),\n});\n\nconsole.log(documentAttachment.id);",
      },
      python: {
        method: 'documents.attachments.add',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_attachment = client.documents.attachments.add(\n    document_id="document_id",\n    file=b"Example data",\n)\nprint(document_attachment.id)',
      },
      java: {
        method: 'documents().attachments().add',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.attachments.AttachmentAddParams;\nimport com.e_invoice.api.models.documents.attachments.DocumentAttachment;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        AttachmentAddParams params = AttachmentAddParams.builder()\n            .documentId("document_id")\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .build();\n        DocumentAttachment documentAttachment = client.documents().attachments().add(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.attachments.add',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_attachment = e_invoice.documents.attachments.add("document_id", file: StringIO.new("Example data"))\n\nputs(document_attachment)',
      },
      php: {
        method: 'documents->attachments->add',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentAttachment = $client->documents->attachments->add(\n  'document_id',\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n);\n\nvar_dump($documentAttachment);",
      },
      http: {
        example:
          "curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/attachments \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $E_INVOICE_API_KEY\" \\\n    -F 'file=@/path/to/file'",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/api/documents/{document_id}/attachments',
    httpMethod: 'get',
    summary: 'Get Document Attachments',
    description: 'Get all attachments for an invoice or credit note',
    stainlessPath: '(resource) documents.attachments > (method) list',
    qualified: 'client.documents.attachments.list',
    params: ['document_id: string;'],
    response:
      '{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]',
    markdown:
      "## list\n\n`client.documents.attachments.list(document_id: string): object[]`\n\n**get** `/api/documents/{document_id}/attachments`\n\nGet all attachments for an invoice or credit note\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentAttachments = await client.documents.attachments.list('document_id');\n\nconsole.log(documentAttachments);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.attachments.list',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentAttachments = await client.documents.attachments.list('document_id');\n\nconsole.log(documentAttachments);",
      },
      python: {
        method: 'documents.attachments.list',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_attachments = client.documents.attachments.list(\n    "document_id",\n)\nprint(document_attachments)',
      },
      java: {
        method: 'documents().attachments().list',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.attachments.AttachmentListParams;\nimport com.e_invoice.api.models.documents.attachments.DocumentAttachment;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        List<DocumentAttachment> documentAttachments = client.documents().attachments().list("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.attachments.list',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_attachments = e_invoice.documents.attachments.list("document_id")\n\nputs(document_attachments)',
      },
      php: {
        method: 'documents->attachments->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentAttachments = $client->documents->attachments->list('document_id');\n\nvar_dump($documentAttachments);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/attachments \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/documents/{document_id}/attachments/{attachment_id}',
    httpMethod: 'get',
    summary: 'Get Document Attachment',
    description:
      'Get attachment details with for an invoice or credit note with link to download file (signed URL, valid for 1 hour)',
    stainlessPath: '(resource) documents.attachments > (method) retrieve',
    qualified: 'client.documents.attachments.retrieve',
    params: ['document_id: string;', 'attachment_id: string;'],
    response: '{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }',
    markdown:
      "## retrieve\n\n`client.documents.attachments.retrieve(document_id: string, attachment_id: string): { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }`\n\n**get** `/api/documents/{document_id}/attachments/{attachment_id}`\n\nGet attachment details with for an invoice or credit note with link to download file (signed URL, valid for 1 hour)\n\n### Parameters\n\n- `document_id: string`\n\n- `attachment_id: string`\n\n### Returns\n\n- `{ id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `file_size?: number`\n  - `file_type?: string`\n  - `file_url?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentAttachment = await client.documents.attachments.retrieve('attachment_id', { document_id: 'document_id' });\n\nconsole.log(documentAttachment);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.attachments.retrieve',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentAttachment = await client.documents.attachments.retrieve('attachment_id', {\n  document_id: 'document_id',\n});\n\nconsole.log(documentAttachment.id);",
      },
      python: {
        method: 'documents.attachments.retrieve',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_attachment = client.documents.attachments.retrieve(\n    attachment_id="attachment_id",\n    document_id="document_id",\n)\nprint(document_attachment.id)',
      },
      java: {
        method: 'documents().attachments().retrieve',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.attachments.AttachmentRetrieveParams;\nimport com.e_invoice.api.models.documents.attachments.DocumentAttachment;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        AttachmentRetrieveParams params = AttachmentRetrieveParams.builder()\n            .documentId("document_id")\n            .attachmentId("attachment_id")\n            .build();\n        DocumentAttachment documentAttachment = client.documents().attachments().retrieve(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.attachments.retrieve',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_attachment = e_invoice.documents.attachments.retrieve("attachment_id", document_id: "document_id")\n\nputs(document_attachment)',
      },
      php: {
        method: 'documents->attachments->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentAttachment = $client->documents->attachments->retrieve(\n  'attachment_id', documentID: 'document_id'\n);\n\nvar_dump($documentAttachment);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/attachments/$ATTACHMENT_ID \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/documents/{document_id}/attachments/{attachment_id}',
    httpMethod: 'delete',
    summary: 'Delete Document Attachment',
    description: 'Delete an attachment from an invoice or credit note',
    stainlessPath: '(resource) documents.attachments > (method) delete',
    qualified: 'client.documents.attachments.delete',
    params: ['document_id: string;', 'attachment_id: string;'],
    response: '{ is_deleted: boolean; }',
    markdown:
      "## delete\n\n`client.documents.attachments.delete(document_id: string, attachment_id: string): { is_deleted: boolean; }`\n\n**delete** `/api/documents/{document_id}/attachments/{attachment_id}`\n\nDelete an attachment from an invoice or credit note\n\n### Parameters\n\n- `document_id: string`\n\n- `attachment_id: string`\n\n### Returns\n\n- `{ is_deleted: boolean; }`\n\n  - `is_deleted: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst attachment = await client.documents.attachments.delete('attachment_id', { document_id: 'document_id' });\n\nconsole.log(attachment);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.attachments.delete',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst attachment = await client.documents.attachments.delete('attachment_id', {\n  document_id: 'document_id',\n});\n\nconsole.log(attachment.is_deleted);",
      },
      python: {
        method: 'documents.attachments.delete',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nattachment = client.documents.attachments.delete(\n    attachment_id="attachment_id",\n    document_id="document_id",\n)\nprint(attachment.is_deleted)',
      },
      java: {
        method: 'documents().attachments().delete',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.attachments.AttachmentDeleteParams;\nimport com.e_invoice.api.models.documents.attachments.AttachmentDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        AttachmentDeleteParams params = AttachmentDeleteParams.builder()\n            .documentId("document_id")\n            .attachmentId("attachment_id")\n            .build();\n        AttachmentDeleteResponse attachment = client.documents().attachments().delete(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.attachments.delete',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nattachment = e_invoice.documents.attachments.delete("attachment_id", document_id: "document_id")\n\nputs(attachment)',
      },
      php: {
        method: 'documents->attachments->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$attachment = $client->documents->attachments->delete(\n  'attachment_id', documentID: 'document_id'\n);\n\nvar_dump($attachment);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/attachments/$ATTACHMENT_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'get',
    endpoint: '/api/documents/{document_id}/ubl',
    httpMethod: 'get',
    summary: 'Get Document UBL',
    description: 'Get the UBL for an invoice or credit note',
    stainlessPath: '(resource) documents.ubl > (method) get',
    qualified: 'client.documents.ubl.get',
    params: ['document_id: string;'],
    response:
      '{ id: string; file_name: string; file_hash?: string; file_size?: number; receiver_peppol_id?: string; receiver_peppol_scheme?: string; sender_peppol_id?: string; sender_peppol_scheme?: string; signed_url?: string; validated_at?: string; }',
    markdown:
      "## get\n\n`client.documents.ubl.get(document_id: string): { id: string; file_name: string; file_hash?: string; file_size?: number; receiver_peppol_id?: string; receiver_peppol_scheme?: string; sender_peppol_id?: string; sender_peppol_scheme?: string; signed_url?: string; validated_at?: string; }`\n\n**get** `/api/documents/{document_id}/ubl`\n\nGet the UBL for an invoice or credit note\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ id: string; file_name: string; file_hash?: string; file_size?: number; receiver_peppol_id?: string; receiver_peppol_scheme?: string; sender_peppol_id?: string; sender_peppol_scheme?: string; signed_url?: string; validated_at?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `file_hash?: string`\n  - `file_size?: number`\n  - `receiver_peppol_id?: string`\n  - `receiver_peppol_scheme?: string`\n  - `sender_peppol_id?: string`\n  - `sender_peppol_scheme?: string`\n  - `signed_url?: string`\n  - `validated_at?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst ubl = await client.documents.ubl.get('document_id');\n\nconsole.log(ubl);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.ubl.get',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst ubl = await client.documents.ubl.get('document_id');\n\nconsole.log(ubl.id);",
      },
      python: {
        method: 'documents.ubl.get',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nubl = client.documents.ubl.get(\n    "document_id",\n)\nprint(ubl.id)',
      },
      java: {
        method: 'documents().ubl().get',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.ubl.UblGetParams;\nimport com.e_invoice.api.models.documents.ubl.UblGetResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        UblGetResponse ubl = client.documents().ubl().get("document_id");\n    }\n}',
      },
      ruby: {
        method: 'documents.ubl.get',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nubl = e_invoice.documents.ubl.get("document_id")\n\nputs(ubl)',
      },
      php: {
        method: 'documents->ubl->get',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$ubl = $client->documents->ubl->get('document_id');\n\nvar_dump($ubl);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/documents/$DOCUMENT_ID/ubl \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'create_from_ubl',
    endpoint: '/api/documents/ubl',
    httpMethod: 'post',
    summary: 'Create Document from UBL',
    description: 'Create a new invoice or credit note from a UBL file',
    stainlessPath: '(resource) documents.ubl > (method) create_from_ubl',
    qualified: 'client.documents.ubl.createFromUbl',
    params: ['file: string;'],
    response: 'object',
    markdown:
      "## create_from_ubl\n\n`client.documents.ubl.createFromUbl(file: string): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**post** `/api/documents/ubl`\n\nCreate a new invoice or credit note from a UBL file\n\n### Parameters\n\n- `file: string`\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst documentResponse = await client.documents.ubl.createFromUbl({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(documentResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.documents.ubl.createFromUbl',
        example:
          "import fs from 'fs';\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.documents.ubl.createFromUbl({\n  file: fs.createReadStream('path/to/file'),\n});\n\nconsole.log(documentResponse.id);",
      },
      python: {
        method: 'documents.ubl.create_from_ubl',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\ndocument_response = client.documents.ubl.create_from_ubl(\n    file=b"Example data",\n)\nprint(document_response.id)',
      },
      java: {
        method: 'documents().ubl().createFromUbl',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.documents.ubl.UblCreateFromUblParams;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        UblCreateFromUblParams params = UblCreateFromUblParams.builder()\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .build();\n        DocumentResponse documentResponse = client.documents().ubl().createFromUbl(params);\n    }\n}',
      },
      ruby: {
        method: 'documents.ubl.create_from_ubl',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\ndocument_response = e_invoice.documents.ubl.create_from_ubl(file: StringIO.new("Example data"))\n\nputs(document_response)',
      },
      php: {
        method: 'documents->ubl->createFromUbl',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$documentResponse = $client->documents->ubl->createFromUbl(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n);\n\nvar_dump($documentResponse);",
      },
      http: {
        example:
          "curl https://api.e-invoice.be/api/documents/ubl \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $E_INVOICE_API_KEY\" \\\n    -F 'file=@/path/to/file'",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/api/inbox/',
    httpMethod: 'get',
    summary: 'List Received Documents',
    description:
      'Retrieve a paginated list of received documents with filtering options including state, type, sender, date range, and text search.',
    stainlessPath: '(resource) inbox > (method) list',
    qualified: 'client.inbox.list',
    params: [
      'date_from?: string;',
      'date_to?: string;',
      'page?: number;',
      'page_size?: number;',
      'search?: string;',
      'sender?: string;',
      'sort_by?: string;',
      "sort_order?: 'asc' | 'desc';",
      "type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE';",
    ],
    response: 'object',
    markdown:
      "## list\n\n`client.inbox.list(date_from?: string, date_to?: string, page?: number, page_size?: number, search?: string, sender?: string, sort_by?: string, sort_order?: 'asc' | 'desc', type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/inbox/`\n\nRetrieve a paginated list of received documents with filtering options including state, type, sender, date range, and text search.\n\n### Parameters\n\n- `date_from?: string`\n  Filter by issue date (from)\n\n- `date_to?: string`\n  Filter by issue date (to)\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `search?: string`\n  Search in invoice number, seller/buyer names\n\n- `sender?: string`\n  Filter by sender (vendor_name, vendor_email, vendor_tax_id, vendor_company_id)\n\n- `sort_by?: string`\n  Field to sort by\n\n- `sort_order?: 'asc' | 'desc'`\n  Sort direction (asc/desc)\n\n- `type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  Filter by document type. If not provided, returns all types.\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.list()) {\n  console.log(documentResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inbox.list',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.list()) {\n  console.log(documentResponse.id);\n}",
      },
      python: {
        method: 'inbox.list',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inbox.list()\npage = page.items[0]\nprint(page.id)',
      },
      java: {
        method: 'inbox().list',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.inbox.InboxListPage;\nimport com.e_invoice.api.models.inbox.InboxListParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        InboxListPage page = client.inbox().list();\n    }\n}',
      },
      ruby: {
        method: 'inbox.list',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\npage = e_invoice.inbox.list\n\nputs(page)',
      },
      php: {
        method: 'inbox->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->inbox->list(\n  dateFrom: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  dateTo: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  page: 1,\n  pageSize: 1,\n  search: 'search',\n  sender: 'sender',\n  sortBy: 'created_at',\n  sortOrder: 'asc',\n  type: DocumentType::INVOICE,\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/inbox/ \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'list_invoices',
    endpoint: '/api/inbox/invoices',
    httpMethod: 'get',
    summary: 'List Received Invoices',
    description: 'Retrieve a paginated list of received invoices with filtering options.',
    stainlessPath: '(resource) inbox > (method) list_invoices',
    qualified: 'client.inbox.listInvoices',
    params: ['page?: number;', 'page_size?: number;', 'sort_by?: string;', "sort_order?: 'asc' | 'desc';"],
    response: 'object',
    markdown:
      "## list_invoices\n\n`client.inbox.listInvoices(page?: number, page_size?: number, sort_by?: string, sort_order?: 'asc' | 'desc'): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/inbox/invoices`\n\nRetrieve a paginated list of received invoices with filtering options.\n\n### Parameters\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `sort_by?: string`\n  Field to sort by\n\n- `sort_order?: 'asc' | 'desc'`\n  Sort direction (asc/desc)\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.listInvoices()) {\n  console.log(documentResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inbox.listInvoices',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.listInvoices()) {\n  console.log(documentResponse.id);\n}",
      },
      python: {
        method: 'inbox.list_invoices',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inbox.list_invoices()\npage = page.items[0]\nprint(page.id)',
      },
      java: {
        method: 'inbox().listInvoices',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.inbox.InboxListInvoicesPage;\nimport com.e_invoice.api.models.inbox.InboxListInvoicesParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        InboxListInvoicesPage page = client.inbox().listInvoices();\n    }\n}',
      },
      ruby: {
        method: 'inbox.list_invoices',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\npage = e_invoice.inbox.list_invoices\n\nputs(page)',
      },
      php: {
        method: 'inbox->listInvoices',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->inbox->listInvoices(\n  page: 1, pageSize: 1, sortBy: 'created_at', sortOrder: 'asc'\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/inbox/invoices \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'list_credit_notes',
    endpoint: '/api/inbox/credit-notes',
    httpMethod: 'get',
    summary: 'List Received Credit Notes',
    description: 'Retrieve a paginated list of received credit notes with filtering options.',
    stainlessPath: '(resource) inbox > (method) list_credit_notes',
    qualified: 'client.inbox.listCreditNotes',
    params: ['page?: number;', 'page_size?: number;', 'sort_by?: string;', "sort_order?: 'asc' | 'desc';"],
    response: 'object',
    markdown:
      "## list_credit_notes\n\n`client.inbox.listCreditNotes(page?: number, page_size?: number, sort_by?: string, sort_order?: 'asc' | 'desc'): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/inbox/credit-notes`\n\nRetrieve a paginated list of received credit notes with filtering options.\n\n### Parameters\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `sort_by?: string`\n  Field to sort by\n\n- `sort_order?: 'asc' | 'desc'`\n  Sort direction (asc/desc)\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.listCreditNotes()) {\n  console.log(documentResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.inbox.listCreditNotes',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.inbox.listCreditNotes()) {\n  console.log(documentResponse.id);\n}",
      },
      python: {
        method: 'inbox.list_credit_notes',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.inbox.list_credit_notes()\npage = page.items[0]\nprint(page.id)',
      },
      java: {
        method: 'inbox().listCreditNotes',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.inbox.InboxListCreditNotesPage;\nimport com.e_invoice.api.models.inbox.InboxListCreditNotesParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        InboxListCreditNotesPage page = client.inbox().listCreditNotes();\n    }\n}',
      },
      ruby: {
        method: 'inbox.list_credit_notes',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\npage = e_invoice.inbox.list_credit_notes\n\nputs(page)',
      },
      php: {
        method: 'inbox->listCreditNotes',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->inbox->listCreditNotes(\n  page: 1, pageSize: 1, sortBy: 'created_at', sortOrder: 'asc'\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/inbox/credit-notes \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'list_received_documents',
    endpoint: '/api/outbox/',
    httpMethod: 'get',
    summary: 'List Sent Documents',
    description:
      'Retrieve a paginated list of sent documents with filtering options including state, type, sender, date range, and text search.',
    stainlessPath: '(resource) outbox > (method) list_received_documents',
    qualified: 'client.outbox.listReceivedDocuments',
    params: [
      'date_from?: string;',
      'date_to?: string;',
      'page?: number;',
      'page_size?: number;',
      'receiver?: string;',
      'search?: string;',
      'sender?: string;',
      'sort_by?: string;',
      "sort_order?: 'asc' | 'desc';",
      "type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE';",
    ],
    response: 'object',
    markdown:
      "## list_received_documents\n\n`client.outbox.listReceivedDocuments(date_from?: string, date_to?: string, page?: number, page_size?: number, receiver?: string, search?: string, sender?: string, sort_by?: string, sort_order?: 'asc' | 'desc', type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/outbox/`\n\nRetrieve a paginated list of sent documents with filtering options including state, type, sender, date range, and text search.\n\n### Parameters\n\n- `date_from?: string`\n  Filter by issue date (from)\n\n- `date_to?: string`\n  Filter by issue date (to)\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `receiver?: string`\n  Filter by receiver (customer_name, customer_email, customer_tax_id, customer_company_id, customer_id)\n\n- `search?: string`\n  Search in invoice number, seller/buyer names\n\n- `sender?: string`\n  (Deprecated) Filter by sender ID\n\n- `sort_by?: string`\n  Field to sort by\n\n- `sort_order?: 'asc' | 'desc'`\n  Sort direction (asc/desc)\n\n- `type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  Filter by document type. If not provided, returns all types.\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.outbox.listReceivedDocuments()) {\n  console.log(documentResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.outbox.listReceivedDocuments',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.outbox.listReceivedDocuments()) {\n  console.log(documentResponse.id);\n}",
      },
      python: {
        method: 'outbox.list_received_documents',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.outbox.list_received_documents()\npage = page.items[0]\nprint(page.id)',
      },
      java: {
        method: 'outbox().listReceivedDocuments',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.outbox.OutboxListReceivedDocumentsPage;\nimport com.e_invoice.api.models.outbox.OutboxListReceivedDocumentsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        OutboxListReceivedDocumentsPage page = client.outbox().listReceivedDocuments();\n    }\n}',
      },
      ruby: {
        method: 'outbox.list_received_documents',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\npage = e_invoice.outbox.list_received_documents\n\nputs(page)',
      },
      php: {
        method: 'outbox->listReceivedDocuments',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->outbox->listReceivedDocuments(\n  dateFrom: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  dateTo: new \\DateTimeImmutable('2019-12-27T18:11:19.117Z'),\n  page: 1,\n  pageSize: 1,\n  receiver: 'receiver',\n  search: 'search',\n  sender: 'sender',\n  sortBy: 'created_at',\n  sortOrder: 'asc',\n  type: DocumentType::INVOICE,\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/outbox/ \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'list_draft_documents',
    endpoint: '/api/outbox/drafts',
    httpMethod: 'get',
    summary: 'List Draft Documents',
    description:
      'Retrieve a paginated list of draft documents with filtering options including state and text search.',
    stainlessPath: '(resource) outbox > (method) list_draft_documents',
    qualified: 'client.outbox.listDraftDocuments',
    params: [
      'page?: number;',
      'page_size?: number;',
      'search?: string;',
      'sort_by?: string;',
      "sort_order?: 'asc' | 'desc';",
      "state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED';",
      "type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE';",
    ],
    response: 'object',
    markdown:
      "## list_draft_documents\n\n`client.outbox.listDraftDocuments(page?: number, page_size?: number, search?: string, sort_by?: string, sort_order?: 'asc' | 'desc', state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED', type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'): { id: string; created_at: string; allowances?: object[]; amount_due?: string; attachments?: document_attachment[]; billing_address?: string; billing_address_recipient?: string; charges?: object[]; currency?: currency_code; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: document_direction; document_type?: document_type; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: object[]; note?: string; payment_details?: object[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: document_state; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: object[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n**get** `/api/outbox/drafts`\n\nRetrieve a paginated list of draft documents with filtering options including state and text search.\n\n### Parameters\n\n- `page?: number`\n  Page number\n\n- `page_size?: number`\n  Number of items per page\n\n- `search?: string`\n  Search in invoice number, seller/buyer names\n\n- `sort_by?: string`\n  Field to sort by\n\n- `sort_order?: 'asc' | 'desc'`\n  Sort direction (asc/desc)\n\n- `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  Filter by document state\n\n- `type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  Filter by document type\n\n### Returns\n\n- `{ id: string; created_at: string; allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount_due?: string; attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]; billing_address?: string; billing_address_recipient?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; currency?: string; customer_address?: string; customer_address_recipient?: string; customer_company_id?: string; customer_email?: string; customer_id?: string; customer_name?: string; customer_peppol_id?: string; customer_tax_id?: string; direction?: 'INBOUND' | 'OUTBOUND'; document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'; due_date?: string; invoice_date?: string; invoice_id?: string; invoice_total?: string; items?: { allowances?: object[]; amount?: string; charges?: object[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]; note?: string; payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]; payment_term?: string; purchase_order?: string; remittance_address?: string; remittance_address_recipient?: string; service_address?: string; service_address_recipient?: string; service_end_date?: string; service_start_date?: string; shipping_address?: string; shipping_address_recipient?: string; state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'; subtotal?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_details?: { amount?: string; rate?: string; }[]; total_discount?: string; total_tax?: string; vatex?: string; vatex_note?: string; vendor_address?: string; vendor_address_recipient?: string; vendor_company_id?: string; vendor_email?: string; vendor_name?: string; vendor_tax_id?: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `amount_due?: string`\n  - `attachments?: { id: string; file_name: string; file_size?: number; file_type?: string; file_url?: string; }[]`\n  - `billing_address?: string`\n  - `billing_address_recipient?: string`\n  - `charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]`\n  - `currency?: string`\n  - `customer_address?: string`\n  - `customer_address_recipient?: string`\n  - `customer_company_id?: string`\n  - `customer_email?: string`\n  - `customer_id?: string`\n  - `customer_name?: string`\n  - `customer_peppol_id?: string`\n  - `customer_tax_id?: string`\n  - `direction?: 'INBOUND' | 'OUTBOUND'`\n  - `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  - `due_date?: string`\n  - `invoice_date?: string`\n  - `invoice_id?: string`\n  - `invoice_total?: string`\n  - `items?: { allowances?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; amount?: string; charges?: { amount?: string; base_amount?: string; multiplier_factor?: string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: string; }[]; date?: null; description?: string; product_code?: string; quantity?: string; tax?: string; tax_rate?: string; unit?: string; unit_price?: string; }[]`\n  - `note?: string`\n  - `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n  - `payment_term?: string`\n  - `purchase_order?: string`\n  - `remittance_address?: string`\n  - `remittance_address_recipient?: string`\n  - `service_address?: string`\n  - `service_address_recipient?: string`\n  - `service_end_date?: string`\n  - `service_start_date?: string`\n  - `shipping_address?: string`\n  - `shipping_address_recipient?: string`\n  - `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  - `subtotal?: string`\n  - `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  - `tax_details?: { amount?: string; rate?: string; }[]`\n  - `total_discount?: string`\n  - `total_tax?: string`\n  - `vatex?: string`\n  - `vatex_note?: string`\n  - `vendor_address?: string`\n  - `vendor_address_recipient?: string`\n  - `vendor_company_id?: string`\n  - `vendor_email?: string`\n  - `vendor_name?: string`\n  - `vendor_tax_id?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.outbox.listDraftDocuments()) {\n  console.log(documentResponse);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.outbox.listDraftDocuments',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const documentResponse of client.outbox.listDraftDocuments()) {\n  console.log(documentResponse.id);\n}",
      },
      python: {
        method: 'outbox.list_draft_documents',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\npage = client.outbox.list_draft_documents()\npage = page.items[0]\nprint(page.id)',
      },
      java: {
        method: 'outbox().listDraftDocuments',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.outbox.OutboxListDraftDocumentsPage;\nimport com.e_invoice.api.models.outbox.OutboxListDraftDocumentsParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        OutboxListDraftDocumentsPage page = client.outbox().listDraftDocuments();\n    }\n}',
      },
      ruby: {
        method: 'outbox.list_draft_documents',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\npage = e_invoice.outbox.list_draft_documents\n\nputs(page)',
      },
      php: {
        method: 'outbox->listDraftDocuments',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$page = $client->outbox->listDraftDocuments(\n  page: 1,\n  pageSize: 1,\n  search: 'search',\n  sortBy: 'created_at',\n  sortOrder: 'asc',\n  state: DocumentState::DRAFT,\n  type: DocumentType::INVOICE,\n);\n\nvar_dump($page);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/outbox/drafts \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'validate_ubl',
    endpoint: '/api/validate/ubl',
    httpMethod: 'post',
    summary: 'Validate UBL Document',
    description: 'Validate the correctness of a UBL document',
    stainlessPath: '(resource) validate > (method) validate_ubl',
    qualified: 'client.validate.validateUbl',
    params: ['file: string;'],
    response:
      "{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }",
    markdown:
      "## validate_ubl\n\n`client.validate.validateUbl(file: string): { id: string; file_name: string; is_valid: boolean; issues: object[]; ubl_document?: string; }`\n\n**post** `/api/validate/ubl`\n\nValidate the correctness of a UBL document\n\n### Parameters\n\n- `file: string`\n\n### Returns\n\n- `{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `is_valid: boolean`\n  - `issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]`\n  - `ubl_document?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst ublDocumentValidation = await client.validate.validateUbl({ file: fs.createReadStream('path/to/file') });\n\nconsole.log(ublDocumentValidation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.validate.validateUbl',
        example:
          "import fs from 'fs';\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst ublDocumentValidation = await client.validate.validateUbl({\n  file: fs.createReadStream('path/to/file'),\n});\n\nconsole.log(ublDocumentValidation.id);",
      },
      python: {
        method: 'validate.validate_ubl',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nubl_document_validation = client.validate.validate_ubl(\n    file=b"Example data",\n)\nprint(ubl_document_validation.id)',
      },
      java: {
        method: 'validate().validateUbl',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.validate.UblDocumentValidation;\nimport com.e_invoice.api.models.validate.ValidateValidateUblParams;\nimport java.io.ByteArrayInputStream;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        ValidateValidateUblParams params = ValidateValidateUblParams.builder()\n            .file(new ByteArrayInputStream("Example data".getBytes()))\n            .build();\n        UblDocumentValidation ublDocumentValidation = client.validate().validateUbl(params);\n    }\n}',
      },
      ruby: {
        method: 'validate.validate_ubl',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nubl_document_validation = e_invoice.validate.validate_ubl(file: StringIO.new("Example data"))\n\nputs(ubl_document_validation)',
      },
      php: {
        method: 'validate->validateUbl',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$ublDocumentValidation = $client->validate->validateUbl(\n  file: FileParam::fromString('Example data', filename: uniqid('file-upload-', true)),\n);\n\nvar_dump($ublDocumentValidation);",
      },
      http: {
        example:
          "curl https://api.e-invoice.be/api/validate/ubl \\\n    -H 'Content-Type: multipart/form-data' \\\n    -H \"Authorization: Bearer $E_INVOICE_API_KEY\" \\\n    -F 'file=@/path/to/file'",
      },
    },
  },
  {
    name: 'validate_json',
    endpoint: '/api/validate/json',
    httpMethod: 'post',
    summary: 'Validate JSON Document',
    description: 'Validate if the JSON document can be converted to a valid UBL document',
    stainlessPath: '(resource) validate > (method) validate_json',
    qualified: 'client.validate.validateJson',
    params: [
      "allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[];",
      'amount_due?: number | string;',
      'attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[];',
      'billing_address?: string;',
      'billing_address_recipient?: string;',
      "charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[];",
      'currency?: string;',
      'customer_address?: string;',
      'customer_address_recipient?: string;',
      'customer_company_id?: string;',
      'customer_email?: string;',
      'customer_id?: string;',
      'customer_name?: string;',
      'customer_peppol_id?: string;',
      'customer_tax_id?: string;',
      "direction?: 'INBOUND' | 'OUTBOUND';",
      "document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE';",
      'due_date?: string;',
      'invoice_date?: string;',
      'invoice_id?: string;',
      'invoice_total?: number | string;',
      "items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[];",
      'note?: string;',
      'payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[];',
      'payment_term?: string;',
      'previous_unpaid_balance?: number | string;',
      'purchase_order?: string;',
      'remittance_address?: string;',
      'remittance_address_recipient?: string;',
      'service_address?: string;',
      'service_address_recipient?: string;',
      'service_end_date?: string;',
      'service_start_date?: string;',
      'shipping_address?: string;',
      'shipping_address_recipient?: string;',
      "state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED';",
      'subtotal?: number | string;',
      "tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';",
      'tax_details?: { amount?: number | string; rate?: string; }[];',
      'total_discount?: number | string;',
      'total_tax?: number | string;',
      'vatex?: string;',
      'vatex_note?: string;',
      'vendor_address?: string;',
      'vendor_address_recipient?: string;',
      'vendor_company_id?: string;',
      'vendor_email?: string;',
      'vendor_name?: string;',
      'vendor_tax_id?: string;',
    ],
    response:
      "{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }",
    markdown:
      "## validate_json\n\n`client.validate.validateJson(allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[], amount_due?: number | string, attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[], billing_address?: string, billing_address_recipient?: string, charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[], currency?: string, customer_address?: string, customer_address_recipient?: string, customer_company_id?: string, customer_email?: string, customer_id?: string, customer_name?: string, customer_peppol_id?: string, customer_tax_id?: string, direction?: 'INBOUND' | 'OUTBOUND', document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE', due_date?: string, invoice_date?: string, invoice_id?: string, invoice_total?: number | string, items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[], note?: string, payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[], payment_term?: string, previous_unpaid_balance?: number | string, purchase_order?: string, remittance_address?: string, remittance_address_recipient?: string, service_address?: string, service_address_recipient?: string, service_end_date?: string, service_start_date?: string, shipping_address?: string, shipping_address_recipient?: string, state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED', subtotal?: number | string, tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B', tax_details?: { amount?: number | string; rate?: string; }[], total_discount?: number | string, total_tax?: number | string, vatex?: string, vatex_note?: string, vendor_address?: string, vendor_address_recipient?: string, vendor_company_id?: string, vendor_email?: string, vendor_name?: string, vendor_tax_id?: string): { id: string; file_name: string; is_valid: boolean; issues: object[]; ubl_document?: string; }`\n\n**post** `/api/validate/json`\n\nValidate if the JSON document can be converted to a valid UBL document\n\n### Parameters\n\n- `allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]`\n\n- `amount_due?: number | string`\n  The amount due for payment. Must be positive and rounded to maximum 2 decimals\n\n- `attachments?: { file_name: string; file_data?: string; file_size?: number; file_type?: string; }[]`\n\n- `billing_address?: string`\n  The billing address (if different from customer address)\n\n- `billing_address_recipient?: string`\n  The recipient name at the billing address\n\n- `charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]`\n\n- `currency?: string`\n  Currency of the invoice (ISO 4217 currency code)\n\n- `customer_address?: string`\n  The address of the customer/buyer\n\n- `customer_address_recipient?: string`\n  The recipient name at the customer address\n\n- `customer_company_id?: string`\n  Customer company ID. For Belgium this is the CBE number or their EUID (European Unique Identifier) number. In the Netherlands this is the KVK number.\n\n- `customer_email?: string`\n  The email address of the customer\n\n- `customer_id?: string`\n  The unique identifier for the customer in your system\n\n- `customer_name?: string`\n  The company name of the customer/buyer\n\n- `customer_peppol_id?: string`\n  Customer Peppol ID\n\n- `customer_tax_id?: string`\n  Customer tax ID. For Belgium this is the VAT number. Must include the country prefix\n\n- `direction?: 'INBOUND' | 'OUTBOUND'`\n  The direction of the document: INBOUND (purchases) or OUTBOUND (sales)\n\n- `document_type?: 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'SELFBILLING_INVOICE' | 'SELFBILLING_CREDIT_NOTE'`\n  The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE\n\n- `due_date?: string`\n  The date when payment is due\n\n- `invoice_date?: string`\n  The date when the invoice was issued\n\n- `invoice_id?: string`\n  The unique invoice identifier/number\n\n- `invoice_total?: number | string`\n  The total amount of the invoice including tax (invoice_total = subtotal + total_tax + total_discount). Must be positive and rounded to maximum 2 decimals\n\n- `items?: { allowances?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; amount?: number | string; charges?: { amount?: number | string; base_amount?: number | string; multiplier_factor?: number | string; reason?: string; reason_code?: string; tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'; tax_rate?: number | string; }[]; date?: null; description?: string; product_code?: string; quantity?: number | string; tax?: number | string; tax_rate?: number | string; unit?: string; unit_price?: number | string; }[]`\n  At least one line item is required\n\n- `note?: string`\n  Additional notes or comments for the invoice\n\n- `payment_details?: { bank_account_number?: string; iban?: string; payment_reference?: string; swift?: string; }[]`\n\n- `payment_term?: string`\n  The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')\n\n- `previous_unpaid_balance?: number | string`\n  The previous unpaid balance from prior invoices, if any. Must be positive and rounded to maximum 2 decimals\n\n- `purchase_order?: string`\n  The purchase order reference number\n\n- `remittance_address?: string`\n  The address where payment should be sent or remitted to\n\n- `remittance_address_recipient?: string`\n  The recipient name at the remittance address\n\n- `service_address?: string`\n  The address where services were performed or goods were delivered\n\n- `service_address_recipient?: string`\n  The recipient name at the service address\n\n- `service_end_date?: string`\n  The end date of the service period or delivery period\n\n- `service_start_date?: string`\n  The start date of the service period or delivery period\n\n- `shipping_address?: string`\n  The shipping/delivery address\n\n- `shipping_address_recipient?: string`\n  The recipient name at the shipping address\n\n- `state?: 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED'`\n  The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED\n\n- `subtotal?: number | string`\n  The taxable base of the invoice. Should be the sum of all line items - allowances (for example commercial discounts) + charges with impact on VAT. Must be positive and rounded to maximum 2 decimals\n\n- `tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B'`\n  Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E for exempt)\n\n- `tax_details?: { amount?: number | string; rate?: string; }[]`\n\n- `total_discount?: number | string`\n  The net financial discount/charge of the invoice (non-VAT charges minus non-VAT allowances). Can be positive (net charge), negative (net discount), or zero. Must be rounded to maximum 2 decimals\n\n- `total_tax?: number | string`\n  The total tax amount of the invoice. Must be positive and rounded to maximum 2 decimals\n\n- `vatex?: string`\n  VATEX code list for VAT exemption reasons\n\nAgency: CEF\nIdentifier: vatex\n\n- `vatex_note?: string`\n  Textual explanation for VAT exemption\n\n- `vendor_address?: string`\n  The address of the vendor/seller\n\n- `vendor_address_recipient?: string`\n  The recipient name at the vendor address\n\n- `vendor_company_id?: string`\n  Vendor company ID. For Belgium this is the CBE number or their EUID (European Unique Identifier) number. In the Netherlands this is the KVK number.\n\n- `vendor_email?: string`\n  The email address of the vendor\n\n- `vendor_name?: string`\n  The name of the vendor/seller/supplier\n\n- `vendor_tax_id?: string`\n  Vendor tax ID. For Belgium this is the VAT number. Must include the country prefix\n\n### Returns\n\n- `{ id: string; file_name: string; is_valid: boolean; issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]; ubl_document?: string; }`\n\n  - `id: string`\n  - `file_name: string`\n  - `is_valid: boolean`\n  - `issues: { message: string; schematron: string; type: 'error' | 'warning'; flag?: string; location?: string; rule_id?: string; test?: string; }[]`\n  - `ubl_document?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst ublDocumentValidation = await client.validate.validateJson();\n\nconsole.log(ublDocumentValidation);\n```",
    perLanguage: {
      typescript: {
        method: 'client.validate.validateJson',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst ublDocumentValidation = await client.validate.validateJson();\n\nconsole.log(ublDocumentValidation.id);",
      },
      python: {
        method: 'validate.validate_json',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nubl_document_validation = client.validate.validate_json()\nprint(ubl_document_validation.id)',
      },
      java: {
        method: 'validate().validateJson',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.validate.UblDocumentValidation;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        DocumentCreate params = DocumentCreate.builder().build();\n        UblDocumentValidation ublDocumentValidation = client.validate().validateJson(params);\n    }\n}',
      },
      ruby: {
        method: 'validate.validate_json',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nubl_document_validation = e_invoice.validate.validate_json\n\nputs(ubl_document_validation)',
      },
      php: {
        method: 'validate->validateJson',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$ublDocumentValidation = $client->validate->validateJson(\n  allowances: [\n    [\n      'amount' => 0,\n      'baseAmount' => 0,\n      'multiplierFactor' => 0,\n      'reason' => 'reason',\n      'reasonCode' => '41',\n      'taxCode' => 'AE',\n      'taxRate' => 0,\n    ],\n  ],\n  amountDue: 0,\n  attachments: [\n    [\n      'fileName' => 'file_name',\n      'fileData' => 'file_data',\n      'fileSize' => 0,\n      'fileType' => 'file_type',\n    ],\n  ],\n  billingAddress: 'billing_address',\n  billingAddressRecipient: 'billing_address_recipient',\n  charges: [\n    [\n      'amount' => 0,\n      'baseAmount' => 0,\n      'multiplierFactor' => 0,\n      'reason' => 'reason',\n      'reasonCode' => 'AA',\n      'taxCode' => 'AE',\n      'taxRate' => '21.00',\n    ],\n  ],\n  currency: CurrencyCode::EUR,\n  customerAddress: 'customer_address',\n  customerAddressRecipient: 'customer_address_recipient',\n  customerCompanyID: '1018265814',\n  customerEmail: 'customer_email',\n  customerID: 'customer_id',\n  customerName: 'customer_name',\n  customerPeppolID: '0208:0123456789',\n  customerTaxID: 'BE1018265814',\n  direction: DocumentDirection::INBOUND,\n  documentType: DocumentType::INVOICE,\n  dueDate: '2019-12-27',\n  invoiceDate: '2019-12-27',\n  invoiceID: 'invoice_id',\n  invoiceTotal: 0,\n  items: [\n    [\n      'allowances' => [\n        [\n          'amount' => 0,\n          'baseAmount' => 0,\n          'multiplierFactor' => 0,\n          'reason' => 'reason',\n          'reasonCode' => '41',\n          'taxCode' => 'AE',\n          'taxRate' => 0,\n        ],\n      ],\n      'amount' => 0,\n      'charges' => [\n        [\n          'amount' => 0,\n          'baseAmount' => 0,\n          'multiplierFactor' => 0,\n          'reason' => 'reason',\n          'reasonCode' => 'AA',\n          'taxCode' => 'AE',\n          'taxRate' => '21.00',\n        ],\n      ],\n      'date' => null,\n      'description' => 'description',\n      'productCode' => 'product_code',\n      'quantity' => 0,\n      'tax' => 0,\n      'taxRate' => '21.00',\n      'unit' => UnitOfMeasureCode::_10,\n      'unitPrice' => 0,\n    ],\n  ],\n  note: 'note',\n  paymentDetails: [\n    [\n      'bankAccountNumber' => 'bank_account_number',\n      'iban' => 'iban',\n      'paymentReference' => 'payment_reference',\n      'swift' => 'swift',\n    ],\n  ],\n  paymentTerm: 'payment_term',\n  previousUnpaidBalance: 0,\n  purchaseOrder: 'purchase_order',\n  remittanceAddress: 'remittance_address',\n  remittanceAddressRecipient: 'remittance_address_recipient',\n  serviceAddress: 'service_address',\n  serviceAddressRecipient: 'service_address_recipient',\n  serviceEndDate: '2019-12-27',\n  serviceStartDate: '2019-12-27',\n  shippingAddress: 'shipping_address',\n  shippingAddressRecipient: 'shipping_address_recipient',\n  state: DocumentState::DRAFT,\n  subtotal: 0,\n  taxCode: 'AE',\n  taxDetails: [['amount' => 0, 'rate' => 'rate']],\n  totalDiscount: 0,\n  totalTax: 0,\n  vatex: 'VATEX-EU-79-C',\n  vatexNote: 'vatex_note',\n  vendorAddress: 'vendor_address',\n  vendorAddressRecipient: 'vendor_address_recipient',\n  vendorCompanyID: '1018265814',\n  vendorEmail: 'vendor_email',\n  vendorName: 'vendor_name',\n  vendorTaxID: 'BE1018265814',\n);\n\nvar_dump($ublDocumentValidation);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/validate/json \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY" \\\n    -d \'{\n          "customer_company_id": "1018265814",\n          "customer_peppol_id": "0208:0123456789",\n          "customer_tax_id": "BE1018265814",\n          "vendor_company_id": "1018265814",\n          "vendor_tax_id": "BE1018265814"\n        }\'',
      },
    },
  },
  {
    name: 'validate_peppol_id',
    endpoint: '/api/validate/peppol-id',
    httpMethod: 'get',
    summary: 'Validate Peppol ID',
    description:
      'Validate if a Peppol ID exists in the Peppol network and retrieve supported document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).',
    stainlessPath: '(resource) validate > (method) validate_peppol_id',
    qualified: 'client.validate.validatePeppolID',
    params: ['peppol_id: string;'],
    response:
      '{ business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; business_card?: { country_code?: string; name?: string; registration_date?: string; }; supported_document_types?: string[]; }',
    markdown:
      "## validate_peppol_id\n\n`client.validate.validatePeppolID(peppol_id: string): { business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; business_card?: object; supported_document_types?: string[]; }`\n\n**get** `/api/validate/peppol-id`\n\nValidate if a Peppol ID exists in the Peppol network and retrieve supported document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).\n\n### Parameters\n\n- `peppol_id: string`\n  Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a Belgian company.\n\n### Returns\n\n- `{ business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; business_card?: { country_code?: string; name?: string; registration_date?: string; }; supported_document_types?: string[]; }`\n  Response for a Peppol ID validation request.\n\nThis model represents the validation result of a Peppol ID in the Peppol network,\nincluding whether the ID is valid and what document types it supports.\n\n  - `business_card_valid: boolean`\n  - `dns_valid: boolean`\n  - `is_valid: boolean`\n  - `business_card?: { country_code?: string; name?: string; registration_date?: string; }`\n  - `supported_document_types?: string[]`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst response = await client.validate.validatePeppolID({ peppol_id: 'peppol_id' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.validate.validatePeppolID',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.validate.validatePeppolID({ peppol_id: 'peppol_id' });\n\nconsole.log(response.business_card_valid);",
      },
      python: {
        method: 'validate.validate_peppol_id',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.validate.validate_peppol_id(\n    peppol_id="peppol_id",\n)\nprint(response.business_card_valid)',
      },
      java: {
        method: 'validate().validatePeppolId',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.validate.ValidateValidatePeppolIdParams;\nimport com.e_invoice.api.models.validate.ValidateValidatePeppolIdResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        ValidateValidatePeppolIdParams params = ValidateValidatePeppolIdParams.builder()\n            .peppolId("peppol_id")\n            .build();\n        ValidateValidatePeppolIdResponse response = client.validate().validatePeppolId(params);\n    }\n}',
      },
      ruby: {
        method: 'validate.validate_peppol_id',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nresponse = e_invoice.validate.validate_peppol_id(peppol_id: "peppol_id")\n\nputs(response)',
      },
      php: {
        method: 'validate->validatePeppolID',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->validate->validatePeppolID(peppolID: 'peppol_id');\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/validate/peppol-id \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/lookup',
    httpMethod: 'get',
    summary: 'Lookup Peppol ID',
    description:
      'Lookup Peppol ID. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).',
    stainlessPath: '(resource) lookup > (method) retrieve',
    qualified: 'client.lookup.retrieve',
    params: ['peppol_id: string;'],
    response:
      '{ businessCard: { entities: { additionalInformation?: string[]; countryCode?: string; name?: string; registrationDate?: string; }[]; queryTimeMs: number; status: string; error?: string; }; certificates: { status: string; details?: object; error?: string; }[]; dnsInfo: { dnsRecords: { ip: string; }[]; smlHostname: string; status: string; error?: string; lookupMethod?: string; smpHostname?: string; }; errors: string[]; executionTimeMs: number; queryMetadata: { identifierScheme: string; identifierValue: string; smlDomain: string; timestamp: string; version: string; }; serviceMetadata: { endpoints: { documentTypes: object[]; status: string; url: string; error?: string; processes?: object[]; }[]; queryTimeMs: number; status: string; error?: string; }; status: string; }',
    markdown:
      "## retrieve\n\n`client.lookup.retrieve(peppol_id: string): { businessCard: object; certificates: certificate[]; dnsInfo: object; errors: string[]; executionTimeMs: number; queryMetadata: object; serviceMetadata: object; status: string; }`\n\n**get** `/api/lookup`\n\nLookup Peppol ID. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).\n\n### Parameters\n\n- `peppol_id: string`\n  Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a Belgian company.\n\n### Returns\n\n- `{ businessCard: { entities: { additionalInformation?: string[]; countryCode?: string; name?: string; registrationDate?: string; }[]; queryTimeMs: number; status: string; error?: string; }; certificates: { status: string; details?: object; error?: string; }[]; dnsInfo: { dnsRecords: { ip: string; }[]; smlHostname: string; status: string; error?: string; lookupMethod?: string; smpHostname?: string; }; errors: string[]; executionTimeMs: number; queryMetadata: { identifierScheme: string; identifierValue: string; smlDomain: string; timestamp: string; version: string; }; serviceMetadata: { endpoints: { documentTypes: object[]; status: string; url: string; error?: string; processes?: object[]; }[]; queryTimeMs: number; status: string; error?: string; }; status: string; }`\n  Response from a Peppol ID lookup operation.\n\nThis model represents the complete result of validating and looking up a Peppol ID\nin the Peppol network, including DNS information, service metadata, business card\ndetails, and certificate information.\n\nExample:\n    A successful lookup for a Peppol ID \"0192:991825827\" would return DNS information,\n    service metadata with supported document types and processes, business card information\n    with organization details, and certificate data.\n\n  - `businessCard: { entities: { additionalInformation?: string[]; countryCode?: string; name?: string; registrationDate?: string; }[]; queryTimeMs: number; status: string; error?: string; }`\n  - `certificates: { status: string; details?: object; error?: string; }[]`\n  - `dnsInfo: { dnsRecords: { ip: string; }[]; smlHostname: string; status: string; error?: string; lookupMethod?: string; smpHostname?: string; }`\n  - `errors: string[]`\n  - `executionTimeMs: number`\n  - `queryMetadata: { identifierScheme: string; identifierValue: string; smlDomain: string; timestamp: string; version: string; }`\n  - `serviceMetadata: { endpoints: { documentTypes: { scheme: string; value: string; }[]; status: string; url: string; error?: string; processes?: { endpoints: { address: string; transportProfile: string; certificate?: certificate; serviceActivationDate?: string; serviceDescription?: string; serviceExpirationDate?: string; technicalContactUrl?: string; technicalInformationUrl?: string; }[]; processId: { scheme: string; value: string; }; }[]; }[]; queryTimeMs: number; status: string; error?: string; }`\n  - `status: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst lookup = await client.lookup.retrieve({ peppol_id: 'peppol_id' });\n\nconsole.log(lookup);\n```",
    perLanguage: {
      typescript: {
        method: 'client.lookup.retrieve',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst lookup = await client.lookup.retrieve({ peppol_id: 'peppol_id' });\n\nconsole.log(lookup.businessCard);",
      },
      python: {
        method: 'lookup.retrieve',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nlookup = client.lookup.retrieve(\n    peppol_id="peppol_id",\n)\nprint(lookup.business_card)',
      },
      java: {
        method: 'lookup().retrieve',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.lookup.LookupRetrieveParams;\nimport com.e_invoice.api.models.lookup.LookupRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        LookupRetrieveParams params = LookupRetrieveParams.builder()\n            .peppolId("peppol_id")\n            .build();\n        LookupRetrieveResponse lookup = client.lookup().retrieve(params);\n    }\n}',
      },
      ruby: {
        method: 'lookup.retrieve',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nlookup = e_invoice.lookup.retrieve(peppol_id: "peppol_id")\n\nputs(lookup)',
      },
      php: {
        method: 'lookup->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$lookup = $client->lookup->retrieve(peppolID: 'peppol_id');\n\nvar_dump($lookup);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/lookup \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_participants',
    endpoint: '/api/lookup/participants',
    httpMethod: 'get',
    summary: 'Lookup Peppol participants',
    description:
      'Lookup Peppol participants by name or other identifiers. You can limit the search to a specific country by providing the country code.',
    stainlessPath: '(resource) lookup > (method) retrieve_participants',
    qualified: 'client.lookup.retrieveParticipants',
    params: ['query: string;', 'country_code?: string;'],
    response:
      '{ query_terms: string; search_date: string; total_count: number; used_count: number; participants?: { peppol_id: string; peppol_scheme: string; document_types?: { scheme: string; value: string; }[]; entities?: { additional_info?: string; country_code?: string; geo_info?: string; identifiers?: object[]; name?: string; registration_date?: string; website?: string; }[]; }[]; }',
    markdown:
      "## retrieve_participants\n\n`client.lookup.retrieveParticipants(query: string, country_code?: string): { query_terms: string; search_date: string; total_count: number; used_count: number; participants?: object[]; }`\n\n**get** `/api/lookup/participants`\n\nLookup Peppol participants by name or other identifiers. You can limit the search to a specific country by providing the country code.\n\n### Parameters\n\n- `query: string`\n  Query to lookup\n\n- `country_code?: string`\n  Country code of the company to lookup. If not provided, the search will be global.\n\n### Returns\n\n- `{ query_terms: string; search_date: string; total_count: number; used_count: number; participants?: { peppol_id: string; peppol_scheme: string; document_types?: { scheme: string; value: string; }[]; entities?: { additional_info?: string; country_code?: string; geo_info?: string; identifiers?: object[]; name?: string; registration_date?: string; website?: string; }[]; }[]; }`\n  Represents the result of a Peppol directory search\n\n  - `query_terms: string`\n  - `search_date: string`\n  - `total_count: number`\n  - `used_count: number`\n  - `participants?: { peppol_id: string; peppol_scheme: string; document_types?: { scheme: string; value: string; }[]; entities?: { additional_info?: string; country_code?: string; geo_info?: string; identifiers?: { scheme: string; value: string; }[]; name?: string; registration_date?: string; website?: string; }[]; }[]`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst response = await client.lookup.retrieveParticipants({ query: 'query' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.lookup.retrieveParticipants',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.lookup.retrieveParticipants({ query: 'query' });\n\nconsole.log(response.query_terms);",
      },
      python: {
        method: 'lookup.retrieve_participants',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.lookup.retrieve_participants(\n    query="query",\n)\nprint(response.query_terms)',
      },
      java: {
        method: 'lookup().retrieveParticipants',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.lookup.LookupRetrieveParticipantsParams;\nimport com.e_invoice.api.models.lookup.LookupRetrieveParticipantsResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        LookupRetrieveParticipantsParams params = LookupRetrieveParticipantsParams.builder()\n            .query("query")\n            .build();\n        LookupRetrieveParticipantsResponse response = client.lookup().retrieveParticipants(params);\n    }\n}',
      },
      ruby: {
        method: 'lookup.retrieve_participants',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nresponse = e_invoice.lookup.retrieve_participants(query: "query")\n\nputs(response)',
      },
      php: {
        method: 'lookup->retrieveParticipants',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->lookup->retrieveParticipants(\n  query: 'query', countryCode: 'country_code'\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/lookup/participants \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/me/',
    httpMethod: 'get',
    summary: 'Get information about your account',
    description: 'Retrieve information about your account.',
    stainlessPath: '(resource) me > (method) retrieve',
    qualified: 'client.me.retrieve',
    response:
      "{ name: string; bcc_recipient_email?: string; company_address?: string; company_city?: string; company_country?: string; company_email?: string; company_name?: string; company_number?: string; company_tax_id?: string; company_zip?: string; credit_balance?: number; description?: string; ibans?: string[]; peppol_ids?: string[]; plan?: 'starter' | 'pro' | 'enterprise'; smp_registration?: boolean; smp_registration_date?: string; }",
    markdown:
      "## retrieve\n\n`client.me.retrieve(): { name: string; bcc_recipient_email?: string; company_address?: string; company_city?: string; company_country?: string; company_email?: string; company_name?: string; company_number?: string; company_tax_id?: string; company_zip?: string; credit_balance?: number; description?: string; ibans?: string[]; peppol_ids?: string[]; plan?: 'starter' | 'pro' | 'enterprise'; smp_registration?: boolean; smp_registration_date?: string; }`\n\n**get** `/api/me/`\n\nRetrieve information about your account.\n\n### Returns\n\n- `{ name: string; bcc_recipient_email?: string; company_address?: string; company_city?: string; company_country?: string; company_email?: string; company_name?: string; company_number?: string; company_tax_id?: string; company_zip?: string; credit_balance?: number; description?: string; ibans?: string[]; peppol_ids?: string[]; plan?: 'starter' | 'pro' | 'enterprise'; smp_registration?: boolean; smp_registration_date?: string; }`\n\n  - `name: string`\n  - `bcc_recipient_email?: string`\n  - `company_address?: string`\n  - `company_city?: string`\n  - `company_country?: string`\n  - `company_email?: string`\n  - `company_name?: string`\n  - `company_number?: string`\n  - `company_tax_id?: string`\n  - `company_zip?: string`\n  - `credit_balance?: number`\n  - `description?: string`\n  - `ibans?: string[]`\n  - `peppol_ids?: string[]`\n  - `plan?: 'starter' | 'pro' | 'enterprise'`\n  - `smp_registration?: boolean`\n  - `smp_registration_date?: string`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst me = await client.me.retrieve();\n\nconsole.log(me);\n```",
    perLanguage: {
      typescript: {
        method: 'client.me.retrieve',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst me = await client.me.retrieve();\n\nconsole.log(me.company_tax_id);",
      },
      python: {
        method: 'me.retrieve',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nme = client.me.retrieve()\nprint(me.company_tax_id)',
      },
      java: {
        method: 'me().retrieve',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.me.MeRetrieveParams;\nimport com.e_invoice.api.models.me.MeRetrieveResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        MeRetrieveResponse me = client.me().retrieve();\n    }\n}',
      },
      ruby: {
        method: 'me.retrieve',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nme = e_invoice.me.retrieve\n\nputs(me)',
      },
      php: {
        method: 'me->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$me = $client->me->retrieve();\n\nvar_dump($me);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/me/ \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/api/webhooks/',
    httpMethod: 'get',
    summary: 'Get All Webhooks',
    description: 'Get all webhooks for the current tenant',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    response: '{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }[]',
    markdown:
      "## list\n\n`client.webhooks.list(): object[]`\n\n**get** `/api/webhooks/`\n\nGet all webhooks for the current tenant\n\n### Returns\n\n- `{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }[]`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst webhookResponses = await client.webhooks.list();\n\nconsole.log(webhookResponses);\n```",
    perLanguage: {
      typescript: {
        method: 'client.webhooks.list',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookResponses = await client.webhooks.list();\n\nconsole.log(webhookResponses);",
      },
      python: {
        method: 'webhooks.list',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_responses = client.webhooks.list()\nprint(webhook_responses)',
      },
      java: {
        method: 'webhooks().list',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.webhooks.WebhookListParams;\nimport com.e_invoice.api.models.webhooks.WebhookResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        List<WebhookResponse> webhookResponses = client.webhooks().list();\n    }\n}',
      },
      ruby: {
        method: 'webhooks.list',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nwebhook_responses = e_invoice.webhooks.list\n\nputs(webhook_responses)',
      },
      php: {
        method: 'webhooks->list',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookResponses = $client->webhooks->list();\n\nvar_dump($webhookResponses);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/webhooks/ \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/api/webhooks/',
    httpMethod: 'post',
    summary: 'Create Webhook',
    description: 'Create a new webhook',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: ['events: string[];', 'url: string;', 'enabled?: boolean;'],
    response: '{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }',
    markdown:
      "## create\n\n`client.webhooks.create(events: string[], url: string, enabled?: boolean): { id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n\n**post** `/api/webhooks/`\n\nCreate a new webhook\n\n### Parameters\n\n- `events: string[]`\n\n- `url: string`\n\n- `enabled?: boolean`\n\n### Returns\n\n- `{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n  Response model for webhook API endpoints.\n\n  - `id: string`\n  - `events: string[]`\n  - `secret: string`\n  - `url: string`\n  - `enabled?: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst webhookResponse = await client.webhooks.create({ events: ['string'], url: 'https://example.com' });\n\nconsole.log(webhookResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.webhooks.create',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookResponse = await client.webhooks.create({\n  events: ['string'],\n  url: 'https://example.com',\n});\n\nconsole.log(webhookResponse.id);",
      },
      python: {
        method: 'webhooks.create',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_response = client.webhooks.create(\n    events=["string"],\n    url="https://example.com",\n)\nprint(webhook_response.id)',
      },
      java: {
        method: 'webhooks().create',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.webhooks.WebhookCreateParams;\nimport com.e_invoice.api.models.webhooks.WebhookResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        WebhookCreateParams params = WebhookCreateParams.builder()\n            .addEvent("string")\n            .url("https://example.com")\n            .build();\n        WebhookResponse webhookResponse = client.webhooks().create(params);\n    }\n}',
      },
      ruby: {
        method: 'webhooks.create',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nwebhook_response = e_invoice.webhooks.create(events: ["string"], url: "https://example.com")\n\nputs(webhook_response)',
      },
      php: {
        method: 'webhooks->create',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookResponse = $client->webhooks->create(\n  events: ['string'], url: 'https://example.com', enabled: true\n);\n\nvar_dump($webhookResponse);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/webhooks/ \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY" \\\n    -d \'{\n          "events": [\n            "string"\n          ],\n          "url": "https://example.com"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/api/webhooks/{webhook_id}',
    httpMethod: 'get',
    summary: 'Get Webhook',
    description: 'Get a webhook by ID',
    stainlessPath: '(resource) webhooks > (method) retrieve',
    qualified: 'client.webhooks.retrieve',
    params: ['webhook_id: string;'],
    response: '{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }',
    markdown:
      "## retrieve\n\n`client.webhooks.retrieve(webhook_id: string): { id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n\n**get** `/api/webhooks/{webhook_id}`\n\nGet a webhook by ID\n\n### Parameters\n\n- `webhook_id: string`\n\n### Returns\n\n- `{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n  Response model for webhook API endpoints.\n\n  - `id: string`\n  - `events: string[]`\n  - `secret: string`\n  - `url: string`\n  - `enabled?: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst webhookResponse = await client.webhooks.retrieve('webhook_id');\n\nconsole.log(webhookResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.webhooks.retrieve',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookResponse = await client.webhooks.retrieve('webhook_id');\n\nconsole.log(webhookResponse.id);",
      },
      python: {
        method: 'webhooks.retrieve',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_response = client.webhooks.retrieve(\n    "webhook_id",\n)\nprint(webhook_response.id)',
      },
      java: {
        method: 'webhooks().retrieve',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.webhooks.WebhookResponse;\nimport com.e_invoice.api.models.webhooks.WebhookRetrieveParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        WebhookResponse webhookResponse = client.webhooks().retrieve("webhook_id");\n    }\n}',
      },
      ruby: {
        method: 'webhooks.retrieve',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nwebhook_response = e_invoice.webhooks.retrieve("webhook_id")\n\nputs(webhook_response)',
      },
      php: {
        method: 'webhooks->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookResponse = $client->webhooks->retrieve('webhook_id');\n\nvar_dump($webhookResponse);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/webhooks/$WEBHOOK_ID \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/api/webhooks/{webhook_id}',
    httpMethod: 'put',
    summary: 'Update Webhook',
    description: 'Update a webhook by ID',
    stainlessPath: '(resource) webhooks > (method) update',
    qualified: 'client.webhooks.update',
    params: ['webhook_id: string;', 'enabled?: boolean;', 'events?: string[];', 'url?: string;'],
    response: '{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }',
    markdown:
      "## update\n\n`client.webhooks.update(webhook_id: string, enabled?: boolean, events?: string[], url?: string): { id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n\n**put** `/api/webhooks/{webhook_id}`\n\nUpdate a webhook by ID\n\n### Parameters\n\n- `webhook_id: string`\n\n- `enabled?: boolean`\n\n- `events?: string[]`\n\n- `url?: string`\n\n### Returns\n\n- `{ id: string; events: string[]; secret: string; url: string; enabled?: boolean; }`\n  Response model for webhook API endpoints.\n\n  - `id: string`\n  - `events: string[]`\n  - `secret: string`\n  - `url: string`\n  - `enabled?: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst webhookResponse = await client.webhooks.update('webhook_id');\n\nconsole.log(webhookResponse);\n```",
    perLanguage: {
      typescript: {
        method: 'client.webhooks.update',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhookResponse = await client.webhooks.update('webhook_id');\n\nconsole.log(webhookResponse.id);",
      },
      python: {
        method: 'webhooks.update',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nwebhook_response = client.webhooks.update(\n    webhook_id="webhook_id",\n)\nprint(webhook_response.id)',
      },
      java: {
        method: 'webhooks().update',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.webhooks.WebhookResponse;\nimport com.e_invoice.api.models.webhooks.WebhookUpdateParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        WebhookResponse webhookResponse = client.webhooks().update("webhook_id");\n    }\n}',
      },
      ruby: {
        method: 'webhooks.update',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nwebhook_response = e_invoice.webhooks.update("webhook_id")\n\nputs(webhook_response)',
      },
      php: {
        method: 'webhooks->update',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhookResponse = $client->webhooks->update(\n  'webhook_id', enabled: true, events: ['string'], url: 'https://example.com'\n);\n\nvar_dump($webhookResponse);",
      },
      http: {
        example:
          "curl https://api.e-invoice.be/api/webhooks/$WEBHOOK_ID \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $E_INVOICE_API_KEY\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/api/webhooks/{webhook_id}',
    httpMethod: 'delete',
    summary: 'Delete Webhook',
    description: 'Delete a webhook',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['webhook_id: string;'],
    response: '{ is_deleted: boolean; }',
    markdown:
      "## delete\n\n`client.webhooks.delete(webhook_id: string): { is_deleted: boolean; }`\n\n**delete** `/api/webhooks/{webhook_id}`\n\nDelete a webhook\n\n### Parameters\n\n- `webhook_id: string`\n\n### Returns\n\n- `{ is_deleted: boolean; }`\n  Model for webhook deletion.\n\n  - `is_deleted: boolean`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst webhook = await client.webhooks.delete('webhook_id');\n\nconsole.log(webhook);\n```",
    perLanguage: {
      typescript: {
        method: 'client.webhooks.delete',
        example:
          "import EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.delete('webhook_id');\n\nconsole.log(webhook.is_deleted);",
      },
      python: {
        method: 'webhooks.delete',
        example:
          'import os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\nwebhook = client.webhooks.delete(\n    "webhook_id",\n)\nprint(webhook.is_deleted)',
      },
      java: {
        method: 'webhooks().delete',
        example:
          'package com.e_invoice.api.example;\n\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.webhooks.WebhookDeleteParams;\nimport com.e_invoice.api.models.webhooks.WebhookDeleteResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        EInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\n        WebhookDeleteResponse webhook = client.webhooks().delete("webhook_id");\n    }\n}',
      },
      ruby: {
        method: 'webhooks.delete',
        example:
          'require "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(api_key: "My API Key")\n\nwebhook = e_invoice.webhooks.delete("webhook_id")\n\nputs(webhook)',
      },
      php: {
        method: 'webhooks->delete',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$webhook = $client->webhooks->delete('webhook_id');\n\nvar_dump($webhook);",
      },
      http: {
        example:
          'curl https://api.e-invoice.be/api/webhooks/$WEBHOOK_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $E_INVOICE_API_KEY"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'java',
    content:
      '# e-invoice.be Peppol API Library\n\n<!-- x-release-please-start-version -->\n[![Maven Central](https://img.shields.io/maven-central/v/com.e_invoice.api/e-invoice-java)](https://central.sonatype.com/artifact/com.e_invoice.api/e-invoice-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.e_invoice.api/e-invoice-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.e_invoice.api/e-invoice-java/0.0.1)\n<!-- x-release-please-end -->\n\nThe e-invoice.be Peppol SDK provides convenient access to the [E Invoice REST API](https://api.e-invoice.be)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the E Invoice MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=e-invoice-api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImUtaW52b2ljZS1hcGktbWNwIl0sImVudiI6eyJFX0lOVk9JQ0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22e-invoice-api-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22e-invoice-api-mcp%22%5D%2C%22env%22%3A%7B%22E_INVOICE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n<!-- x-release-please-start-version -->\n\nThe REST API documentation can be found on [api.e-invoice.be](https://api.e-invoice.be). Javadocs are available on [javadoc.io](https://javadoc.io/doc/com.e_invoice.api/e-invoice-java/0.0.1).\n\n<!-- x-release-please-end -->\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n### Gradle\n\n~~~kotlin\nimplementation("com.e_invoice.api:e-invoice-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.e_invoice.api</groupId>\n  <artifactId>e-invoice-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\n// Configures using the `einvoice.apiKey` and `einvoice.baseUrl` system properties\n// Or configures using the `E_INVOICE_API_KEY` and `E_INVOICE_BASE_URL` environment variables\nEInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\nDocumentCreate params = DocumentCreate.builder().build();\nDocumentResponse documentResponse = client.documents().create(params);\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\n// Configures using the `einvoice.apiKey` and `einvoice.baseUrl` system properties\n// Or configures using the `E_INVOICE_API_KEY` and `E_INVOICE_BASE_URL` environment variables\nEInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    // Configures using the `einvoice.apiKey` and `einvoice.baseUrl` system properties\n    // Or configures using the `E_INVOICE_API_KEY` and `E_INVOICE_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property    | Environment variable | Required | Default value                |\n| --------- | ------------------ | -------------------- | -------- | ---------------------------- |\n| `apiKey`  | `einvoice.apiKey`  | `E_INVOICE_API_KEY`  | true     | -                            |\n| `baseUrl` | `einvoice.baseUrl` | `E_INVOICE_BASE_URL` | true     | `"https://api.e-invoice.be"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\n\nEInvoiceClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the E Invoice API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.documents().create(...)` should be called with an instance of `DocumentCreateParams`, and it     will return an instance of `DocumentResponse`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `einvoice.apiKey` and `einvoice.baseUrl` system properties\n// Or configures using the `E_INVOICE_API_KEY` and `E_INVOICE_BASE_URL` environment variables\nEInvoiceClient client = EInvoiceOkHttpClient.fromEnv();\n\nDocumentCreate params = DocumentCreate.builder().build();\nCompletableFuture<DocumentResponse> documentResponse = client.async().documents().create(params);\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClientAsync;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClientAsync;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `einvoice.apiKey` and `einvoice.baseUrl` system properties\n// Or configures using the `E_INVOICE_API_KEY` and `E_INVOICE_BASE_URL` environment variables\nEInvoiceClientAsync client = EInvoiceOkHttpClientAsync.fromEnv();\n\nDocumentCreate params = DocumentCreate.builder().build();\nCompletableFuture<DocumentResponse> documentResponse = client.documents().create(params);\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n## File uploads\n\nThe SDK defines methods that accept files.\n\nTo upload a file, pass a [`Path`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html):\n\n```java\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfParams;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfResponse;\nimport java.nio.file.Paths;\n\nDocumentCreateFromPdfParams params = DocumentCreateFromPdfParams.builder()\n    .file(Paths.get("/path/to/file"))\n    .build();\nDocumentCreateFromPdfResponse response = client.documents().createFromPdf(params);\n```\n\nOr an arbitrary [`InputStream`](https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html):\n\n```java\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfParams;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfResponse;\nimport java.net.URL;\n\nDocumentCreateFromPdfParams params = DocumentCreateFromPdfParams.builder()\n    .file(new URL("https://example.com//path/to/file").openStream())\n    .build();\nDocumentCreateFromPdfResponse response = client.documents().createFromPdf(params);\n```\n\nOr a `byte[]` array:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfParams;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfResponse;\n\nDocumentCreateFromPdfParams params = DocumentCreateFromPdfParams.builder()\n    .file("content".getBytes())\n    .build();\nDocumentCreateFromPdfResponse response = client.documents().createFromPdf(params);\n```\n\nNote that when passing a non-`Path` its filename is unknown so it will not be included in the request.     To manually set a filename, pass a [`MultipartField`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/Values.kt):\n\n```java\nimport com.e_invoice.api.core.MultipartField;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfParams;\nimport com.e_invoice.api.models.documents.DocumentCreateFromPdfResponse;\nimport java.io.InputStream;\nimport java.net.URL;\n\nDocumentCreateFromPdfParams params = DocumentCreateFromPdfParams.builder()\n    .file(MultipartField.<InputStream>builder()\n        .value(new URL("https://example.com//path/to/file").openStream())\n        .filename("/path/to/file")\n        .build())\n    .build();\nDocumentCreateFromPdfResponse response = client.documents().createFromPdf(params);\n```\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.e_invoice.api.core.http.Headers;\nimport com.e_invoice.api.core.http.HttpResponseFor;\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\nDocumentCreate params = DocumentCreate.builder().build();\nHttpResponseFor<DocumentResponse> documentResponse = client.documents().withRawResponse().create(params);\n\nint statusCode = documentResponse.statusCode();\nHeaders headers = documentResponse.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\nDocumentResponse parsedDocumentResponse = documentResponse.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`EInvoiceServiceException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`EInvoiceIoException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceIoException.kt): I/O networking errors.\n\n- [`EInvoiceRetryableException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`EInvoiceInvalidDataException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`EInvoiceException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n## Pagination\n\nThe SDK defines methods that return a paginated lists of results. It provides convenient ways to access     the results either one page at a time or item-by-item across all pages.\n\n### Auto-pagination\n\nTo iterate through all results across all pages, use the `autoPager()` method, which automatically     fetches more pages as needed.\n\nWhen using the synchronous client, the method returns an [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.inbox.InboxListPage;\n\nInboxListPage page = client.inbox().list();\n\n// Process as an Iterable\nfor (DocumentResponse inbox : page.autoPager()) {\n    System.out.println(inbox);\n}\n\n// Process as a Stream\npage.autoPager()\n    .stream()\n    .limit(50)\n    .forEach(inbox -> System.out.println(inbox));\n```\n\nWhen using the asynchronous client, the method returns an [`AsyncStreamResponse`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/http/AsyncStreamResponse.kt):\n\n```java\nimport com.e_invoice.api.core.http.AsyncStreamResponse;\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.inbox.InboxListPageAsync;\nimport java.util.Optional;\nimport java.util.concurrent.CompletableFuture;\n\nCompletableFuture<InboxListPageAsync> pageFuture = client.async().inbox().list();\n\npageFuture.thenRun(page -> page.autoPager().subscribe(inbox -> {\n    System.out.println(inbox);\n}));\n\n// If you need to handle errors or completion of the stream\npageFuture.thenRun(page -> page.autoPager().subscribe(new AsyncStreamResponse.Handler<>() {\n    @Override\n    public void onNext(DocumentResponse inbox) {\n        System.out.println(inbox);\n    }\n\n    @Override\n    public void onComplete(Optional<Throwable> error) {\n        if (error.isPresent()) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error.get());\n        } else {\n            System.out.println("No more!");\n        }\n    }\n}));\n\n// Or use futures\npageFuture.thenRun(page -> page.autoPager()\n    .subscribe(inbox -> {\n        System.out.println(inbox);\n    })\n    .onCompleteFuture()\n    .whenComplete((unused, error) -> {\n        if (error != null) {\n            System.out.println("Something went wrong!");\n            throw new RuntimeException(error);\n        } else {\n            System.out.println("No more!");\n        }\n    }));\n```\n\n### Manual pagination\n\nTo access individual page items and manually request the next page, use the `items()`,\n`hasNextPage()`, and `nextPage()` methods:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\nimport com.e_invoice.api.models.inbox.InboxListPage;\n\nInboxListPage page = client.inbox().list();\nwhile (true) {\n    for (DocumentResponse inbox : page.items()) {\n        System.out.println(inbox);\n    }\n\n    if (!page.hasNextPage()) {\n        break;\n    }\n\n    page = page.nextPage();\n}\n```\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `E_INVOICE_LOG` environment variable to   `info`:\n\n```sh\nexport E_INVOICE_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport E_INVOICE_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `e-invoice-java-core` is published with a     [configuration file](e-invoice-java-core/src/main/resources/META-INF/proguard/e-invoice-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`EInvoiceOkHttpClient`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClient.kt) or     [`EInvoiceOkHttpClientAsync`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\nDocumentResponse documentResponse = client.documents().create(\n  params, RequestOptions.builder().timeout(Duration.ofSeconds(30)).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport java.time.Duration;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\nIf the proxy responds with `407 Proxy Authentication Required`, supply credentials by also   configuring `proxyAuthenticator`:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport com.e_invoice.api.core.http.ProxyAuthenticator;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    .proxy(...)\n    // Or a custom implementation of `ProxyAuthenticator`.\n    .proxyAuthenticator(ProxyAuthenticator.basic("username", "password"))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\nimport java.time.Duration;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `e-invoice-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`EInvoiceClient`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClient.kt), [`EInvoiceClientAsync`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientAsync.kt),             [`EInvoiceClientImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientImpl.kt), and [`EInvoiceClientAsyncImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `e-invoice-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`EInvoiceOkHttpClient`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClient.kt) and [`EInvoiceOkHttpClientAsync`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClientAsync.kt), which             provide a way to construct [`EInvoiceClientImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientImpl.kt) and             [`EInvoiceClientAsyncImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientAsyncImpl.kt), respectively, using OkHttp\n- `e-invoice-java`\n  - Depends on and exposes the APIs of both `e-invoice-java-core` and `e-invoice-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`e-invoice-java` dependency](#installation) with `e-invoice-java-core`\n2. Copy `e-invoice-java-client-okhttp`\'s [`OkHttpClient`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`EInvoiceClientImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientImpl.kt) or [`EInvoiceClientAsyncImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientAsyncImpl.kt), similarly to        [`EInvoiceOkHttpClient`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClient.kt) or [`EInvoiceOkHttpClientAsync`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`e-invoice-java` dependency](#installation) with `e-invoice-java-core`\n2. Write a class that implements the [`HttpClient`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/http/HttpClient.kt) interface\n3. Construct [`EInvoiceClientImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientImpl.kt) or [`EInvoiceClientAsyncImpl`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/client/EInvoiceClientAsyncImpl.kt), similarly to        [`EInvoiceOkHttpClient`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClient.kt) or [`EInvoiceOkHttpClientAsync`](e-invoice-java-client-okhttp/src/main/kotlin/com/e_invoice/api/client/okhttp/EInvoiceOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.e_invoice.api.core.JsonValue;\nimport com.e_invoice.api.models.documents.DocumentCreateParams;\n\nDocumentCreateParams params = DocumentCreateParams.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/Values.kt) object to its setter:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentCreate;\nimport com.e_invoice.api.models.documents.DocumentCreateParams;\n\nDocumentCreateParams params = DocumentCreateParams.builder()\n    .documentCreate(DocumentCreate.builder().build())\n    .build();\n```\n\nThe most straightforward way to create a [`JsonValue`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.e_invoice.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/core/Values.kt):\n\n```java\nimport com.e_invoice.api.core.JsonMissing;\nimport com.e_invoice.api.models.documents.DocumentCreateParams;\nimport com.e_invoice.api.models.documents.DocumentRetrieveParams;\n\nDocumentCreateParams params = DocumentRetrieveParams.builder()\n    .documentId(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.e_invoice.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.documents().create(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.e_invoice.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.documents().create(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`EInvoiceInvalidDataException`](e-invoice-java-core/src/main/kotlin/com/e_invoice/api/errors/EInvoiceInvalidDataException.kt) only if you directly access the property.\n\nValidating the response is _not_ forwards compatible with new types from the API for existing fields.\n\nIf you would still prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\nDocumentResponse documentResponse = client.documents().create(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.e_invoice.api.models.documents.DocumentResponse;\n\nDocumentResponse documentResponse = client.documents().create(\n  params, RequestOptions.builder().responseValidation(true).build()\n);\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.e_invoice.api.client.EInvoiceClient;\nimport com.e_invoice.api.client.okhttp.EInvoiceOkHttpClient;\n\nEInvoiceClient client = EInvoiceOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/e-invoice-be/e-invoice-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'php',
    content:
      '# E Invoice PHP API Library\n\nThe E Invoice PHP library provides convenient access to the E Invoice REST API from any PHP 8.1.0+ application.\n\n## Installation\n\nTo use this package, install via Composer by adding the following to your application\'s `composer.json`:\n\n<!-- x-release-please-start-version -->\n```json\n{\n  "repositories": [\n    {\n      "type": "vcs",\n      "url": "git@github.com:e-invoice-be/e-invoice-php.git"\n    }\n  ],\n  "require": {\n    "e-invoice-be/e-invoice": "dev-main"\n  }\n}\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv(\'E_INVOICE_API_KEY\') ?: \'My API Key\');\n\n$documentResponse = $client->documents->create();\n\nvar_dump($documentResponse->id);\n```',
  },
  {
    language: 'python',
    content:
      '# e-invoice.be Peppol API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/e-invoice-api.svg?label=pypi%20(stable))](https://pypi.org/project/e-invoice-api/)\n\nThe e-invoice.be Peppol library provides convenient access to the E Invoice REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the E Invoice MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=e-invoice-api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImUtaW52b2ljZS1hcGktbWNwIl0sImVudiI6eyJFX0lOVk9JQ0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22e-invoice-api-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22e-invoice-api-mcp%22%5D%2C%22env%22%3A%7B%22E_INVOICE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [api.e-invoice.be](https://api.e-invoice.be). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install e-invoice-api\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\n\ndocument_response = client.documents.create()\nprint(document_response.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `E_INVOICE_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncEInvoice` instead of `EInvoice` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom e_invoice_api import AsyncEInvoice\n\nclient = AsyncEInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  document_response = await client.documents.create()\n  print(document_response.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install e-invoice-api[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom e_invoice_api import DefaultAioHttpClient\nfrom e_invoice_api import AsyncEInvoice\n\nasync def main() -> None:\n  async with AsyncEInvoice(\n    api_key=os.environ.get("E_INVOICE_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    document_response = await client.documents.create()\n    print(document_response.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the E Invoice API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice()\n\nall_inboxes = []\n# Automatically fetches more pages as needed.\nfor inbox in client.inbox.list():\n    # Do something with inbox here\n    all_inboxes.append(inbox)\nprint(all_inboxes)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom e_invoice_api import AsyncEInvoice\n\nclient = AsyncEInvoice()\n\nasync def main() -> None:\n    all_inboxes = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for inbox in client.inbox.list():\n        all_inboxes.append(inbox)\n    print(all_inboxes)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.inbox.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.items)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.inbox.list()\n\nprint(f"page number: {first_page.page}") # => "page number: 1"\nfor inbox in first_page.items:\n    print(inbox.id)\n\n# Remove `await` for non-async usage.\n```\n\n\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed as `bytes`, or a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance or a tuple of `(filename, contents, media type)`.\n\n```python\nfrom pathlib import Path\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice()\n\nclient.documents.create_from_pdf(\n    file=Path("/path/to/file"),\n)\n```\n\nThe async client uses the exact same interface. If you pass a [`PathLike`](https://docs.python.org/3/library/os.html#os.PathLike) instance, the file contents will be read asynchronously automatically.\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `e_invoice_api.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `e_invoice_api.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `e_invoice_api.APIError`.\n\n```python\nimport e_invoice_api\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice()\n\ntry:\n    client.documents.create()\nexcept e_invoice_api.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept e_invoice_api.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept e_invoice_api.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom e_invoice_api import EInvoice\n\n# Configure the default for all requests:\nclient = EInvoice(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).documents.create()\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom e_invoice_api import EInvoice\n\n# Configure the default for all requests:\nclient = EInvoice(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = EInvoice(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).documents.create()\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `E_INVOICE_LOG` to `info`.\n\n```shell\n$ export E_INVOICE_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom e_invoice_api import EInvoice\n\nclient = EInvoice()\nresponse = client.documents.with_raw_response.create()\nprint(response.headers.get(\'X-My-Header\'))\n\ndocument = response.parse()  # get the object that `documents.create()` would have returned\nprint(document.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/e-invoice-be/e-invoice-py/tree/main/src/e_invoice_api/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/e-invoice-be/e-invoice-py/tree/main/src/e_invoice_api/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.documents.with_streaming_response.create() as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom e_invoice_api import EInvoice, DefaultHttpxClient\n\nclient = EInvoice(\n    # Or use the `E_INVOICE_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom e_invoice_api import EInvoice\n\nwith EInvoice() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/e-invoice-be/e-invoice-py/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport e_invoice_api\nprint(e_invoice_api.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# e-invoice.be Peppol API library\n\nThe e-invoice.be Peppol library provides convenient access to the E Invoice REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/e-invoice-be/e-invoice-rb#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the E Invoice MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=e-invoice-api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImUtaW52b2ljZS1hcGktbWNwIl0sImVudiI6eyJFX0lOVk9JQ0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22e-invoice-api-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22e-invoice-api-mcp%22%5D%2C%22env%22%3A%7B%22E_INVOICE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/e-invoice-api).\n\nThe REST API documentation can be found on [api.e-invoice.be](https://api.e-invoice.be).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "e-invoice-api", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "e_invoice_api"\n\ne_invoice = EInvoiceAPI::Client.new(\n  api_key: ENV["E_INVOICE_API_KEY"] # This is the default and can be omitted\n)\n\ndocument_response = e_invoice.documents.create\n\nputs(document_response.id)\n```\n\n\n\n### Pagination\n\nList methods in the E Invoice API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```ruby\npage = e_invoice.inbox.list\n\n# Fetch single item from page.\ninbox = page.items[0]\nputs(inbox.id)\n\n# Automatically fetches more pages as needed.\npage.auto_paging_each do |inbox|\n  puts(inbox.id)\nend\n```\n\nAlternatively, you can use the `#next_page?` and `#next_page` methods for more granular control working with pages.\n\n```ruby\nif page.next_page?\n  new_page = page.next_page\n  puts(new_page.items[0].id)\nend\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads can be passed as raw contents, a [`Pathname`](https://rubyapi.org/3.2/o/pathname) instance, [`StringIO`](https://rubyapi.org/3.2/o/stringio), or more.\n\n```ruby\nrequire "pathname"\n\n# Use `Pathname` to send the filename and/or avoid paging a large file into memory:\nresponse = e_invoice.documents.create_from_pdf(file: Pathname("/path/to/file"))\n\n# Alternatively, pass file contents or a `StringIO` directly:\nresponse = e_invoice.documents.create_from_pdf(file: File.read("/path/to/file"))\n\n# Or, to control the filename and/or content type:\nfile =\n  EInvoiceAPI::FilePart.new(File.read("/path/to/file"), filename: "/path/to/file", content_type: "…")\nresponse = e_invoice.documents.create_from_pdf(file: file)\n\nputs(response.customer_company_id)\n```\n\nNote that you can also pass a raw `IO` descriptor, but this disables retries, as the library can\'t be sure if the descriptor is a file or pipe (which cannot be rewound).\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `EInvoiceAPI::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  document = e_invoice.documents.create\nrescue EInvoiceAPI::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue EInvoiceAPI::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue EInvoiceAPI::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ne_invoice = EInvoiceAPI::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ne_invoice.documents.create(request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ne_invoice = EInvoiceAPI::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ne_invoice.documents.create(request_options: {timeout: 5})\n```\n\nOn timeout, `EInvoiceAPI::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `EInvoiceAPI::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\ndocument_response =\n  e_invoice.documents.create(\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(document_response[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `EInvoiceAPI::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `EInvoiceAPI::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ne_invoice.documents.create \n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ne_invoice.documents.create\n\n# You can also splat a full Params class:\nparams = EInvoiceAPI::DocumentCreateParams.new\ne_invoice.documents.create(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :EUR\nputs(EInvoiceAPI::CurrencyCode::EUR)\n\n# Revealed type: `T.all(EInvoiceAPI::CurrencyCode, Symbol)`\nT.reveal_type(EInvoiceAPI::CurrencyCode::EUR)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ne_invoice.documents.create(\n  currency: EInvoiceAPI::CurrencyCode::EUR,\n  # …\n)\n\n# Literal values are also permissible:\ne_invoice.documents.create(\n  currency: :EUR,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/e-invoice-be/e-invoice-rb/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# e-invoice.be Peppol API Library\n\n[![NPM version](https://img.shields.io/npm/v/e-invoice-api.svg?label=npm%20(stable))](https://npmjs.org/package/e-invoice-api) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/e-invoice-api)\n\nThis library provides convenient access to the E Invoice REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [api.e-invoice.be](https://api.e-invoice.be). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the E Invoice MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=e-invoice-api-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImUtaW52b2ljZS1hcGktbWNwIl0sImVudiI6eyJFX0lOVk9JQ0VfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22e-invoice-api-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22e-invoice-api-mcp%22%5D%2C%22env%22%3A%7B%22E_INVOICE_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install e-invoice-api\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse = await client.documents.create();\n\nconsole.log(documentResponse.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  apiKey: process.env['E_INVOICE_API_KEY'], // This is the default and can be omitted\n});\n\nconst documentResponse: EInvoice.DocumentResponse = await client.documents.create();\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n## File uploads\n\nRequest parameters that correspond to file uploads can be passed in many different forms:\n- `File` (or an object with the same structure)\n- a `fetch` `Response` (or an object with the same structure)\n- an `fs.ReadStream`\n- the return value of our `toFile` helper\n\n```ts\nimport fs from 'fs';\nimport EInvoice, { toFile } from 'e-invoice-api';\n\nconst client = new EInvoice();\n\n// If you have access to Node `fs` we recommend using `fs.createReadStream()`:\nawait client.documents.createFromPdf({ file: fs.createReadStream('/path/to/file') });\n\n// Or if you have the web `File` API you can pass a `File` instance:\nawait client.documents.createFromPdf({ file: new File(['my bytes'], 'file') });\n\n// You can also pass a `fetch` `Response`:\nawait client.documents.createFromPdf({ file: await fetch('https://somesite/file') });\n\n// Finally, if none of the above are convenient, you can use our `toFile` helper:\nawait client.documents.createFromPdf({ file: await toFile(Buffer.from('my bytes'), 'file') });\nawait client.documents.createFromPdf({ file: await toFile(new Uint8Array([0, 1, 2]), 'file') });\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst documentResponse = await client.documents.create().catch(async (err) => {\n  if (err instanceof EInvoice.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new EInvoice({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.documents.create({\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new EInvoice({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.documents.create({\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the EInvoice API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllDocumentResponses(params) {\n  const allDocumentResponses = [];\n  // Automatically fetches more pages as needed.\n  for await (const documentResponse of client.inbox.list()) {\n    allDocumentResponses.push(documentResponse);\n  }\n  return allDocumentResponses;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.inbox.list();\nfor (const documentResponse of page.items) {\n  console.log(documentResponse);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new EInvoice();\n\nconst response = await client.documents.create().asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: documentResponse, response: raw } = await client.documents.create().withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(documentResponse.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `E_INVOICE_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport EInvoice from 'e-invoice-api';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new EInvoice({\n  logger: logger.child({ name: 'EInvoice' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.documents.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport EInvoice from 'e-invoice-api';\nimport fetch from 'my-fetch';\n\nconst client = new EInvoice({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport EInvoice from 'e-invoice-api';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new EInvoice({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport EInvoice from 'npm:e-invoice-api';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new EInvoice({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/e-invoice-be/e-invoice-ts/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
