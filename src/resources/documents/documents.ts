// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from './documents';
import * as InboxAPI from '../inbox';
import * as ValidateAPI from '../validate';
import * as AttachmentsAPI from './attachments';
import {
  AttachmentAddParams,
  AttachmentDeleteParams,
  AttachmentDeleteResponse,
  AttachmentListResponse,
  AttachmentRetrieveParams,
  Attachments,
  DocumentAttachment,
} from './attachments';
import * as UblAPI from './ubl';
import { Ubl, UblCreateFromUblParams, UblGetResponse } from './ubl';
import { APIPromise } from '../../core/api-promise';
import { DocumentsNumberPage } from '../../core/pagination';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Documents extends APIResource {
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);
  ubl: UblAPI.Ubl = new UblAPI.Ubl(this._client);

  /**
   * Create a new invoice or credit note
   */
  create(body: DocumentCreateParams, options?: RequestOptions): APIPromise<DocumentResponse> {
    return this._client.post('/api/documents/', { body, ...options });
  }

  /**
   * Get an invoice or credit note by ID
   */
  retrieve(documentID: string, options?: RequestOptions): APIPromise<DocumentResponse> {
    return this._client.get(path`/api/documents/${documentID}`, options);
  }

  /**
   * Delete an invoice or credit note
   */
  delete(documentID: string, options?: RequestOptions): APIPromise<DocumentDeleteResponse> {
    return this._client.delete(path`/api/documents/${documentID}`, options);
  }

  /**
   * Create a new invoice or credit note from a PDF file. If the 'ubl_document' field
   * is set in the response, it indicates that sufficient details were extracted from
   * the PDF to automatically generate a valid UBL document ready for sending. If
   * 'ubl_document' is not set, human intervention may be required to ensure
   * compliance.
   */
  createFromPdf(
    params: DocumentCreateFromPdfParams,
    options?: RequestOptions,
  ): APIPromise<DocumentCreateFromPdfResponse> {
    const { customer_tax_id, vendor_tax_id, ...body } = params;
    return this._client.post(
      '/api/documents/pdf',
      multipartFormRequestOptions(
        { query: { customer_tax_id, vendor_tax_id }, body, ...options },
        this._client,
      ),
    );
  }

  /**
   * Send an invoice or credit note via Peppol
   */
  send(
    documentID: string,
    params: DocumentSendParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DocumentResponse> {
    const { email, receiver_peppol_id, receiver_peppol_scheme, sender_peppol_id, sender_peppol_scheme } =
      params ?? {};
    return this._client.post(path`/api/documents/${documentID}/send`, {
      query: { email, receiver_peppol_id, receiver_peppol_scheme, sender_peppol_id, sender_peppol_scheme },
      ...options,
    });
  }

  /**
   * Validate a UBL document according to Peppol BIS Billing 3.0
   */
  validate(documentID: string, options?: RequestOptions): APIPromise<ValidateAPI.UblDocumentValidation> {
    return this._client.post(path`/api/documents/${documentID}/validate`, options);
  }
}

export type DocumentResponsesDocumentsNumberPage = DocumentsNumberPage<DocumentResponse>;

/**
 * An allowance is a discount for example for early payment, volume discount, etc.
 */
export interface Allowance {
  /**
   * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
   */
  amount?: string | null;

  /**
   * The base amount that may be used, in conjunction with the allowance percentage,
   * to calculate the allowance amount. Must be rounded to maximum 2 decimals
   */
  base_amount?: string | null;

  /**
   * The percentage that may be used, in conjunction with the allowance base amount,
   * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
   * to maximum 2 decimals
   */
  multiplier_factor?: string | null;

  /**
   * The reason for the allowance
   */
  reason?: string | null;

  /**
   * Allowance reason codes for invoice discounts and charges
   */
  reason_code?:
    | '41'
    | '42'
    | '60'
    | '62'
    | '63'
    | '64'
    | '65'
    | '66'
    | '67'
    | '68'
    | '70'
    | '71'
    | '88'
    | '95'
    | '100'
    | '102'
    | '103'
    | '104'
    | '105'
    | null;

  /**
   * The VAT category code that applies to the allowance
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  /**
   * The VAT rate, represented as percentage that applies to the allowance. Must be
   * rounded to maximum 2 decimals
   */
  tax_rate?: string | null;
}

/**
 * A charge is an additional fee for example for late payment, late delivery, etc.
 */
export interface Charge {
  /**
   * The charge amount, without VAT. Must be rounded to maximum 2 decimals
   */
  amount?: string | null;

  /**
   * The base amount that may be used, in conjunction with the charge percentage, to
   * calculate the charge amount. Must be rounded to maximum 2 decimals
   */
  base_amount?: string | null;

  /**
   * The percentage that may be used, in conjunction with the charge base amount, to
   * calculate the charge amount. To state 20%, use value 20
   */
  multiplier_factor?: string | null;

  /**
   * The reason for the charge
   */
  reason?: string | null;

  /**
   * Charge reason codes for invoice charges and fees
   */
  reason_code?:
    | 'AA'
    | 'AAA'
    | 'AAC'
    | 'AAD'
    | 'AAE'
    | 'AAF'
    | 'AAH'
    | 'AAI'
    | 'AAS'
    | 'AAT'
    | 'AAV'
    | 'AAY'
    | 'AAZ'
    | 'ABA'
    | 'ABB'
    | 'ABC'
    | 'ABD'
    | 'ABF'
    | 'ABK'
    | 'ABL'
    | 'ABN'
    | 'ABR'
    | 'ABS'
    | 'ABT'
    | 'ABU'
    | 'ACF'
    | 'ACG'
    | 'ACH'
    | 'ACI'
    | 'ACJ'
    | 'ACK'
    | 'ACL'
    | 'ACM'
    | 'ACS'
    | 'ADC'
    | 'ADE'
    | 'ADJ'
    | 'ADK'
    | 'ADL'
    | 'ADM'
    | 'ADN'
    | 'ADO'
    | 'ADP'
    | 'ADQ'
    | 'ADR'
    | 'ADT'
    | 'ADW'
    | 'ADY'
    | 'ADZ'
    | 'AEA'
    | 'AEB'
    | 'AEC'
    | 'AED'
    | 'AEF'
    | 'AEH'
    | 'AEI'
    | 'AEJ'
    | 'AEK'
    | 'AEL'
    | 'AEM'
    | 'AEN'
    | 'AEO'
    | 'AEP'
    | 'AES'
    | 'AET'
    | 'AEU'
    | 'AEV'
    | 'AEW'
    | 'AEX'
    | 'AEY'
    | 'AEZ'
    | 'AJ'
    | 'AU'
    | 'CA'
    | 'CAB'
    | 'CAD'
    | 'CAE'
    | 'CAF'
    | 'CAI'
    | 'CAJ'
    | 'CAK'
    | 'CAL'
    | 'CAM'
    | 'CAN'
    | 'CAO'
    | 'CAP'
    | 'CAQ'
    | 'CAR'
    | 'CAS'
    | 'CAT'
    | 'CAU'
    | 'CAV'
    | 'CAW'
    | 'CAX'
    | 'CAY'
    | 'CAZ'
    | 'CD'
    | 'CG'
    | 'CS'
    | 'CT'
    | 'DAB'
    | 'DAC'
    | 'DAD'
    | 'DAF'
    | 'DAG'
    | 'DAH'
    | 'DAI'
    | 'DAJ'
    | 'DAK'
    | 'DAL'
    | 'DAM'
    | 'DAN'
    | 'DAO'
    | 'DAP'
    | 'DAQ'
    | 'DL'
    | 'EG'
    | 'EP'
    | 'ER'
    | 'FAA'
    | 'FAB'
    | 'FAC'
    | 'FC'
    | 'FH'
    | 'FI'
    | 'GAA'
    | 'HAA'
    | 'HD'
    | 'HH'
    | 'IAA'
    | 'IAB'
    | 'ID'
    | 'IF'
    | 'IR'
    | 'IS'
    | 'KO'
    | 'L1'
    | 'LA'
    | 'LAA'
    | 'LAB'
    | 'LF'
    | 'MAE'
    | 'MI'
    | 'ML'
    | 'NAA'
    | 'OA'
    | 'PA'
    | 'PAA'
    | 'PC'
    | 'PL'
    | 'PRV'
    | 'RAB'
    | 'RAC'
    | 'RAD'
    | 'RAF'
    | 'RE'
    | 'RF'
    | 'RH'
    | 'RV'
    | 'SA'
    | 'SAA'
    | 'SAD'
    | 'SAE'
    | 'SAI'
    | 'SG'
    | 'SH'
    | 'SM'
    | 'SU'
    | 'TAB'
    | 'TAC'
    | 'TT'
    | 'TV'
    | 'V1'
    | 'V2'
    | 'WH'
    | 'XAA'
    | 'YY'
    | 'ZZZ'
    | null;

  /**
   * Duty or tax or fee category codes (Subset of UNCL5305)
   *
   * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

  /**
   * The VAT rate, represented as percentage that applies to the charge
   */
  tax_rate?: string | null;
}

export type CurrencyCode =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'JPY'
  | 'CHF'
  | 'CAD'
  | 'AUD'
  | 'NZD'
  | 'CNY'
  | 'INR'
  | 'SEK'
  | 'NOK'
  | 'DKK'
  | 'SGD'
  | 'HKD';

export interface DocumentAttachmentCreate {
  file_name: string;

  /**
   * Base64 encoded file data
   */
  file_data?: string | null;

  file_size?: number;

  file_type?: string;
}

export interface DocumentCreate {
  allowances?: Array<DocumentCreate.Allowance> | null;

  /**
   * The amount due for payment. Must be positive and rounded to maximum 2 decimals
   */
  amount_due?: number | string | null;

  attachments?: Array<DocumentAttachmentCreate> | null;

  /**
   * The billing address (if different from customer address)
   */
  billing_address?: string | null;

  /**
   * The recipient name at the billing address
   */
  billing_address_recipient?: string | null;

  charges?: Array<DocumentCreate.Charge> | null;

  /**
   * Currency of the invoice (ISO 4217 currency code)
   */
  currency?: CurrencyCode;

  /**
   * The address of the customer/buyer
   */
  customer_address?: string | null;

  /**
   * The recipient name at the customer address
   */
  customer_address_recipient?: string | null;

  /**
   * Customer company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  customer_company_id?: string | null;

  /**
   * The email address of the customer
   */
  customer_email?: string | null;

  /**
   * The unique identifier for the customer in your system
   */
  customer_id?: string | null;

  /**
   * The company name of the customer/buyer
   */
  customer_name?: string | null;

  /**
   * Customer tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  customer_tax_id?: string | null;

  /**
   * The direction of the document: INBOUND (purchases) or OUTBOUND (sales)
   */
  direction?: DocumentDirection;

  /**
   * The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE
   */
  document_type?: DocumentType;

  /**
   * The date when payment is due
   */
  due_date?: string | null;

  /**
   * The date when the invoice was issued
   */
  invoice_date?: string | null;

  /**
   * The unique invoice identifier/number
   */
  invoice_id?: string | null;

  /**
   * The total amount of the invoice including tax (invoice_total = subtotal +
   * total_tax + total_discount). Must be positive and rounded to maximum 2 decimals
   */
  invoice_total?: number | string | null;

  /**
   * At least one line item is required
   */
  items?: Array<DocumentCreate.Item>;

  /**
   * Additional notes or comments for the invoice
   */
  note?: string | null;

  payment_details?: Array<PaymentDetailCreate> | null;

  /**
   * The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')
   */
  payment_term?: string | null;

  /**
   * The previous unpaid balance from prior invoices, if any. Must be positive and
   * rounded to maximum 2 decimals
   */
  previous_unpaid_balance?: number | string | null;

  /**
   * The purchase order reference number
   */
  purchase_order?: string | null;

  /**
   * The address where payment should be sent or remitted to
   */
  remittance_address?: string | null;

  /**
   * The recipient name at the remittance address
   */
  remittance_address_recipient?: string | null;

  /**
   * The address where services were performed or goods were delivered
   */
  service_address?: string | null;

  /**
   * The recipient name at the service address
   */
  service_address_recipient?: string | null;

  /**
   * The end date of the service period or delivery period
   */
  service_end_date?: string | null;

  /**
   * The start date of the service period or delivery period
   */
  service_start_date?: string | null;

  /**
   * The shipping/delivery address
   */
  shipping_address?: string | null;

