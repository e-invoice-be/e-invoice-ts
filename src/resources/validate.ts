// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxAPI from './inbox';
import * as DocumentsAPI from './documents/documents';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';

export class Validate extends APIResource {
  /**
   * Validate if the JSON document can be converted to a valid UBL document
   */
  validateJson(
    body: ValidateValidateJsonParams,
    options?: RequestOptions,
  ): APIPromise<UblDocumentValidation> {
    return this._client.post('/api/validate/json', { body, ...options });
  }

  /**
   * Validate if a Peppol ID exists in the Peppol network and retrieve supported
   * document types. The peppol_id must be in the form of `<scheme>:<id>`. The scheme
   * is a 4-digit code representing the identifier scheme, and the id is the actual
   * identifier value. For example, for a Belgian company it is `0208:0123456789`
   * (where 0208 is the scheme for Belgian enterprises, followed by the 10 digits of
   * the official BTW / KBO number).
   */
  validatePeppolID(
    query: ValidateValidatePeppolIDParams,
    options?: RequestOptions,
  ): APIPromise<ValidateValidatePeppolIDResponse> {
    return this._client.get('/api/validate/peppol-id', { query, ...options });
  }

  /**
   * Validate the correctness of a UBL document
   */
  validateUbl(body: ValidateValidateUblParams, options?: RequestOptions): APIPromise<UblDocumentValidation> {
    return this._client.post(
      '/api/validate/ubl',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface UblDocumentValidation {
  id: string;

  file_name: string | null;

  is_valid: boolean;

  issues: Array<UblDocumentValidation.Issue>;

  ubl_document?: string | null;
}

export namespace UblDocumentValidation {
  export interface Issue {
    message: string;

    schematron: string;

    type: 'error' | 'warning';

    flag?: string | null;

    location?: string | null;

    rule_id?: string | null;

    test?: string | null;
  }
}

/**
 * Response for a Peppol ID validation request.
 *
 * This model represents the validation result of a Peppol ID in the Peppol
 * network, including whether the ID is valid and what document types it supports.
 */
export interface ValidateValidatePeppolIDResponse {
  /**
   * Business card information for the Peppol ID
   */
  business_card: ValidateValidatePeppolIDResponse.BusinessCard | null;

  /**
   * Whether a business card is set at the SMP
   */
  business_card_valid: boolean;

  /**
   * Whether the DNS resolves to a valid SMP
   */
  dns_valid: boolean;

  /**
   * Whether the Peppol ID is valid and registered in the Peppol network
   */
  is_valid: boolean;

  supported_document_types?: Array<string>;
}

export namespace ValidateValidatePeppolIDResponse {
  /**
   * Business card information for the Peppol ID
   */
  export interface BusinessCard {
    country_code?: string | null;

    name?: string | null;

    registration_date?: string | null;
  }
}

export interface ValidateValidateJsonParams {
  amount_due?: number | string | null;

  attachments?: Array<DocumentsAPI.DocumentAttachmentCreate> | null;

  billing_address?: string | null;

  billing_address_recipient?: string | null;

  /**
   * Currency of the invoice
   */
  currency?: DocumentsAPI.CurrencyCode;

  customer_address?: string | null;

  customer_address_recipient?: string | null;

  customer_email?: string | null;

  customer_id?: string | null;

  customer_name?: string | null;

  customer_tax_id?: string | null;

  direction?: DocumentsAPI.DocumentDirection;

  document_type?: DocumentsAPI.DocumentType;

  due_date?: string | null;

  invoice_date?: string | null;

  invoice_id?: string | null;

  invoice_total?: number | string | null;

  items?: Array<ValidateValidateJsonParams.Item> | null;

  note?: string | null;

  payment_details?: Array<DocumentsAPI.PaymentDetailCreate> | null;

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

  /**
   * Tax category code of the invoice
   */
  tax_code?: 'AE' | 'E' | 'S' | 'Z' | 'G' | 'O' | 'K' | 'L' | 'M' | 'B';

  tax_details?: Array<ValidateValidateJsonParams.TaxDetail> | null;

  total_discount?: number | string | null;

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
   * VAT exemption note of the invoice
   */
  vatex_note?: string | null;

  vendor_address?: string | null;

  vendor_address_recipient?: string | null;

  vendor_email?: string | null;

  vendor_name?: string | null;

  vendor_tax_id?: string | null;
}

export namespace ValidateValidateJsonParams {
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

export interface ValidateValidatePeppolIDParams {
  /**
   * Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a
   * Belgian company.
   */
  peppol_id: string;
}

export interface ValidateValidateUblParams {
  file: Uploadable;
}

export declare namespace Validate {
  export {
    type UblDocumentValidation as UblDocumentValidation,
    type ValidateValidatePeppolIDResponse as ValidateValidatePeppolIDResponse,
    type ValidateValidateJsonParams as ValidateValidateJsonParams,
    type ValidateValidatePeppolIDParams as ValidateValidatePeppolIDParams,
    type ValidateValidateUblParams as ValidateValidateUblParams,
  };
}
