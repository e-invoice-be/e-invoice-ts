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
      '{ business_card: { country_code?: string; name?: string; registration_date?: string; }; business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; supported_document_types?: string[]; }',
    markdown:
      "## validate_peppol_id\n\n`client.validate.validatePeppolID(peppol_id: string): { business_card: object; business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; supported_document_types?: string[]; }`\n\n**get** `/api/validate/peppol-id`\n\nValidate if a Peppol ID exists in the Peppol network and retrieve supported document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme is a 4-digit code representing the identifier scheme, and the id is the actual identifier value. For example, for a Belgian company it is `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of the official BTW / KBO number).\n\n### Parameters\n\n- `peppol_id: string`\n  Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a Belgian company.\n\n### Returns\n\n- `{ business_card: { country_code?: string; name?: string; registration_date?: string; }; business_card_valid: boolean; dns_valid: boolean; is_valid: boolean; supported_document_types?: string[]; }`\n  Response for a Peppol ID validation request.\n\nThis model represents the validation result of a Peppol ID in the Peppol network,\nincluding whether the ID is valid and what document types it supports.\n\n  - `business_card: { country_code?: string; name?: string; registration_date?: string; }`\n  - `business_card_valid: boolean`\n  - `dns_valid: boolean`\n  - `is_valid: boolean`\n  - `supported_document_types?: string[]`\n\n### Example\n\n```typescript\nimport EInvoice from 'e-invoice-api';\n\nconst client = new EInvoice();\n\nconst response = await client.validate.validatePeppolID({ peppol_id: 'peppol_id' });\n\nconsole.log(response);\n```",
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
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

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