  /**
   * The recipient name at the shipping address
   */
  shipping_address_recipient?: string | null;

  /**
   * The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED
   */
  state?: InboxAPI.DocumentState;

  /**
   * The taxable base of the invoice. Should be the sum of all line items -
   * allowances (for example commercial discounts) + charges with impact on VAT. Must
   * be positive and rounded to maximum 2 decimals
   */
  subtotal?: number | string | null;

  /**
   * Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E
   * for exempt)
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  tax_details?: Array<DocumentCreate.TaxDetail> | null;

  /**
   * The net financial discount/charge of the invoice (non-VAT charges minus non-VAT
   * allowances). Can be positive (net charge), negative (net discount), or zero.
   * Must be rounded to maximum 2 decimals
   */
  total_discount?: number | string | null;

  /**
   * The total tax amount of the invoice. Must be positive and rounded to maximum 2
   * decimals
   */
  total_tax?: number | string | null;

  /**
   * VATEX code list for VAT exemption reasons
   *
   * Agency: CEF Identifier: vatex
   */
  vatex?:
    | 'VATEX-EU-79-C'
    | 'VATEX-EU-132'
    | 'VATEX-EU-132-1A'
    | 'VATEX-EU-132-1B'
    | 'VATEX-EU-132-1C'
    | 'VATEX-EU-132-1D'
    | 'VATEX-EU-132-1E'
    | 'VATEX-EU-132-1F'
    | 'VATEX-EU-132-1G'
    | 'VATEX-EU-132-1H'
    | 'VATEX-EU-132-1I'
    | 'VATEX-EU-132-1J'
    | 'VATEX-EU-132-1K'
    | 'VATEX-EU-132-1L'
    | 'VATEX-EU-132-1M'
    | 'VATEX-EU-132-1N'
    | 'VATEX-EU-132-1O'
    | 'VATEX-EU-132-1P'
    | 'VATEX-EU-132-1Q'
    | 'VATEX-EU-143'
    | 'VATEX-EU-143-1A'
    | 'VATEX-EU-143-1B'
    | 'VATEX-EU-143-1C'
    | 'VATEX-EU-143-1D'
    | 'VATEX-EU-143-1E'
    | 'VATEX-EU-143-1F'
    | 'VATEX-EU-143-1FA'
    | 'VATEX-EU-143-1G'
    | 'VATEX-EU-143-1H'
    | 'VATEX-EU-143-1I'
    | 'VATEX-EU-143-1J'
    | 'VATEX-EU-143-1K'
    | 'VATEX-EU-143-1L'
    | 'VATEX-EU-144'
    | 'VATEX-EU-146-1E'
    | 'VATEX-EU-148'
    | 'VATEX-EU-148-A'
    | 'VATEX-EU-148-B'
    | 'VATEX-EU-148-C'
    | 'VATEX-EU-148-D'
    | 'VATEX-EU-148-E'
    | 'VATEX-EU-148-F'
    | 'VATEX-EU-148-G'
    | 'VATEX-EU-151'
    | 'VATEX-EU-151-1A'
    | 'VATEX-EU-151-1AA'
    | 'VATEX-EU-151-1B'
    | 'VATEX-EU-151-1C'
    | 'VATEX-EU-151-1D'
    | 'VATEX-EU-151-1E'
    | 'VATEX-EU-159'
    | 'VATEX-EU-309'
    | 'VATEX-EU-AE'
    | 'VATEX-EU-D'
    | 'VATEX-EU-F'
    | 'VATEX-EU-G'
    | 'VATEX-EU-I'
    | 'VATEX-EU-IC'
    | 'VATEX-EU-O'
    | 'VATEX-EU-J'
    | 'VATEX-FR-FRANCHISE'
    | 'VATEX-FR-CNWVAT'
    | null;

  /**
   * Textual explanation for VAT exemption
   */
  vatex_note?: string | null;

  /**
   * The address of the vendor/seller
   */
  vendor_address?: string | null;

  /**
   * The recipient name at the vendor address
   */
  vendor_address_recipient?: string | null;

  /**
   * Vendor company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  vendor_company_id?: string | null;

  /**
   * The email address of the vendor
   */
  vendor_email?: string | null;

  /**
   * The name of the vendor/seller/supplier
   */
  vendor_name?: string | null;

  /**
   * Vendor tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  vendor_tax_id?: string | null;
}

export namespace DocumentCreate {
  /**
   * An allowance is a discount for example for early payment, volume discount, etc.
   */
  export interface Allowance {
    /**
     * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The base amount that may be used, in conjunction with the allowance percentage,
     * to calculate the allowance amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: number | string | null;

    /**
     * The percentage that may be used, in conjunction with the allowance base amount,
     * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
     * to maximum 2 decimals
     */
    multiplier_factor?: number | string | null;

    /**
     * The reason for the allowance
     */
    reason?: string | null;

    /**
     * Allowance reason codes for invoice discounts and charges
     */
    reason_code?:
      | '41'
      | '42'
      | '60'
      | '62'
      | '63'
      | '64'
      | '65'
      | '66'
      | '67'
      | '68'
      | '70'
      | '71'
      | '88'
      | '95'
      | '100'
      | '102'
      | '103'
      | '104'
      | '105'
      | null;

    /**
     * The VAT category code that applies to the allowance
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

    /**
     * The VAT rate, represented as percentage that applies to the allowance. Must be
     * rounded to maximum 2 decimals
     */
    tax_rate?: number | string | null;
  }

  /**
   * A charge is an additional fee for example for late payment, late delivery, etc.
   */
  export interface Charge {
    /**
     * The charge amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The base amount that may be used, in conjunction with the charge percentage, to
     * calculate the charge amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: number | string | null;

    /**
     * The percentage that may be used, in conjunction with the charge base amount, to
     * calculate the charge amount. To state 20%, use value 20
     */
    multiplier_factor?: number | string | null;

    /**
     * The reason for the charge
     */
    reason?: string | null;

    /**
     * Charge reason codes for invoice charges and fees
     */
    reason_code?:
      | 'AA'
      | 'AAA'
      | 'AAC'
      | 'AAD'
      | 'AAE'
      | 'AAF'
      | 'AAH'
      | 'AAI'
      | 'AAS'
      | 'AAT'
      | 'AAV'
      | 'AAY'
      | 'AAZ'
      | 'ABA'
      | 'ABB'
      | 'ABC'
      | 'ABD'
      | 'ABF'
      | 'ABK'
      | 'ABL'
      | 'ABN'
      | 'ABR'
      | 'ABS'
      | 'ABT'
      | 'ABU'
      | 'ACF'
      | 'ACG'
      | 'ACH'
      | 'ACI'
      | 'ACJ'
      | 'ACK'
      | 'ACL'
      | 'ACM'
      | 'ACS'
      | 'ADC'
      | 'ADE'
      | 'ADJ'
      | 'ADK'
      | 'ADL'
      | 'ADM'
      | 'ADN'
      | 'ADO'
      | 'ADP'
      | 'ADQ'
      | 'ADR'
      | 'ADT'
      | 'ADW'
      | 'ADY'
      | 'ADZ'
      | 'AEA'
      | 'AEB'
      | 'AEC'
      | 'AED'
      | 'AEF'
      | 'AEH'
      | 'AEI'
      | 'AEJ'
      | 'AEK'
      | 'AEL'
      | 'AEM'
      | 'AEN'
      | 'AEO'
      | 'AEP'
      | 'AES'
      | 'AET'
      | 'AEU'
      | 'AEV'
      | 'AEW'
      | 'AEX'
      | 'AEY'
      | 'AEZ'
      | 'AJ'
      | 'AU'
      | 'CA'
      | 'CAB'
      | 'CAD'
      | 'CAE'
      | 'CAF'
      | 'CAI'
      | 'CAJ'
      | 'CAK'
      | 'CAL'
      | 'CAM'
      | 'CAN'
      | 'CAO'
      | 'CAP'
      | 'CAQ'
      | 'CAR'
      | 'CAS'
      | 'CAT'
      | 'CAU'
      | 'CAV'
      | 'CAW'
      | 'CAX'
      | 'CAY'
      | 'CAZ'
      | 'CD'
      | 'CG'
      | 'CS'
      | 'CT'
      | 'DAB'
      | 'DAC'
      | 'DAD'
      | 'DAF'
      | 'DAG'
      | 'DAH'
      | 'DAI'
      | 'DAJ'
      | 'DAK'
      | 'DAL'
      | 'DAM'
      | 'DAN'
      | 'DAO'
      | 'DAP'
      | 'DAQ'
      | 'DL'
      | 'EG'
      | 'EP'
      | 'ER'
      | 'FAA'
      | 'FAB'
      | 'FAC'
      | 'FC'
      | 'FH'
      | 'FI'
      | 'GAA'
      | 'HAA'
      | 'HD'
      | 'HH'
      | 'IAA'
      | 'IAB'
      | 'ID'
      | 'IF'
      | 'IR'
      | 'IS'
      | 'KO'
      | 'L1'
      | 'LA'
      | 'LAA'
      | 'LAB'
      | 'LF'
      | 'MAE'
      | 'MI'
      | 'ML'
      | 'NAA'
      | 'OA'
      | 'PA'
      | 'PAA'
      | 'PC'
      | 'PL'
      | 'PRV'
      | 'RAB'
      | 'RAC'
      | 'RAD'
      | 'RAF'
      | 'RE'
      | 'RF'
      | 'RH'
      | 'RV'
      | 'SA'
      | 'SAA'
      | 'SAD'
      | 'SAE'
      | 'SAI'
      | 'SG'
      | 'SH'
      | 'SM'
      | 'SU'
      | 'TAB'
      | 'TAC'
      | 'TT'
      | 'TV'
      | 'V1'
      | 'V2'
      | 'WH'
      | 'XAA'
      | 'YY'
      | 'ZZZ'
      | null;

    /**
     * Duty or tax or fee category codes (Subset of UNCL5305)
     *
     * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

    /**
     * The VAT rate, represented as percentage that applies to the charge
     */
    tax_rate?: number | string | null;
  }

  export interface Item {
    /**
     * The allowances of the line item.
     */
    allowances?: Array<Item.Allowance> | null;

    /**
     * The invoice line net amount (BT-131), exclusive of VAT, inclusive of line level
     * allowances and charges. Calculated as: ((unit_price / price_base_quantity) \*
     * quantity) - allowances + charges. Must be rounded to maximum 2 decimals. Can be
     * negative for credit notes or corrections.
     */
    amount?: number | string | null;

    /**
     * The charges of the line item.
     */
    charges?: Array<Item.Charge> | null;

    date?: null;

    /**
     * The description of the line item.
     */
    description?: string | null;

    /**
     * The product code of the line item.
     */
    product_code?: string | null;

    /**
     * The quantity of items (goods or services) that is the subject of the line item.
     * Must be rounded to maximum 4 decimals. Can be negative for credit notes or
     * corrections.
     */
    quantity?: number | string | null;

    /**
     * The total VAT amount for the line item. Must be rounded to maximum 2 decimals.
     * Can be negative for credit notes or corrections.
     */
    tax?: number | string | null;

    /**
     * The VAT rate of the line item expressed as percentage with 2 decimals
     */
    tax_rate?: number | string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    /**
     * The item net price (BT-146). The price of an item, exclusive of VAT, after
     * subtracting item price discount. Must be rounded to maximum 4 decimals
     */
    unit_price?: number | string | null;
  }

  export namespace Item {
    /**
     * An allowance is a discount for example for early payment, volume discount, etc.
     */
    export interface Allowance {
      /**
       * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
       */
      amount?: number | string | null;

      /**
       * The base amount that may be used, in conjunction with the allowance percentage,
       * to calculate the allowance amount. Must be rounded to maximum 2 decimals
       */
      base_amount?: number | string | null;

      /**
       * The percentage that may be used, in conjunction with the allowance base amount,
       * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
       * to maximum 2 decimals
       */
      multiplier_factor?: number | string | null;

      /**
       * The reason for the allowance
       */
      reason?: string | null;

      /**
       * Allowance reason codes for invoice discounts and charges
       */
      reason_code?:
        | '41'
        | '42'
        | '60'
        | '62'
        | '63'
        | '64'
        | '65'
        | '66'
        | '67'
        | '68'
        | '70'
        | '71'
        | '88'
        | '95'
        | '100'
        | '102'
        | '103'
        | '104'
        | '105'
        | null;

      /**
       * The VAT category code that applies to the allowance
       */
      tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

