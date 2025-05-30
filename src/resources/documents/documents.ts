// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from './documents';
import * as InboxAPI from '../inbox';
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
import { Ubl, UblGetResponse } from './ubl';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
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

  file_data?: string | null;

  file_size?: number;

  file_type?: string;
}

export interface DocumentCreate {
  amount_due?: number | string | null;

  attachments?: Array<DocumentAttachmentCreate> | null;

  billing_address?: string | null;

  billing_address_recipient?: string | null;

  /**
   * Currency of the invoice
   */
  currency?: CurrencyCode;

  customer_address?: string | null;

  customer_address_recipient?: string | null;

  customer_email?: string | null;

  customer_id?: string | null;

  customer_name?: string | null;

  customer_tax_id?: string | null;

  direction?: DocumentDirection;

  document_type?: DocumentType;

  due_date?: string | null;

  invoice_date?: string | null;

  invoice_id?: string | null;

  invoice_total?: number | string | null;

  items?: Array<DocumentCreate.Item> | null;

  note?: string | null;

  payment_details?: Array<PaymentDetailCreate> | null;

  payment_term?: string | null;

  previous_unpaid_balance?: number | string | null;

  purchase_order?: string | null;

  remittance_address?: string | null;

  remittance_address_recipient?: string | null;

  service_address?: string | null;

  service_address_recipient?: string | null;

  service_end_date?: string | null;

  service_start_date?: string | null;

  shipping_address?: string | null;

  shipping_address_recipient?: string | null;

  state?: InboxAPI.DocumentState;

  subtotal?: number | string | null;

  tax_details?: Array<DocumentCreate.TaxDetail> | null;

  total_discount?: number | string | null;

  total_tax?: number | string | null;

  vendor_address?: string | null;

  vendor_address_recipient?: string | null;

  vendor_email?: string | null;

  vendor_name?: string | null;

  vendor_tax_id?: string | null;
}

export namespace DocumentCreate {
  export interface Item {
    amount?: number | string | null;

    date?: null;

    description?: string | null;

    product_code?: string | null;

    quantity?: number | string | null;

    tax?: number | string | null;

    tax_rate?: string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    unit_price?: number | string | null;
  }

  export interface TaxDetail {
    amount?: number | string | null;

    rate?: string | null;
  }
}

export type DocumentDirection = 'INBOUND' | 'OUTBOUND';

export interface DocumentResponse {
  id: string;

  amount_due?: string | null;

  attachments?: Array<AttachmentsAPI.DocumentAttachment>;

  billing_address?: string | null;

  billing_address_recipient?: string | null;

  /**
   * Currency of the invoice
   */
  currency?: CurrencyCode;

  customer_address?: string | null;

  customer_address_recipient?: string | null;

  customer_email?: string | null;

  customer_id?: string | null;

  customer_name?: string | null;

  customer_tax_id?: string | null;

  direction?: DocumentDirection;

  document_type?: DocumentType;

  due_date?: string | null;

  invoice_date?: string | null;

  invoice_id?: string | null;

  invoice_total?: string | null;

  items?: Array<DocumentResponse.Item>;

  note?: string | null;

  payment_details?: Array<DocumentResponse.PaymentDetail>;

  payment_term?: string | null;

  previous_unpaid_balance?: string | null;

  purchase_order?: string | null;

  remittance_address?: string | null;

  remittance_address_recipient?: string | null;

  service_address?: string | null;

  service_address_recipient?: string | null;

  service_end_date?: string | null;

  service_start_date?: string | null;

  shipping_address?: string | null;

  shipping_address_recipient?: string | null;

  state?: InboxAPI.DocumentState;

  subtotal?: string | null;

  tax_details?: Array<DocumentResponse.TaxDetail>;

  total_discount?: string | null;

  total_tax?: string | null;

  vendor_address?: string | null;

  vendor_address_recipient?: string | null;

  vendor_email?: string | null;

  vendor_name?: string | null;

  vendor_tax_id?: string | null;
}

export namespace DocumentResponse {
  export interface Item {
    amount?: string | null;

    date?: null;

    description?: string | null;

    product_code?: string | null;

    quantity?: string | null;

    tax?: string | null;

    tax_rate?: string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    unit_price?: string | null;
  }

  export interface PaymentDetail {
    bank_account_number?: string | null;

    iban?: string | null;

    payment_reference?: string | null;

    swift?: string | null;
  }

  export interface TaxDetail {
    amount?: string | null;

    rate?: string | null;
  }
}

export type DocumentType = 'INVOICE' | 'CREDIT_NOTE';

export interface PaymentDetailCreate {
  bank_account_number?: string | null;

  iban?: string | null;

  payment_reference?: string | null;

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
  | 'ZZ'
  | 'NAR'
  | 'C62';

export interface DocumentDeleteResponse {
  is_deleted: boolean;
}

export interface DocumentCreateParams {
  amount_due?: number | string | null;

  attachments?: Array<DocumentAttachmentCreate> | null;

  billing_address?: string | null;

  billing_address_recipient?: string | null;

  /**
   * Currency of the invoice
   */
  currency?: CurrencyCode;

  customer_address?: string | null;

  customer_address_recipient?: string | null;

  customer_email?: string | null;

  customer_id?: string | null;

  customer_name?: string | null;

  customer_tax_id?: string | null;

  direction?: DocumentDirection;

  document_type?: DocumentType;

  due_date?: string | null;

  invoice_date?: string | null;

  invoice_id?: string | null;

  invoice_total?: number | string | null;

  items?: Array<DocumentCreateParams.Item> | null;

  note?: string | null;

  payment_details?: Array<PaymentDetailCreate> | null;

  payment_term?: string | null;

  previous_unpaid_balance?: number | string | null;

  purchase_order?: string | null;

  remittance_address?: string | null;

  remittance_address_recipient?: string | null;

  service_address?: string | null;

  service_address_recipient?: string | null;

  service_end_date?: string | null;

  service_start_date?: string | null;

  shipping_address?: string | null;

  shipping_address_recipient?: string | null;

  state?: InboxAPI.DocumentState;

  subtotal?: number | string | null;

  tax_details?: Array<DocumentCreateParams.TaxDetail> | null;

  total_discount?: number | string | null;

  total_tax?: number | string | null;

  vendor_address?: string | null;

  vendor_address_recipient?: string | null;

  vendor_email?: string | null;

  vendor_name?: string | null;

  vendor_tax_id?: string | null;
}

export namespace DocumentCreateParams {
  export interface Item {
    amount?: number | string | null;

    date?: null;

    description?: string | null;

    product_code?: string | null;

    quantity?: number | string | null;

    tax?: number | string | null;

    tax_rate?: string | null;

    /**
     * Unit of Measure Codes from UNECERec20 used in Peppol BIS Billing 3.0.
     */
    unit?: DocumentsAPI.UnitOfMeasureCode | null;

    unit_price?: number | string | null;
  }

  export interface TaxDetail {
    amount?: number | string | null;

    rate?: string | null;
  }
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
    type CurrencyCode as CurrencyCode,
    type DocumentAttachmentCreate as DocumentAttachmentCreate,
    type DocumentCreate as DocumentCreate,
    type DocumentDirection as DocumentDirection,
    type DocumentResponse as DocumentResponse,
    type DocumentType as DocumentType,
    type PaymentDetailCreate as PaymentDetailCreate,
    type UnitOfMeasureCode as UnitOfMeasureCode,
    type DocumentDeleteResponse as DocumentDeleteResponse,
    type DocumentCreateParams as DocumentCreateParams,
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

  export { Ubl as Ubl, type UblGetResponse as UblGetResponse };
}