      /**
       * The VAT rate, represented as percentage that applies to the allowance. Must be
       * rounded to maximum 2 decimals
       */
      tax_rate?: number | string | null;
    }

    /**
     * A charge is an additional fee for example for late payment, late delivery, etc.
     */
    export interface Charge {
      /**
       * The charge amount, without VAT. Must be rounded to maximum 2 decimals
       */
      amount?: number | string | null;

      /**
       * The base amount that may be used, in conjunction with the charge percentage, to
       * calculate the charge amount. Must be rounded to maximum 2 decimals
       */
      base_amount?: number | string | null;

      /**
       * The percentage that may be used, in conjunction with the charge base amount, to
       * calculate the charge amount. To state 20%, use value 20
       */
      multiplier_factor?: number | string | null;

      /**
       * The reason for the charge
       */
      reason?: string | null;

      /**
       * Charge reason codes for invoice charges and fees
       */
      reason_code?:
        | 'AA'
        | 'AAA'
        | 'AAC'
        | 'AAD'
        | 'AAE'
        | 'AAF'
        | 'AAH'
        | 'AAI'
        | 'AAS'
        | 'AAT'
        | 'AAV'
        | 'AAY'
        | 'AAZ'
        | 'ABA'
        | 'ABB'
        | 'ABC'
        | 'ABD'
        | 'ABF'
        | 'ABK'
        | 'ABL'
        | 'ABN'
        | 'ABR'
        | 'ABS'
        | 'ABT'
        | 'ABU'
        | 'ACF'
        | 'ACG'
        | 'ACH'
        | 'ACI'
        | 'ACJ'
        | 'ACK'
        | 'ACL'
        | 'ACM'
        | 'ACS'
        | 'ADC'
        | 'ADE'
        | 'ADJ'
        | 'ADK'
        | 'ADL'
        | 'ADM'
        | 'ADN'
        | 'ADO'
        | 'ADP'
        | 'ADQ'
        | 'ADR'
        | 'ADT'
        | 'ADW'
        | 'ADY'
        | 'ADZ'
        | 'AEA'
        | 'AEB'
        | 'AEC'
        | 'AED'
        | 'AEF'
        | 'AEH'
        | 'AEI'
        | 'AEJ'
        | 'AEK'
        | 'AEL'
        | 'AEM'
        | 'AEN'
        | 'AEO'
        | 'AEP'
        | 'AES'
        | 'AET'
        | 'AEU'
        | 'AEV'
        | 'AEW'
        | 'AEX'
        | 'AEY'
        | 'AEZ'
        | 'AJ'
        | 'AU'
        | 'CA'
        | 'CAB'
        | 'CAD'
        | 'CAE'
        | 'CAF'
        | 'CAI'
        | 'CAJ'
        | 'CAK'
        | 'CAL'
        | 'CAM'
        | 'CAN'
        | 'CAO'
        | 'CAP'
        | 'CAQ'
        | 'CAR'
        | 'CAS'
        | 'CAT'
        | 'CAU'
        | 'CAV'
        | 'CAW'
        | 'CAX'
        | 'CAY'
        | 'CAZ'
        | 'CD'
        | 'CG'
        | 'CS'
        | 'CT'
        | 'DAB'
        | 'DAC'
        | 'DAD'
        | 'DAF'
        | 'DAG'
        | 'DAH'
        | 'DAI'
        | 'DAJ'
        | 'DAK'
        | 'DAL'
        | 'DAM'
        | 'DAN'
        | 'DAO'
        | 'DAP'
        | 'DAQ'
        | 'DL'
        | 'EG'
        | 'EP'
        | 'ER'
        | 'FAA'
        | 'FAB'
        | 'FAC'
        | 'FC'
        | 'FH'
        | 'FI'
        | 'GAA'
        | 'HAA'
        | 'HD'
        | 'HH'
        | 'IAA'
        | 'IAB'
        | 'ID'
        | 'IF'
        | 'IR'
        | 'IS'
        | 'KO'
        | 'L1'
        | 'LA'
        | 'LAA'
        | 'LAB'
        | 'LF'
        | 'MAE'
        | 'MI'
        | 'ML'
        | 'NAA'
        | 'OA'
        | 'PA'
        | 'PAA'
        | 'PC'
        | 'PL'
        | 'PRV'
        | 'RAB'
        | 'RAC'
        | 'RAD'
        | 'RAF'
        | 'RE'
        | 'RF'
        | 'RH'
        | 'RV'
        | 'SA'
        | 'SAA'
        | 'SAD'
        | 'SAE'
        | 'SAI'
        | 'SG'
        | 'SH'
        | 'SM'
        | 'SU'
        | 'TAB'
        | 'TAC'
        | 'TT'
        | 'TV'
        | 'V1'
        | 'V2'
        | 'WH'
        | 'XAA'
        | 'YY'
        | 'ZZZ'
        | null;

      /**
       * Duty or tax or fee category codes (Subset of UNCL5305)
       *
       * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
       */
      tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

      /**
       * The VAT rate, represented as percentage that applies to the charge
       */
      tax_rate?: number | string | null;
    }
  }

  export interface TaxDetail {
    /**
     * The tax amount for this tax category. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The tax rate as a percentage (e.g., '21.00', '6.00', '0.00')
     */
    rate?: string | null;
  }
}

export type DocumentDirection = 'INBOUND' | 'OUTBOUND';

export interface DocumentResponse {
  id: string;

  allowances?: Array<DocumentResponse.Allowance> | null;

  /**
   * The amount due for payment. Must be positive and rounded to maximum 2 decimals
   */
  amount_due?: string | null;

  attachments?: Array<AttachmentsAPI.DocumentAttachment> | null;

  /**
   * The billing address (if different from customer address)
   */
  billing_address?: string | null;

  /**
   * The recipient name at the billing address
   */
  billing_address_recipient?: string | null;

  charges?: Array<DocumentResponse.Charge> | null;

  /**
   * Currency of the invoice (ISO 4217 currency code)
   */
  currency?: CurrencyCode;

  /**
   * The address of the customer/buyer
   */
  customer_address?: string | null;

  /**
   * The recipient name at the customer address
   */
  customer_address_recipient?: string | null;

  /**
   * Customer company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  customer_company_id?: string | null;

  /**
   * The email address of the customer
   */
  customer_email?: string | null;

  /**
   * The unique identifier for the customer in your system
   */
  customer_id?: string | null;

  /**
   * The company name of the customer/buyer
   */
  customer_name?: string | null;

  /**
   * Customer tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  customer_tax_id?: string | null;

  /**
   * The direction of the document: INBOUND (purchases) or OUTBOUND (sales)
   */
  direction?: DocumentDirection;

  /**
   * The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE
   */
  document_type?: DocumentType;

  /**
   * The date when payment is due
   */
  due_date?: string | null;

  /**
   * The date when the invoice was issued
   */
  invoice_date?: string | null;

  /**
   * The unique invoice identifier/number
   */
  invoice_id?: string | null;

  /**
   * The total amount of the invoice including tax (invoice_total = subtotal +
   * total_tax + total_discount). Must be positive and rounded to maximum 2 decimals
   */
  invoice_total?: string | null;

  items?: Array<DocumentResponse.Item> | null;

  /**
   * Additional notes or comments for the invoice
   */
  note?: string | null;

  payment_details?: Array<DocumentResponse.PaymentDetail> | null;

  /**
   * The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')
   */
  payment_term?: string | null;

  /**
   * The purchase order reference number
   */
  purchase_order?: string | null;

  /**
   * The address where payment should be sent or remitted to
   */
  remittance_address?: string | null;

  /**
   * The recipient name at the remittance address
   */
  remittance_address_recipient?: string | null;

  /**
   * The address where services were performed or goods were delivered
   */
  service_address?: string | null;

  /**
   * The recipient name at the service address
   */
  service_address_recipient?: string | null;

  /**
   * The end date of the service period or delivery period
   */
  service_end_date?: string | null;

  /**
   * The start date of the service period or delivery period
   */
  service_start_date?: string | null;

  /**
   * The shipping/delivery address
   */
  shipping_address?: string | null;

  /**
   * The recipient name at the shipping address
   */
  shipping_address_recipient?: string | null;

  /**
   * The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED
   */
  state?: InboxAPI.DocumentState;

  /**
   * The taxable base of the invoice. Should be the sum of all line items -
   * allowances (for example commercial discounts) + charges with impact on VAT. Must
   * be positive and rounded to maximum 2 decimals
   */
  subtotal?: string | null;

  /**
   * Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E
   * for exempt)
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  tax_details?: Array<DocumentResponse.TaxDetail> | null;

  /**
   * The net financial discount/charge of the invoice (non-VAT charges minus non-VAT
   * allowances). Can be positive (net charge), negative (net discount), or zero.
   * Must be rounded to maximum 2 decimals
   */
  total_discount?: string | null;

  /**
   * The total tax amount of the invoice. Must be positive and rounded to maximum 2
   * decimals
   */
  total_tax?: string | null;

  /**
   * VATEX code list for VAT exemption reasons
   *
   * Agency: CEF Identifier: vatex
   */
  vatex?:
    | 'VATEX-EU-79-C'
    | 'VATEX-EU-132'
    | 'VATEX-EU-132-1A'
    | 'VATEX-EU-132-1B'
    | 'VATEX-EU-132-1C'
    | 'VATEX-EU-132-1D'
    | 'VATEX-EU-132-1E'
    | 'VATEX-EU-132-1F'
    | 'VATEX-EU-132-1G'
    | 'VATEX-EU-132-1H'
    | 'VATEX-EU-132-1I'
    | 'VATEX-EU-132-1J'
    | 'VATEX-EU-132-1K'
    | 'VATEX-EU-132-1L'
    | 'VATEX-EU-132-1M'
    | 'VATEX-EU-132-1N'
    | 'VATEX-EU-132-1O'
    | 'VATEX-EU-132-1P'
    | 'VATEX-EU-132-1Q'
    | 'VATEX-EU-143'
    | 'VATEX-EU-143-1A'
    | 'VATEX-EU-143-1B'
    | 'VATEX-EU-143-1C'
    | 'VATEX-EU-143-1D'
    | 'VATEX-EU-143-1E'
    | 'VATEX-EU-143-1F'
    | 'VATEX-EU-143-1FA'
    | 'VATEX-EU-143-1G'
    | 'VATEX-EU-143-1H'
    | 'VATEX-EU-143-1I'
    | 'VATEX-EU-143-1J'
    | 'VATEX-EU-143-1K'
    | 'VATEX-EU-143-1L'
    | 'VATEX-EU-144'
    | 'VATEX-EU-146-1E'
    | 'VATEX-EU-148'
    | 'VATEX-EU-148-A'
    | 'VATEX-EU-148-B'
    | 'VATEX-EU-148-C'
    | 'VATEX-EU-148-D'
    | 'VATEX-EU-148-E'
    | 'VATEX-EU-148-F'
    | 'VATEX-EU-148-G'
    | 'VATEX-EU-151'
    | 'VATEX-EU-151-1A'
    | 'VATEX-EU-151-1AA'
    | 'VATEX-EU-151-1B'
    | 'VATEX-EU-151-1C'
    | 'VATEX-EU-151-1D'
    | 'VATEX-EU-151-1E'
    | 'VATEX-EU-159'
    | 'VATEX-EU-309'
    | 'VATEX-EU-AE'
    | 'VATEX-EU-D'
    | 'VATEX-EU-F'
    | 'VATEX-EU-G'
    | 'VATEX-EU-I'
    | 'VATEX-EU-IC'
    | 'VATEX-EU-O'
    | 'VATEX-EU-J'
    | 'VATEX-FR-FRANCHISE'
    | 'VATEX-FR-CNWVAT'
    | null;

  /**
   * Textual explanation for VAT exemption
   */
  vatex_note?: string | null;

  /**
   * The address of the vendor/seller
   */
  vendor_address?: string | null;

  /**
   * The recipient name at the vendor address
   */
  vendor_address_recipient?: string | null;

  /**
   * Vendor company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  vendor_company_id?: string | null;

  /**
   * The email address of the vendor
   */
  vendor_email?: string | null;

  /**
   * The name of the vendor/seller/supplier
   */
  vendor_name?: string | null;

  /**
   * Vendor tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  vendor_tax_id?: string | null;
}

export namespace DocumentResponse {
  export interface Allowance {
    /**
     * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: string | null;

    /**
     * The base amount that may be used, in conjunction with the allowance percentage,
     * to calculate the allowance amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: string | null;

    /**
     * The percentage that may be used, in conjunction with the allowance base amount,
     * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
     * to maximum 2 decimals
     */
    multiplier_factor?: string | null;

    /**
     * The reason for the allowance
     */
    reason?: string | null;

    /**
     * Allowance reason codes for invoice discounts and charges
     */
    reason_code?:
      | '41'
      | '42'
      | '60'
      | '62'
      | '63'
      | '64'
      | '65'
      | '66'
      | '67'
      | '68'
      | '70'
      | '71'
      | '88'
      | '95'
      | '100'
      | '102'
      | '103'
      | '104'
      | '105'
      | null;

    /**
     * The VAT category code that applies to the allowance
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

    /**
     * The VAT rate, represented as percentage that applies to the allowance. Must be
     * rounded to maximum 2 decimals
     */
    tax_rate?: string | null;
  }

  export interface Charge {
    /**
     * The charge amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: string | null;

    /**
     * The base amount that may be used, in conjunction with the charge percentage, to
     * calculate the charge amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: string | null;

    /**
     * The percentage that may be used, in conjunction with the charge base amount, to
     * calculate the charge amount. To state 20%, use value 20
     */
    multiplier_factor?: string | null;

    /**
     * The reason for the charge
     */
    reason?: string | null;

    /**
     * Charge reason codes for invoice charges and fees
     */
    reason_code?:
      | 'AA'
      | 'AAA'
      | 'AAC'
      | 'AAD'
      | 'AAE'
      | 'AAF'
      | 'AAH'
      | 'AAI'
      | 'AAS'
      | 'AAT'
      | 'AAV'
      | 'AAY'
      | 'AAZ'
      | 'ABA'
      | 'ABB'
      | 'ABC'
      | 'ABD'
      | 'ABF'
      | 'ABK'
      | 'ABL'
      | 'ABN'
      | 'ABR'
      | 'ABS'
      | 'ABT'
      | 'ABU'
      | 'ACF'
      | 'ACG'
      | 'ACH'
      | 'ACI'
      | 'ACJ'
      | 'ACK'
      | 'ACL'
      | 'ACM'
      | 'ACS'
      | 'ADC'
      | 'ADE'
      | 'ADJ'
      | 'ADK'
      | 'ADL'
      | 'ADM'
      | 'ADN'
      | 'ADO'
      | 'ADP'
      | 'ADQ'
      | 'ADR'
      | 'ADT'
      | 'ADW'
      | 'ADY'
      | 'ADZ'
      | 'AEA'
      | 'AEB'
      | 'AEC'
      | 'AED'
      | 'AEF'
      | 'AEH'
      | 'AEI'
      | 'AEJ'
      | 'AEK'
      | 'AEL'
      | 'AEM'
      | 'AEN'
      | 'AEO'
      | 'AEP'
      | 'AES'
      | 'AET'
      | 'AEU'
      | 'AEV'
      | 'AEW'
      | 'AEX'
      | 'AEY'
      | 'AEZ'
      | 'AJ'
      | 'AU'
      | 'CA'
      | 'CAB'
      | 'CAD'
      | 'CAE'
      | 'CAF'
      | 'CAI'
      | 'CAJ'
      | 'CAK'
      | 'CAL'
      | 'CAM'
      | 'CAN'
      | 'CAO'
      | 'CAP'
      | 'CAQ'
      | 'CAR'
      | 'CAS'
      | 'CAT'
      | 'CAU'
      | 'CAV'
      | 'CAW'
      | 'CAX'
      | 'CAY'
      | 'CAZ'
      | 'CD'
      | 'CG'
      | 'CS'
      | 'CT'
      | 'DAB'
      | 'DAC'
      | 'DAD'
      | 'DAF'
      | 'DAG'
      | 'DAH'
      | 'DAI'
      | 'DAJ'
      | 'DAK'
      | 'DAL'
      | 'DAM'
      | 'DAN'
      | 'DAO'
      | 'DAP'
      | 'DAQ'
      | 'DL'
      | 'EG'
      | 'EP'
      | 'ER'
      | 'FAA'
      | 'FAB'
      | 'FAC'
      | 'FC'
      | 'FH'
      | 'FI'
      | 'GAA'
      | 'HAA'
      | 'HD'
      | 'HH'
      | 'IAA'
      | 'IAB'
      | 'ID'
      | 'IF'
      | 'IR'
      | 'IS'
      | 'KO'
      | 'L1'
      | 'LA'
      | 'LAA'
      | 'LAB'
      | 'LF'
      | 'MAE'
      | 'MI'
      | 'ML'
      | 'NAA'
      | 'OA'
      | 'PA'
      | 'PAA'
      | 'PC'
      | 'PL'
      | 'PRV'
      | 'RAB'
      | 'RAC'
      | 'RAD'
      | 'RAF'
      | 'RE'
      | 'RF'
      | 'RH'
      | 'RV'
      | 'SA'
      | 'SAA'
      | 'SAD'
      | 'SAE'
      | 'SAI'
      | 'SG'
      | 'SH'
      | 'SM'
      | 'SU'
      | 'TAB'
      | 'TAC'
      | 'TT'
      | 'TV'
      | 'V1'
      | 'V2'
      | 'WH'
      | 'XAA'
      | 'YY'
      | 'ZZZ'
      | null;

    /**
     * Duty or tax or fee category codes (Subset of UNCL5305)
     *
     * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

    /**
     * The VAT rate, represented as percentage that applies to the charge
     */
    tax_rate?: string | null;
  }

  export interface Item {
    /**
     * The allowances of the line item.
     */
    allowances?: Array<DocumentsAPI.Allowance> | null;

    /**
     * The invoice line net amount (BT-131), exclusive of VAT, inclusive of line level
     * allowances and charges. Calculated as: ((unit_price / price_base_quantity) \*
     * quantity) - allowances + charges. Must be rounded to maximum 2 decimals. Can be
     * negative for credit notes or corrections.
     */
    amount?: string | null;

    /**
     * The charges of the line item.
     */
    charges?: Array<DocumentsAPI.Charge> | null;

    date?: null;

    /**
     * The description of the line item.
     */
    description?: string | null;

    /**
     * The product code of the line item.
     */
    product_code?: string | null;

    /**
     * The quantity of items (goods or services) that is the subject of the line item.
     * Must be rounded to maximum 4 decimals. Can be negative for credit notes or
     * corrections.
     */
    quantity?: string | null;

    /**
     * The total VAT amount for the line item. Must be rounded to maximum 2 decimals.
     * Can be negative for credit notes or corrections.
     */
    tax?: string | null;

    /**
     * The VAT rate of the line item expressed as percentage with 2 decimals
     */
    tax_rate?: string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    /**
     * The item net price (BT-146). The price of an item, exclusive of VAT, after
     * subtracting item price discount. Must be rounded to maximum 4 decimals
     */
    unit_price?: string | null;
  }

  export interface PaymentDetail {
    /**
     * Bank account number (for non-IBAN accounts)
     */
    bank_account_number?: string | null;

    /**
     * International Bank Account Number for payment transfers
     */
    iban?: string | null;

    /**
     * Structured payment reference or communication (e.g., structured communication
     * for Belgian bank transfers)
     */
    payment_reference?: string | null;

    /**
     * SWIFT/BIC code of the bank
     */
    swift?: string | null;
  }

  export interface TaxDetail {
    /**
     * The tax amount for this tax category. Must be rounded to maximum 2 decimals
     */
    amount?: string | null;

    /**
     * The tax rate as a percentage (e.g., '21.00', '6.00', '0.00')
     */
    rate?: string | null;
  }
}

export type DocumentType = 'INVOICE' | 'CREDIT_NOTE' | 'DEBIT_NOTE';

export interface PaymentDetailCreate {
  /**
   * Bank account number (for non-IBAN accounts)
   */
  bank_account_number?: string | null;

  /**
   * International Bank Account Number for payment transfers
   */
  iban?: string | null;

  /**
   * Structured payment reference or communication (e.g., structured communication
   * for Belgian bank transfers)
   */
  payment_reference?: string | null;

  /**
   * SWIFT/BIC code of the bank
   */
  swift?: string | null;
}

/**
 * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
 */
export type UnitOfMeasureCode =
  | '10'
  | '11'
  | '13'
  | '14'
  | '15'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '27'
  | '28'
  | '33'
  | '34'
  | '35'
  | '37'
  | '38'
  | '40'
  | '41'
  | '56'
  | '57'
  | '58'
  | '59'
  | '60'
  | '61'
  | '74'
  | '77'
  | '80'
  | '81'
  | '85'
  | '87'
  | '89'
  | '91'
  | '1I'
  | 'EA'
  | 'E01'
  | 'E07'
  | 'E09'
  | 'E10'
  | 'E12'
  | 'E14'
  | 'E17'
  | 'E20'
  | 'E23'
  | 'E25'
  | 'E27'
  | 'E31'
  | 'E34'
  | 'E35'
  | 'E36'
  | 'E37'
  | 'E38'
  | 'E39'
  | 'E40'
  | 'E41'
  | 'E42'
  | 'E43'
  | 'E44'
  | 'E45'
  | 'E46'
  | 'E47'
  | 'E48'
  | 'E49'
  | 'E50'
  | 'E51'
  | 'E52'
  | 'E53'
  | 'E54'
  | 'E55'
  | 'E56'
  | 'E57'
  | 'E58'
  | 'E60'
  | 'E62'
  | 'E65'
  | 'E66'
  | 'E67'
  | 'E69'
  | 'E70'
  | 'E71'
  | 'E73'
  | 'E75'
  | 'E76'
  | '2A'
  | '2B'
  | '2C'
  | '2G'
  | '2H'
  | '2I'
  | '2J'
  | '2K'
  | '2L'
  | '2M'
  | '2N'
  | '2P'
  | '2Q'
  | '2R'
  | '2U'
  | '2X'
  | '2Y'
  | '2Z'
  | '3B'
  | '3C'
  | '4C'
  | '4G'
  | '4H'
  | '4K'
  | '4L'
  | '4M'
  | '4N'
  | '4O'
  | '4P'
  | '4Q'
  | '4R'
  | '4T'
  | '4U'
  | '4W'
  | '4X'
  | '5A'
  | '5B'
  | '5E'
  | '5J'
  | 'A10'
  | 'A11'
  | 'A12'
  | 'A13'
  | 'A14'
  | 'A15'
  | 'A16'
  | 'A17'
  | 'A18'
  | 'A19'
  | 'A2'
  | 'A20'
  | 'A21'
  | 'A22'
  | 'A23'
  | 'A24'
  | 'A26'
  | 'A27'
  | 'A28'
  | 'A29'
  | 'A3'
  | 'A30'
  | 'A31'
  | 'A32'
  | 'A33'
  | 'A34'
  | 'A35'
  | 'A36'
  | 'A37'
  | 'A38'
  | 'A39'
  | 'A4'
  | 'A40'
  | 'A41'
  | 'A42'
  | 'A43'
  | 'A44'
  | 'A45'
  | 'A46'
  | 'A47'
  | 'A48'
  | 'A49'
  | 'A5'
  | 'A50'
  | 'A51'
  | 'A52'
  | 'A53'
  | 'A54'
  | 'A55'
  | 'A56'
  | 'A57'
  | 'A58'
  | 'A59'
  | 'A6'
  | 'A60'
  | 'A61'
  | 'A62'
  | 'A63'
  | 'A64'
  | 'A65'
  | 'A66'
  | 'A67'
  | 'A68'
  | 'A69'
  | 'A7'
  | 'A70'
  | 'A71'
  | 'A72'
  | 'A73'
  | 'A74'
  | 'A75'
  | 'A76'
  | 'A77'
  | 'A78'
  | 'A79'
  | 'A8'
  | 'A80'
  | 'A81'
  | 'A82'
  | 'A83'
  | 'A84'
  | 'A85'
  | 'A86'
  | 'A87'
  | 'A88'
  | 'A89'
  | 'A9'
  | 'A90'
  | 'A91'
  | 'A92'
  | 'A93'
  | 'A94'
  | 'A95'
  | 'A96'
  | 'A97'
  | 'A98'
  | 'A99'
  | 'ACR'
  | 'AH'
  | 'AI'
  | 'AK'
  | 'AMH'
  | 'AMT'
  | 'ANN'
  | 'B1'
  | 'B11'
  | 'B12'
  | 'B13'
  | 'B14'
  | 'B15'
  | 'B16'
  | 'B17'
  | 'B18'
  | 'B19'
  | 'B20'
  | 'B21'
  | 'B22'
  | 'B23'
  | 'B24'
  | 'B25'
  | 'B26'
  | 'B27'
  | 'B28'
  | 'B29'
  | 'B3'
  | 'B30'
  | 'B31'
  | 'B32'
  | 'B33'
  | 'B34'
  | 'B35'
  | 'B36'
  | 'B37'
  | 'B38'
  | 'B39'
  | 'B4'
  | 'B40'
  | 'B41'
  | 'B42'
  | 'B43'
  | 'B44'
  | 'B45'
  | 'B46'
  | 'B47'
  | 'B48'
  | 'B49'
  | 'B5'
  | 'B50'
  | 'B52'
  | 'B53'
  | 'B54'
  | 'B55'
  | 'B56'
  | 'B57'
  | 'B58'
  | 'B59'
  | 'B6'
  | 'B60'
  | 'B61'
  | 'B62'
  | 'B63'
  | 'B64'
  | 'B65'
  | 'B66'
  | 'B67'
  | 'B68'
  | 'B69'
  | 'B7'
  | 'B70'
  | 'B71'
  | 'B72'
  | 'B73'
  | 'B74'
  | 'B75'
  | 'B76'
  | 'B77'
  | 'B78'
  | 'B79'
  | 'B8'
  | 'B80'
  | 'B81'
  | 'B82'
  | 'B83'
  | 'B84'
  | 'B85'
  | 'B86'
  | 'B87'
  | 'B88'
  | 'B89'
  | 'B9'
  | 'B90'
  | 'B91'
  | 'B92'
  | 'B93'
  | 'B94'
  | 'B95'
  | 'B96'
  | 'B97'
  | 'B98'
  | 'B99'
  | 'BAR'
  | 'BB'
  | 'BFT'
  | 'BHP'
  | 'BIL'
  | 'BLD'
  | 'BLL'
  | 'BUA'
  | 'BUI'
  | 'C0'
  | 'C10'
  | 'C11'
  | 'C12'
  | 'C13'
  | 'C14'
  | 'C15'
  | 'C16'
  | 'C17'
  | 'C18'
  | 'C19'
  | 'C20'
  | 'C21'
  | 'C22'
  | 'C23'
  | 'C24'
  | 'C25'
  | 'C26'
  | 'C27'
  | 'C28'
  | 'C29'
  | 'C30'
  | 'C31'
  | 'C32'
  | 'C33'
  | 'C34'
  | 'C35'
  | 'C36'
  | 'C37'
  | 'C38'
  | 'C39'
  | 'C40'
  | 'C41'
  | 'C42'
  | 'C43'
  | 'C44'
  | 'C45'
  | 'C46'
  | 'C47'
  | 'C48'
  | 'C49'
  | 'C50'
  | 'C51'
  | 'C52'
  | 'C53'
  | 'C54'
  | 'C55'
  | 'C56'
  | 'C57'
  | 'C58'
  | 'C59'
  | 'C60'
  | 'C61'
  | 'C63'
  | 'C64'
  | 'C65'
  | 'C66'
  | 'C67'
  | 'C68'
  | 'C69'
  | 'C70'
  | 'C71'
  | 'C72'
  | 'C73'
  | 'C74'
  | 'C75'
  | 'C76'
  | 'C77'
  | 'C78'
  | 'C79'
  | 'C80'
  | 'C81'
  | 'C82'
  | 'C83'
  | 'C84'
  | 'C85'
  | 'C86'
  | 'C87'
  | 'C88'
  | 'C89'
  | 'C90'
  | 'C91'
  | 'C92'
  | 'C93'
  | 'C94'
  | 'C95'
  | 'C96'
  | 'C97'
  | 'C98'
  | 'C99'
  | 'CDL'
  | 'CEL'
  | 'CHU'
  | 'CIU'
  | 'CLT'
  | 'CMK'
  | 'CMQ'
  | 'CMT'
  | 'CNP'
  | 'CNT'
  | 'COU'
  | 'CTG'
  | 'CTN'
  | 'CUR'
  | 'CWA'
  | 'CWI'
  | 'DAN'
  | 'DAY'
  | 'DB'
  | 'DD'
  | 'DG'
  | 'DI'
  | 'DLT'
  | 'DMK'
  | 'DMQ'
  | 'DMT'
  | 'DPC'
  | 'DPT'
  | 'DRA'
  | 'DZN'
  | 'DZP'
  | 'FOT'
  | 'GLL'
  | 'GLI'
  | 'GRM'
  | 'GRO'
  | 'HUR'
  | 'HTZ'
  | 'INH'
  | 'KGM'
  | 'KMT'
  | 'MTR'
  | 'SMI'
  | 'MIN'
  | 'MON'
  | 'ONZ'
  | 'PCE'
  | 'LBR'
  | 'QT'
  | 'SEC'
  | 'FTK'
  | 'INK'
  | 'MTK'
  | 'YDK'
  | 'TNE'
  | 'VLT'
  | 'WTT'
  | 'YRD'
  | 'FTQ'
  | 'INQ'
  | 'MTQ'
  | 'YDQ'
  | 'HAR'
  | 'KLT'
  | 'MLT'
  | 'MMT'
  | 'KMK'
  | 'MMK'
  | 'XAA'
  | 'XAB'
  | 'XAC'
  | 'XAD'
  | 'XAE'
  | 'XAF'
  | 'XAG'
  | 'XAH'
  | 'XAI'
  | 'XAJ'
  | 'XAL'
  | 'XAM'
  | 'XAP'
  | 'XAT'
  | 'XAV'
  | 'XB4'
  | 'XBA'
  | 'XBB'
  | 'XBC'
  | 'XBD'
  | 'XBE'
  | 'XBF'
  | 'XBG'
  | 'XBH'
  | 'XBI'
  | 'XBJ'
  | 'XBK'
  | 'XBL'
  | 'XBM'
  | 'XBN'
  | 'XBO'
  | 'XBP'
  | 'XBQ'
  | 'XBR'
  | 'XBS'
  | 'XBT'
  | 'XBU'
  | 'XBV'
  | 'XBW'
  | 'XBX'
  | 'XBY'
  | 'XBZ'
  | 'XCA'
  | 'XCB'
  | 'XCC'
  | 'XCD'
  | 'XCE'
  | 'XCF'
  | 'XCG'
  | 'XCH'
  | 'XCI'
  | 'XCJ'
  | 'XCK'
  | 'XCL'
  | 'XCM'
  | 'XCN'
  | 'XCO'
  | 'XCP'
  | 'XCQ'
  | 'XCR'
  | 'XCS'
  | 'XCT'
  | 'XCU'
  | 'XCV'
  | 'XCW'
  | 'XCX'
  | 'XCY'
  | 'XCZ'
  | 'XDA'
  | 'XDB'
  | 'XDC'
  | 'XDD'
  | 'XDE'
  | 'XDF'
  | 'XDG'
  | 'XDH'
  | 'XDI'
  | 'XDJ'
  | 'XDK'
  | 'XDL'
  | 'XDM'
  | 'XDN'
  | 'XDP'
  | 'XDQ'
  | 'XDR'
  | 'XDS'
  | 'XDT'
  | 'XDU'
  | 'XDV'
  | 'XDW'
  | 'XDX'
  | 'XDY'
  | 'XDZ'
  | 'XEA'
  | 'XEB'
  | 'XEC'
  | 'XED'
  | 'XEE'
  | 'XEF'
  | 'XEG'
  | 'XEH'
  | 'XEI'
  | 'XEJ'
  | 'XEK'
  | 'XEL'
  | 'XEM'
  | 'XEN'
  | 'XEP'
  | 'XEQ'
  | 'XER'
  | 'XES'
  | 'XET'
  | 'XEU'
  | 'XEV'
  | 'XEW'
  | 'XEX'
  | 'XEY'
  | 'XFB'
  | 'XFC'
  | 'XFD'
  | 'XFE'
  | 'XFF'
  | 'XFG'
  | 'XFH'
  | 'XFI'
  | 'XFJ'
  | 'XFK'
  | 'XFL'
  | 'XFM'
  | 'XFN'
  | 'XFO'
  | 'XFP'
  | 'XFQ'
  | 'XFR'
  | 'XFS'
  | 'XFT'
  | 'XFU'
  | 'XFV'
  | 'XFW'
  | 'XFX'
  | 'XFY'
  | 'XFZ'
  | 'XGA'
  | 'XGB'
  | 'XGC'
  | 'XGD'
  | 'XGE'
  | 'XGF'
  | 'XGG'
  | 'XGH'
  | 'XGI'
  | 'XGJ'
  | 'XGK'
  | 'XGL'
  | 'XGM'
  | 'XGN'
  | 'XGO'
  | 'XGP'
  | 'XGQ'
  | 'XGR'
  | 'XGS'
  | 'XGT'
  | 'XGU'
  | 'XGV'
  | 'XGW'
  | 'XGX'
  | 'XGY'
  | 'XGZ'
  | 'XHA'
  | 'XHB'
  | 'XHC'
  | 'XHD'
  | 'XHE'
  | 'XHF'
  | 'XHG'
  | 'XHH'
  | 'XHI'
  | 'XHJ'
  | 'XHK'
  | 'XHL'
  | 'XHM'
  | 'XHN'
  | 'XHP'
  | 'XHQ'
  | 'XHR'
  | 'XHS'
  | 'XHT'
  | 'XHU'
  | 'XHV'
  | 'XHW'
  | 'XHX'
  | 'XHY'
  | 'XHZ'
  | 'XIA'
  | 'XIB'
  | 'XIC'
  | 'XID'
  | 'XIE'
  | 'XIF'
  | 'XIG'
  | 'XIH'
  | 'XII'
  | 'XIJ'
  | 'XIK'
  | 'XIL'
  | 'XIM'
  | 'XIN'
  | 'XIO'
  | 'XJA'
  | 'XJB'
  | 'XJC'
  | 'XJD'
  | 'XJE'
  | 'XJF'
  | 'XJG'
  | 'XJH'
  | 'XJI'
  | 'XJJ'
  | 'XJK'
  | 'XJL'
  | 'XJM'
  | 'XJN'
  | 'XJO'
  | 'XJP'
  | 'XJQ'
  | 'XJR'
  | 'XJS'
  | 'XJT'
  | 'XJU'
  | 'XJV'
  | 'XJW'
  | 'XJX'
  | 'XJY'
  | 'XJZ'
  | 'XLA'
  | 'XLB'
  | 'XLC'
  | 'XLD'
  | 'XLE'
  | 'XLF'
  | 'XLG'
  | 'XLH'
  | 'XLI'
  | 'XLJ'
  | 'XLK'
  | 'XLL'
  | 'XLM'
  | 'XLN'
  | 'XLO'
  | 'XLP'
  | 'XLQ'
  | 'XLR'
  | 'XLS'
  | 'XLT'
  | 'XLU'
  | 'XLV'
  | 'XLW'
  | 'XLX'
  | 'XLY'
  | 'XLZ'
  | 'XMA'
  | 'XMB'
  | 'XMC'
  | 'XMD'
  | 'XME'
  | 'XMF'
  | 'XMG'
  | 'XMH'
  | 'XMI'
  | 'XMJ'
  | 'XMK'
  | 'XML'
  | 'XMM'
  | 'XMN'
  | 'XMO'
  | 'XMP'
  | 'XMQ'
  | 'XMR'
  | 'XMS'
  | 'XMT'
  | 'XMU'
  | 'XMV'
  | 'XMW'
  | 'XMX'
  | 'XMY'
  | 'XMZ'
  | 'XNA'
  | 'XNB'
  | 'XNC'
  | 'XND'
  | 'XNE'
  | 'XNF'
  | 'XNG'
  | 'XNH'
  | 'XNI'
  | 'XNJ'
  | 'XNK'
  | 'XNL'
  | 'XNM'
  | 'XOA'
  | 'XOB'
  | 'XOC'
  | 'XOD'
  | 'XOE'
  | 'XOF'
  | 'XOG'
  | 'XOH'
  | 'XOI'
  | 'XOJ'
  | 'XOK'
  | 'XOL'
  | 'XOM'
  | 'XON'
  | 'XOO'
  | 'XOP'
  | 'XOQ'
  | 'XOR'
  | 'XOS'
  | 'XOT'
  | 'XOU'
  | 'XOV'
  | 'XOW'
  | 'XOX'
  | 'XOY'
  | 'XOZ'
  | 'XP1'
  | 'XP2'
  | 'XP3'
  | 'XP4'
  | 'XPA'
  | 'XPB'
  | 'XPC'
  | 'XPD'
  | 'XPE'
  | 'XPF'
  | 'XPG'
  | 'XPH'
  | 'XPI'
  | 'XPJ'
  | 'XPK'
  | 'XPL'
  | 'XPM'
  | 'XPN'
  | 'XPO'
  | 'XPP'
  | 'XPQ'
  | 'XPR'
  | 'XPS'
  | 'XPT'
  | 'XPU'
  | 'XPV'
  | 'XPW'
  | 'XPX'
  | 'XPY'
  | 'XPZ'
  | 'XQA'
  | 'XQB'
  | 'XQC'
  | 'XQD'
  | 'XQE'
  | 'XQF'
  | 'XQG'
  | 'XQH'
  | 'XQI'
  | 'XQJ'
  | 'XQK'
  | 'XQL'
  | 'XQM'
  | 'XQN'
  | 'XQO'
  | 'XQP'
  | 'XQQ'
  | 'XQR'
  | 'XQS'
  | 'XRD'
  | 'XRE'
  | 'XRF'
  | 'XRG'
  | 'XRH'
  | 'XRI'
  | 'XRJ'
  | 'XRK'
  | 'XRL'
  | 'XRM'
  | 'XRN'
  | 'XRO'
  | 'XRP'
  | 'XRQ'
  | 'XRR'
  | 'XRS'
  | 'XRT'
  | 'XRU'
  | 'XRV'
  | 'XRW'
  | 'XRX'
  | 'XRY'
  | 'XRZ'
  | 'XSA'
  | 'XSB'
  | 'XSC'
  | 'XSD'
  | 'XSE'
  | 'XSF'
  | 'XSG'
  | 'XSH'
  | 'XSI'
  | 'XSJ'
  | 'XSK'
  | 'XSL'
  | 'XSM'
  | 'XSN'
  | 'XSO'
  | 'XSP'
  | 'XSQ'
  | 'XSR'
  | 'XSS'
  | 'XST'
  | 'XSU'
  | 'XSV'
  | 'XSW'
  | 'XSX'
  | 'XSY'
  | 'XSZ'
  | 'XTA'
  | 'XTB'
  | 'XTC'
  | 'XTD'
  | 'XTE'
  | 'XTF'
  | 'XTG'
  | 'XTI'
  | 'XTJ'
  | 'XTK'
  | 'XTL'
  | 'XTM'
  | 'XTN'
  | 'XTO'
  | 'XTR'
  | 'XTS'
  | 'XTT'
  | 'XTU'
  | 'XTV'
  | 'XTW'
  | 'XTX'
  | 'XTY'
  | 'XTZ'
  | 'XUC'
  | 'XUN'
  | 'XVA'
  | 'XVG'
  | 'XVI'
  | 'XVK'
  | 'XVL'
  | 'XVN'
  | 'XVO'
  | 'XVP'
  | 'XVQ'
  | 'XVR'
  | 'XVS'
  | 'XVY'
  | 'XWA'
  | 'XWB'
  | 'XWC'
  | 'XWD'
  | 'XWF'
  | 'XWG'
  | 'XWH'
  | 'XWJ'
  | 'XWK'
  | 'XWL'
  | 'XWM'
  | 'XWN'
  | 'XWP'
  | 'XWQ'
  | 'XWR'
  | 'XWS'
  | 'XWT'
  | 'XWU'
  | 'XWV'
  | 'XWW'
  | 'XWX'
  | 'XWY'
  | 'XWZ'
  | 'XXA'
  | 'XXB'
  | 'XXC'
  | 'XXD'
  | 'XXF'
  | 'XXG'
  | 'XXH'
  | 'XXJ'
  | 'XXK'
  | 'XYA'
  | 'XYB'
  | 'XYC'
  | 'XYD'
  | 'XYF'
  | 'XYG'
  | 'XYH'
  | 'XYJ'
  | 'XYK'
  | 'XYL'
  | 'XYM'
  | 'XYN'
  | 'XYP'
  | 'XYQ'
  | 'XYR'
  | 'XYS'
  | 'XYT'
  | 'XYV'
  | 'XYW'
  | 'XYX'
  | 'XYY'
  | 'XYZ'
  | 'XZA'
  | 'XZB'
  | 'XZC'
  | 'XZD'
  | 'XZF'
  | 'XZG'
  | 'XZH'
  | 'XZJ'
  | 'XZK'
  | 'XZL'
  | 'XZM'
  | 'XZN'
  | 'XZP'
  | 'XZQ'
  | 'XZR'
  | 'XZS'
  | 'XZT'
  | 'XZU'
  | 'XZV'
  | 'XZW'
  | 'XZX'
  | 'XZY'
  | 'XZZ'
  | 'ZZ'
  | 'NAR'
  | 'C62'
  | 'LTR'
  | 'H87';

export interface DocumentDeleteResponse {
  is_deleted: boolean;
}

export interface DocumentCreateFromPdfResponse {
  allowances?: Array<Allowance> | null;

  /**
   * The amount due for payment. Must be positive and rounded to maximum 2 decimals
   */
  amount_due?: string | null;

  attachments?: Array<DocumentAttachmentCreate> | null;

  /**
   * The billing address (if different from customer address)
   */
  billing_address?: string | null;

  /**
   * The recipient name at the billing address
   */
  billing_address_recipient?: string | null;

  charges?: Array<Charge> | null;

  /**
   * Currency of the invoice (ISO 4217 currency code)
   */
  currency?: CurrencyCode;

  /**
   * The address of the customer/buyer
   */
  customer_address?: string | null;

  /**
   * The recipient name at the customer address
   */
  customer_address_recipient?: string | null;

  /**
   * Customer company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  customer_company_id?: string | null;

  /**
   * The email address of the customer
   */
  customer_email?: string | null;

  /**
   * The unique identifier for the customer in your system
   */
  customer_id?: string | null;

  /**
   * The company name of the customer/buyer
   */
  customer_name?: string | null;

  /**
   * Customer tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  customer_tax_id?: string | null;

  /**
   * The direction of the document: INBOUND (purchases) or OUTBOUND (sales)
   */
  direction?: DocumentDirection;

  /**
   * The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE
   */
  document_type?: DocumentType;

  /**
   * The date when payment is due
   */
  due_date?: string | null;

  /**
   * The date when the invoice was issued
   */
  invoice_date?: string | null;

  /**
   * The unique invoice identifier/number
   */
  invoice_id?: string | null;

  /**
   * The total amount of the invoice including tax (invoice_total = subtotal +
   * total_tax + total_discount). Must be positive and rounded to maximum 2 decimals
   */
  invoice_total?: string | null;

  /**
   * At least one line item is required
   */
  items?: Array<DocumentCreateFromPdfResponse.Item>;

  /**
   * Additional notes or comments for the invoice
   */
  note?: string | null;

  payment_details?: Array<PaymentDetailCreate> | null;

  /**
   * The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')
   */
  payment_term?: string | null;

  /**
   * The purchase order reference number
   */
  purchase_order?: string | null;

  /**
   * The address where payment should be sent or remitted to
   */
  remittance_address?: string | null;

  /**
   * The recipient name at the remittance address
   */
  remittance_address_recipient?: string | null;

  /**
   * The address where services were performed or goods were delivered
   */
  service_address?: string | null;

  /**
   * The recipient name at the service address
   */
  service_address_recipient?: string | null;

  /**
   * The end date of the service period or delivery period
   */
  service_end_date?: string | null;

  /**
   * The start date of the service period or delivery period
   */
  service_start_date?: string | null;

  /**
   * The shipping/delivery address
   */
  shipping_address?: string | null;

  /**
   * The recipient name at the shipping address
   */
  shipping_address_recipient?: string | null;

  /**
   * The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED
   */
  state?: InboxAPI.DocumentState;

  /**
   * The taxable base of the invoice. Should be the sum of all line items -
   * allowances (for example commercial discounts) + charges with impact on VAT. Must
   * be positive and rounded to maximum 2 decimals
   */
  subtotal?: string | null;

  /**
   * Whether the PDF was successfully converted into a compliant e-invoice
   */
  success?: boolean;

  /**
   * Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E
   * for exempt)
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  tax_details?: Array<DocumentCreateFromPdfResponse.TaxDetail> | null;

  /**
   * The net financial discount/charge of the invoice (non-VAT charges minus non-VAT
   * allowances). Can be positive (net charge), negative (net discount), or zero.
   * Must be rounded to maximum 2 decimals
   */
  total_discount?: string | null;

  /**
   * The total tax amount of the invoice. Must be positive and rounded to maximum 2
   * decimals
   */
  total_tax?: string | null;

  /**
   * The UBL document as an XML string
   */
  ubl_document?: string | null;

  /**
   * VATEX code list for VAT exemption reasons
   *
   * Agency: CEF Identifier: vatex
   */
  vatex?:
    | 'VATEX-EU-79-C'
    | 'VATEX-EU-132'
    | 'VATEX-EU-132-1A'
    | 'VATEX-EU-132-1B'
    | 'VATEX-EU-132-1C'
    | 'VATEX-EU-132-1D'
    | 'VATEX-EU-132-1E'
    | 'VATEX-EU-132-1F'
    | 'VATEX-EU-132-1G'
    | 'VATEX-EU-132-1H'
    | 'VATEX-EU-132-1I'
    | 'VATEX-EU-132-1J'
    | 'VATEX-EU-132-1K'
    | 'VATEX-EU-132-1L'
    | 'VATEX-EU-132-1M'
    | 'VATEX-EU-132-1N'
    | 'VATEX-EU-132-1O'
    | 'VATEX-EU-132-1P'
    | 'VATEX-EU-132-1Q'
    | 'VATEX-EU-143'
    | 'VATEX-EU-143-1A'
    | 'VATEX-EU-143-1B'
    | 'VATEX-EU-143-1C'
    | 'VATEX-EU-143-1D'
    | 'VATEX-EU-143-1E'
    | 'VATEX-EU-143-1F'
    | 'VATEX-EU-143-1FA'
    | 'VATEX-EU-143-1G'
    | 'VATEX-EU-143-1H'
    | 'VATEX-EU-143-1I'
    | 'VATEX-EU-143-1J'
    | 'VATEX-EU-143-1K'
    | 'VATEX-EU-143-1L'
    | 'VATEX-EU-144'
    | 'VATEX-EU-146-1E'
    | 'VATEX-EU-148'
    | 'VATEX-EU-148-A'
    | 'VATEX-EU-148-B'
    | 'VATEX-EU-148-C'
    | 'VATEX-EU-148-D'
    | 'VATEX-EU-148-E'
    | 'VATEX-EU-148-F'
    | 'VATEX-EU-148-G'
    | 'VATEX-EU-151'
    | 'VATEX-EU-151-1A'
    | 'VATEX-EU-151-1AA'
    | 'VATEX-EU-151-1B'
    | 'VATEX-EU-151-1C'
    | 'VATEX-EU-151-1D'
    | 'VATEX-EU-151-1E'
    | 'VATEX-EU-159'
    | 'VATEX-EU-309'
    | 'VATEX-EU-AE'
    | 'VATEX-EU-D'
    | 'VATEX-EU-F'
    | 'VATEX-EU-G'
    | 'VATEX-EU-I'
    | 'VATEX-EU-IC'
    | 'VATEX-EU-O'
    | 'VATEX-EU-J'
    | 'VATEX-FR-FRANCHISE'
    | 'VATEX-FR-CNWVAT'
    | null;

  /**
   * Textual explanation for VAT exemption
   */
  vatex_note?: string | null;

  /**
   * The address of the vendor/seller
   */
  vendor_address?: string | null;

  /**
   * The recipient name at the vendor address
   */
  vendor_address_recipient?: string | null;

  /**
   * Vendor company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  vendor_company_id?: string | null;

  /**
   * The email address of the vendor
   */
  vendor_email?: string | null;

  /**
   * The name of the vendor/seller/supplier
   */
  vendor_name?: string | null;

  /**
   * Vendor tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  vendor_tax_id?: string | null;
}

export namespace DocumentCreateFromPdfResponse {
  export interface Item {
    /**
     * The allowances of the line item.
     */
    allowances?: Array<DocumentsAPI.Allowance> | null;

    /**
     * The invoice line net amount (BT-131), exclusive of VAT, inclusive of line level
     * allowances and charges. Calculated as: ((unit_price / price_base_quantity) \*
     * quantity) - allowances + charges. Must be rounded to maximum 2 decimals. Can be
     * negative for credit notes or corrections.
     */
    amount?: string | null;

    /**
     * The charges of the line item.
     */
    charges?: Array<DocumentsAPI.Charge> | null;

    date?: null;

    /**
     * The description of the line item.
     */
    description?: string | null;

    /**
     * The product code of the line item.
     */
    product_code?: string | null;

    /**
     * The quantity of items (goods or services) that is the subject of the line item.
     * Must be rounded to maximum 4 decimals. Can be negative for credit notes or
     * corrections.
     */
    quantity?: string | null;

    /**
     * The total VAT amount for the line item. Must be rounded to maximum 2 decimals.
     * Can be negative for credit notes or corrections.
     */
    tax?: string | null;

    /**
     * The VAT rate of the line item expressed as percentage with 2 decimals
     */
    tax_rate?: string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    /**
     * The item net price (BT-146). The price of an item, exclusive of VAT, after
     * subtracting item price discount. Must be rounded to maximum 4 decimals
     */
    unit_price?: string | null;
  }

  export interface TaxDetail {
    /**
     * The tax amount for this tax category. Must be rounded to maximum 2 decimals
     */
    amount?: string | null;

    /**
     * The tax rate as a percentage (e.g., '21.00', '6.00', '0.00')
     */
    rate?: string | null;
  }
}

export interface DocumentCreateParams {
  allowances?: Array<DocumentCreateParams.Allowance> | null;

  /**
   * The amount due for payment. Must be positive and rounded to maximum 2 decimals
   */
  amount_due?: number | string | null;

  attachments?: Array<DocumentAttachmentCreate> | null;

  /**
   * The billing address (if different from customer address)
   */
  billing_address?: string | null;

  /**
   * The recipient name at the billing address
   */
  billing_address_recipient?: string | null;

  charges?: Array<DocumentCreateParams.Charge> | null;

  /**
   * Currency of the invoice (ISO 4217 currency code)
   */
  currency?: CurrencyCode;

  /**
   * The address of the customer/buyer
   */
  customer_address?: string | null;

  /**
   * The recipient name at the customer address
   */
  customer_address_recipient?: string | null;

  /**
   * Customer company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  customer_company_id?: string | null;

  /**
   * The email address of the customer
   */
  customer_email?: string | null;

  /**
   * The unique identifier for the customer in your system
   */
  customer_id?: string | null;

  /**
   * The company name of the customer/buyer
   */
  customer_name?: string | null;

  /**
   * Customer tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  customer_tax_id?: string | null;

  /**
   * The direction of the document: INBOUND (purchases) or OUTBOUND (sales)
   */
  direction?: DocumentDirection;

  /**
   * The type of document: INVOICE, CREDIT_NOTE, or DEBIT_NOTE
   */
  document_type?: DocumentType;

  /**
   * The date when payment is due
   */
  due_date?: string | null;

  /**
   * The date when the invoice was issued
   */
  invoice_date?: string | null;

  /**
   * The unique invoice identifier/number
   */
  invoice_id?: string | null;

  /**
   * The total amount of the invoice including tax (invoice_total = subtotal +
   * total_tax + total_discount). Must be positive and rounded to maximum 2 decimals
   */
  invoice_total?: number | string | null;

  /**
   * At least one line item is required
   */
  items?: Array<DocumentCreateParams.Item>;

  /**
   * Additional notes or comments for the invoice
   */
  note?: string | null;

  payment_details?: Array<PaymentDetailCreate> | null;

  /**
   * The payment terms (e.g., 'Net 30', 'Due on receipt', '2/10 Net 30')
   */
  payment_term?: string | null;

  /**
   * The previous unpaid balance from prior invoices, if any. Must be positive and
   * rounded to maximum 2 decimals
   */
  previous_unpaid_balance?: number | string | null;

  /**
   * The purchase order reference number
   */
  purchase_order?: string | null;

  /**
   * The address where payment should be sent or remitted to
   */
  remittance_address?: string | null;

  /**
   * The recipient name at the remittance address
   */
  remittance_address_recipient?: string | null;

  /**
   * The address where services were performed or goods were delivered
   */
  service_address?: string | null;

  /**
   * The recipient name at the service address
   */
  service_address_recipient?: string | null;

  /**
   * The end date of the service period or delivery period
   */
  service_end_date?: string | null;

  /**
   * The start date of the service period or delivery period
   */
  service_start_date?: string | null;

  /**
   * The shipping/delivery address
   */
  shipping_address?: string | null;

  /**
   * The recipient name at the shipping address
   */
  shipping_address_recipient?: string | null;

  /**
   * The current state of the document: DRAFT, TRANSIT, FAILED, SENT, or RECEIVED
   */
  state?: InboxAPI.DocumentState;

  /**
   * The taxable base of the invoice. Should be the sum of all line items -
   * allowances (for example commercial discounts) + charges with impact on VAT. Must
   * be positive and rounded to maximum 2 decimals
   */
  subtotal?: number | string | null;

  /**
   * Tax category code of the invoice (e.g., S for standard rate, Z for zero rate, E
   * for exempt)
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  tax_details?: Array<DocumentCreateParams.TaxDetail> | null;

  /**
   * The net financial discount/charge of the invoice (non-VAT charges minus non-VAT
   * allowances). Can be positive (net charge), negative (net discount), or zero.
   * Must be rounded to maximum 2 decimals
   */
  total_discount?: number | string | null;

  /**
   * The total tax amount of the invoice. Must be positive and rounded to maximum 2
   * decimals
   */
  total_tax?: number | string | null;

  /**
   * VATEX code list for VAT exemption reasons
   *
   * Agency: CEF Identifier: vatex
   */
  vatex?:
    | 'VATEX-EU-79-C'
    | 'VATEX-EU-132'
    | 'VATEX-EU-132-1A'
    | 'VATEX-EU-132-1B'
    | 'VATEX-EU-132-1C'
    | 'VATEX-EU-132-1D'
    | 'VATEX-EU-132-1E'
    | 'VATEX-EU-132-1F'
    | 'VATEX-EU-132-1G'
    | 'VATEX-EU-132-1H'
    | 'VATEX-EU-132-1I'
    | 'VATEX-EU-132-1J'
    | 'VATEX-EU-132-1K'
    | 'VATEX-EU-132-1L'
    | 'VATEX-EU-132-1M'
    | 'VATEX-EU-132-1N'
    | 'VATEX-EU-132-1O'
    | 'VATEX-EU-132-1P'
    | 'VATEX-EU-132-1Q'
    | 'VATEX-EU-143'
    | 'VATEX-EU-143-1A'
    | 'VATEX-EU-143-1B'
    | 'VATEX-EU-143-1C'
    | 'VATEX-EU-143-1D'
    | 'VATEX-EU-143-1E'
    | 'VATEX-EU-143-1F'
    | 'VATEX-EU-143-1FA'
    | 'VATEX-EU-143-1G'
    | 'VATEX-EU-143-1H'
    | 'VATEX-EU-143-1I'
    | 'VATEX-EU-143-1J'
    | 'VATEX-EU-143-1K'
    | 'VATEX-EU-143-1L'
    | 'VATEX-EU-144'
    | 'VATEX-EU-146-1E'
    | 'VATEX-EU-148'
    | 'VATEX-EU-148-A'
    | 'VATEX-EU-148-B'
    | 'VATEX-EU-148-C'
    | 'VATEX-EU-148-D'
    | 'VATEX-EU-148-E'
    | 'VATEX-EU-148-F'
    | 'VATEX-EU-148-G'
    | 'VATEX-EU-151'
    | 'VATEX-EU-151-1A'
    | 'VATEX-EU-151-1AA'
    | 'VATEX-EU-151-1B'
    | 'VATEX-EU-151-1C'
    | 'VATEX-EU-151-1D'
    | 'VATEX-EU-151-1E'
    | 'VATEX-EU-159'
    | 'VATEX-EU-309'
    | 'VATEX-EU-AE'
    | 'VATEX-EU-D'
    | 'VATEX-EU-F'
    | 'VATEX-EU-G'
    | 'VATEX-EU-I'
    | 'VATEX-EU-IC'
    | 'VATEX-EU-O'
    | 'VATEX-EU-J'
    | 'VATEX-FR-FRANCHISE'
    | 'VATEX-FR-CNWVAT'
    | null;

  /**
   * Textual explanation for VAT exemption
   */
  vatex_note?: string | null;

  /**
   * The address of the vendor/seller
   */
  vendor_address?: string | null;

  /**
   * The recipient name at the vendor address
   */
  vendor_address_recipient?: string | null;

  /**
   * Vendor company ID. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number. In the Netherlands this is the KVK number.
   */
  vendor_company_id?: string | null;

  /**
   * The email address of the vendor
   */
  vendor_email?: string | null;

  /**
   * The name of the vendor/seller/supplier
   */
  vendor_name?: string | null;

  /**
   * Vendor tax ID. For Belgium this is the VAT number. Must include the country
   * prefix
   */
  vendor_tax_id?: string | null;
}

export namespace DocumentCreateParams {
  /**
   * An allowance is a discount for example for early payment, volume discount, etc.
   */
  export interface Allowance {
    /**
     * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The base amount that may be used, in conjunction with the allowance percentage,
     * to calculate the allowance amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: number | string | null;

    /**
     * The percentage that may be used, in conjunction with the allowance base amount,
     * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
     * to maximum 2 decimals
     */
    multiplier_factor?: number | string | null;

    /**
     * The reason for the allowance
     */
    reason?: string | null;

    /**
     * Allowance reason codes for invoice discounts and charges
     */
    reason_code?:
      | '41'
      | '42'
      | '60'
      | '62'
      | '63'
      | '64'
      | '65'
      | '66'
      | '67'
      | '68'
      | '70'
      | '71'
      | '88'
      | '95'
      | '100'
      | '102'
      | '103'
      | '104'
      | '105'
      | null;

    /**
     * The VAT category code that applies to the allowance
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

    /**
     * The VAT rate, represented as percentage that applies to the allowance. Must be
     * rounded to maximum 2 decimals
     */
    tax_rate?: number | string | null;
  }

  /**
   * A charge is an additional fee for example for late payment, late delivery, etc.
   */
  export interface Charge {
    /**
     * The charge amount, without VAT. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The base amount that may be used, in conjunction with the charge percentage, to
     * calculate the charge amount. Must be rounded to maximum 2 decimals
     */
    base_amount?: number | string | null;

    /**
     * The percentage that may be used, in conjunction with the charge base amount, to
     * calculate the charge amount. To state 20%, use value 20
     */
    multiplier_factor?: number | string | null;

    /**
     * The reason for the charge
     */
    reason?: string | null;

    /**
     * Charge reason codes for invoice charges and fees
     */
    reason_code?:
      | 'AA'
      | 'AAA'
      | 'AAC'
      | 'AAD'
      | 'AAE'
      | 'AAF'
      | 'AAH'
      | 'AAI'
      | 'AAS'
      | 'AAT'
      | 'AAV'
      | 'AAY'
      | 'AAZ'
      | 'ABA'
      | 'ABB'
      | 'ABC'
      | 'ABD'
      | 'ABF'
      | 'ABK'
      | 'ABL'
      | 'ABN'
      | 'ABR'
      | 'ABS'
      | 'ABT'
      | 'ABU'
      | 'ACF'
      | 'ACG'
      | 'ACH'
      | 'ACI'
      | 'ACJ'
      | 'ACK'
      | 'ACL'
      | 'ACM'
      | 'ACS'
      | 'ADC'
      | 'ADE'
      | 'ADJ'
      | 'ADK'
      | 'ADL'
      | 'ADM'
      | 'ADN'
      | 'ADO'
      | 'ADP'
      | 'ADQ'
      | 'ADR'
      | 'ADT'
      | 'ADW'
      | 'ADY'
      | 'ADZ'
      | 'AEA'
      | 'AEB'
      | 'AEC'
      | 'AED'
      | 'AEF'
      | 'AEH'
      | 'AEI'
      | 'AEJ'
      | 'AEK'
      | 'AEL'
      | 'AEM'
      | 'AEN'
      | 'AEO'
      | 'AEP'
      | 'AES'
      | 'AET'
      | 'AEU'
      | 'AEV'
      | 'AEW'
      | 'AEX'
      | 'AEY'
      | 'AEZ'
      | 'AJ'
      | 'AU'
      | 'CA'
      | 'CAB'
      | 'CAD'
      | 'CAE'
      | 'CAF'
      | 'CAI'
      | 'CAJ'
      | 'CAK'
      | 'CAL'
      | 'CAM'
      | 'CAN'
      | 'CAO'
      | 'CAP'
      | 'CAQ'
      | 'CAR'
      | 'CAS'
      | 'CAT'
      | 'CAU'
      | 'CAV'
      | 'CAW'
      | 'CAX'
      | 'CAY'
      | 'CAZ'
      | 'CD'
      | 'CG'
      | 'CS'
      | 'CT'
      | 'DAB'
      | 'DAC'
      | 'DAD'
      | 'DAF'
      | 'DAG'
      | 'DAH'
      | 'DAI'
      | 'DAJ'
      | 'DAK'
      | 'DAL'
      | 'DAM'
      | 'DAN'
      | 'DAO'
      | 'DAP'
      | 'DAQ'
      | 'DL'
      | 'EG'
      | 'EP'
      | 'ER'
      | 'FAA'
      | 'FAB'
      | 'FAC'
      | 'FC'
      | 'FH'
      | 'FI'
      | 'GAA'
      | 'HAA'
      | 'HD'
      | 'HH'
      | 'IAA'
      | 'IAB'
      | 'ID'
      | 'IF'
      | 'IR'
      | 'IS'
      | 'KO'
      | 'L1'
      | 'LA'
      | 'LAA'
      | 'LAB'
      | 'LF'
      | 'MAE'
      | 'MI'
      | 'ML'
      | 'NAA'
      | 'OA'
      | 'PA'
      | 'PAA'
      | 'PC'
      | 'PL'
      | 'PRV'
      | 'RAB'
      | 'RAC'
      | 'RAD'
      | 'RAF'
      | 'RE'
      | 'RF'
      | 'RH'
      | 'RV'
      | 'SA'
      | 'SAA'
      | 'SAD'
      | 'SAE'
      | 'SAI'
      | 'SG'
      | 'SH'
      | 'SM'
      | 'SU'
      | 'TAB'
      | 'TAC'
      | 'TT'
      | 'TV'
      | 'V1'
      | 'V2'
      | 'WH'
      | 'XAA'
      | 'YY'
      | 'ZZZ'
      | null;

    /**
     * Duty or tax or fee category codes (Subset of UNCL5305)
     *
     * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
     */
    tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

    /**
     * The VAT rate, represented as percentage that applies to the charge
     */
    tax_rate?: number | string | null;
  }

  export interface Item {
    /**
     * The allowances of the line item.
     */
    allowances?: Array<Item.Allowance> | null;

    /**
     * The invoice line net amount (BT-131), exclusive of VAT, inclusive of line level
     * allowances and charges. Calculated as: ((unit_price / price_base_quantity) \*
     * quantity) - allowances + charges. Must be rounded to maximum 2 decimals. Can be
     * negative for credit notes or corrections.
     */
    amount?: number | string | null;

    /**
     * The charges of the line item.
     */
    charges?: Array<Item.Charge> | null;

    date?: null;

    /**
     * The description of the line item.
     */
    description?: string | null;

    /**
     * The product code of the line item.
     */
    product_code?: string | null;

    /**
     * The quantity of items (goods or services) that is the subject of the line item.
     * Must be rounded to maximum 4 decimals. Can be negative for credit notes or
     * corrections.
     */
    quantity?: number | string | null;

    /**
     * The total VAT amount for the line item. Must be rounded to maximum 2 decimals.
     * Can be negative for credit notes or corrections.
     */
    tax?: number | string | null;

    /**
     * The VAT rate of the line item expressed as percentage with 2 decimals
     */
    tax_rate?: number | string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    /**
     * The item net price (BT-146). The price of an item, exclusive of VAT, after
     * subtracting item price discount. Must be rounded to maximum 4 decimals
     */
    unit_price?: number | string | null;
  }

  export namespace Item {
    /**
     * An allowance is a discount for example for early payment, volume discount, etc.
     */
    export interface Allowance {
      /**
       * The allowance amount, without VAT. Must be rounded to maximum 2 decimals
       */
      amount?: number | string | null;

      /**
       * The base amount that may be used, in conjunction with the allowance percentage,
       * to calculate the allowance amount. Must be rounded to maximum 2 decimals
       */
      base_amount?: number | string | null;

      /**
       * The percentage that may be used, in conjunction with the allowance base amount,
       * to calculate the allowance amount. To state 20%, use value 20. Must be rounded
       * to maximum 2 decimals
       */
      multiplier_factor?: number | string | null;

      /**
       * The reason for the allowance
       */
      reason?: string | null;

      /**
       * Allowance reason codes for invoice discounts and charges
       */
      reason_code?:
        | '41'
        | '42'
        | '60'
        | '62'
        | '63'
        | '64'
        | '65'
        | '66'
        | '67'
        | '68'
        | '70'
        | '71'
        | '88'
        | '95'
        | '100'
        | '102'
        | '103'
        | '104'
        | '105'
        | null;

      /**
       * The VAT category code that applies to the allowance
       */
      tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

      /**
       * The VAT rate, represented as percentage that applies to the allowance. Must be
       * rounded to maximum 2 decimals
       */
      tax_rate?: number | string | null;
    }

    /**
     * A charge is an additional fee for example for late payment, late delivery, etc.
     */
    export interface Charge {
      /**
       * The charge amount, without VAT. Must be rounded to maximum 2 decimals
       */
      amount?: number | string | null;

      /**
       * The base amount that may be used, in conjunction with the charge percentage, to
       * calculate the charge amount. Must be rounded to maximum 2 decimals
       */
      base_amount?: number | string | null;

      /**
       * The percentage that may be used, in conjunction with the charge base amount, to
       * calculate the charge amount. To state 20%, use value 20
       */
      multiplier_factor?: number | string | null;

      /**
       * The reason for the charge
       */
      reason?: string | null;

      /**
       * Charge reason codes for invoice charges and fees
       */
      reason_code?:
        | 'AA'
        | 'AAA'
        | 'AAC'
        | 'AAD'
        | 'AAE'
        | 'AAF'
        | 'AAH'
        | 'AAI'
        | 'AAS'
        | 'AAT'
        | 'AAV'
        | 'AAY'
        | 'AAZ'
        | 'ABA'
        | 'ABB'
        | 'ABC'
        | 'ABD'
        | 'ABF'
        | 'ABK'
        | 'ABL'
        | 'ABN'
        | 'ABR'
        | 'ABS'
        | 'ABT'
        | 'ABU'
        | 'ACF'
        | 'ACG'
        | 'ACH'
        | 'ACI'
        | 'ACJ'
        | 'ACK'
        | 'ACL'
        | 'ACM'
        | 'ACS'
        | 'ADC'
        | 'ADE'
        | 'ADJ'
        | 'ADK'
        | 'ADL'
        | 'ADM'
        | 'ADN'
        | 'ADO'
        | 'ADP'
        | 'ADQ'
        | 'ADR'
        | 'ADT'
        | 'ADW'
        | 'ADY'
        | 'ADZ'
        | 'AEA'
        | 'AEB'
        | 'AEC'
        | 'AED'
        | 'AEF'
        | 'AEH'
        | 'AEI'
        | 'AEJ'
        | 'AEK'
        | 'AEL'
        | 'AEM'
        | 'AEN'
        | 'AEO'
        | 'AEP'
        | 'AES'
        | 'AET'
        | 'AEU'
        | 'AEV'
        | 'AEW'
        | 'AEX'
        | 'AEY'
        | 'AEZ'
        | 'AJ'
        | 'AU'
        | 'CA'
        | 'CAB'
        | 'CAD'
        | 'CAE'
        | 'CAF'
        | 'CAI'
        | 'CAJ'
        | 'CAK'
        | 'CAL'
        | 'CAM'
        | 'CAN'
        | 'CAO'
        | 'CAP'
        | 'CAQ'
        | 'CAR'
        | 'CAS'
        | 'CAT'
        | 'CAU'
        | 'CAV'
        | 'CAW'
        | 'CAX'
        | 'CAY'
        | 'CAZ'
        | 'CD'
        | 'CG'
        | 'CS'
        | 'CT'
        | 'DAB'
        | 'DAC'
        | 'DAD'
        | 'DAF'
        | 'DAG'
        | 'DAH'
        | 'DAI'
        | 'DAJ'
        | 'DAK'
        | 'DAL'
        | 'DAM'
        | 'DAN'
        | 'DAO'
        | 'DAP'
        | 'DAQ'
        | 'DL'
        | 'EG'
        | 'EP'
        | 'ER'
        | 'FAA'
        | 'FAB'
        | 'FAC'
        | 'FC'
        | 'FH'
        | 'FI'
        | 'GAA'
        | 'HAA'
        | 'HD'
        | 'HH'
        | 'IAA'
        | 'IAB'
        | 'ID'
        | 'IF'
        | 'IR'
        | 'IS'
        | 'KO'
        | 'L1'
        | 'LA'
        | 'LAA'
        | 'LAB'
        | 'LF'
        | 'MAE'
        | 'MI'
        | 'ML'
        | 'NAA'
        | 'OA'
        | 'PA'
        | 'PAA'
        | 'PC'
        | 'PL'
        | 'PRV'
        | 'RAB'
        | 'RAC'
        | 'RAD'
        | 'RAF'
        | 'RE'
        | 'RF'
        | 'RH'
        | 'RV'
        | 'SA'
        | 'SAA'
        | 'SAD'
        | 'SAE'
        | 'SAI'
        | 'SG'
        | 'SH'
        | 'SM'
        | 'SU'
        | 'TAB'
        | 'TAC'
        | 'TT'
        | 'TV'
        | 'V1'
        | 'V2'
        | 'WH'
        | 'XAA'
        | 'YY'
        | 'ZZZ'
        | null;

      /**
       * Duty or tax or fee category codes (Subset of UNCL5305)
       *
       * Agency: UN/CEFACT Version: D.16B Subset: OpenPEPPOL
       */
      tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B' | null;

      /**
       * The VAT rate, represented as percentage that applies to the charge
       */
      tax_rate?: number | string | null;
    }
  }

  export interface TaxDetail {
    /**
     * The tax amount for this tax category. Must be rounded to maximum 2 decimals
     */
    amount?: number | string | null;

    /**
     * The tax rate as a percentage (e.g., '21.00', '6.00', '0.00')
     */
    rate?: string | null;
  }
}

export interface DocumentCreateFromPdfParams {
  /**
   * Body param:
   */
  file: Uploadable;

  /**
   * Query param:
   */
  customer_tax_id?: string | null;

  /**
   * Query param:
   */
  vendor_tax_id?: string | null;
}

export interface DocumentSendParams {
  email?: string | null;

  receiver_peppol_id?: string | null;

  receiver_peppol_scheme?: string | null;

  sender_peppol_id?: string | null;

  sender_peppol_scheme?: string | null;
}

Documents.Attachments = Attachments;
Documents.Ubl = Ubl;

export declare namespace Documents {
  export {
    type Allowance as Allowance,
    type Charge as Charge,
    type CurrencyCode as CurrencyCode,
    type DocumentAttachmentCreate as DocumentAttachmentCreate,
    type DocumentCreate as DocumentCreate,
    type DocumentDirection as DocumentDirection,
    type DocumentResponse as DocumentResponse,
    type DocumentType as DocumentType,
    type PaymentDetailCreate as PaymentDetailCreate,
    type UnitOfMeasureCode as UnitOfMeasureCode,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentCreateFromPdfResponse as DocumentCreateFromPdfResponse,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentCreateFromPdfParams as DocumentCreateFromPdfParams,
    type DocumentSendParams as DocumentSendParams,
  };

  export {
    Attachments as Attachments,
    type DocumentAttachment as DocumentAttachment,
    type AttachmentListResponse as AttachmentListResponse,
    type AttachmentDeleteResponse as AttachmentDeleteResponse,
    type AttachmentRetrieveParams as AttachmentRetrieveParams,
    type AttachmentDeleteParams as AttachmentDeleteParams,
    type AttachmentAddParams as AttachmentAddParams,
  };

  export {
    Ubl as Ubl,
    type UblGetResponse as UblGetResponse,
    type UblCreateFromUblParams as UblCreateFromUblParams,
  };
}
