// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DocumentsAPI from './documents/documents';
import { DocumentResponsesDocumentsNumberPage } from './documents/documents';
import { DocumentsNumberPage, type DocumentsNumberPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Inbox extends APIResource {
  /**
   * Retrieve a paginated list of received documents with filtering options including
   * state, type, sender, date range, and text search.
   */
  list(
    query: InboxListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList('/api/inbox/', DocumentsNumberPage<DocumentsAPI.DocumentResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a paginated list of received credit notes with filtering options.
   */
  listCreditNotes(
    query: InboxListCreditNotesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList(
      '/api/inbox/credit-notes',
      DocumentsNumberPage<DocumentsAPI.DocumentResponse>,
      { query, ...options },
    );
  }

  /**
   * Retrieve a paginated list of received invoices with filtering options.
   */
  listInvoices(
    query: InboxListInvoicesParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList(
      '/api/inbox/invoices',
      DocumentsNumberPage<DocumentsAPI.DocumentResponse>,
      { query, ...options },
    );
  }
}

export type DocumentState = 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED';

export interface PaginatedDocumentResponse {
  has_next_page: boolean;

  items: Array<DocumentsAPI.DocumentResponse>;

  page: number;

  page_size: number;

  pages: number;

  total: number;
}

export interface InboxListParams extends DocumentsNumberPageParams {
  /**
   * Filter by issue date (from)
   */
  date_from?: string | null;

  /**
   * Filter by issue date (to)
   */
  date_to?: string | null;

  /**
   * Search in invoice number, seller/buyer names
   */
  search?: string | null;

  /**
   * Filter by sender (vendor_name, vendor_email, vendor_tax_id, vendor_company_id)
   */
  sender?: string | null;

  /**
   * Field to sort by
   */
  sort_by?:
    | 'created_at'
    | 'invoice_date'
    | 'due_date'
    | 'invoice_total'
    | 'customer_name'
    | 'vendor_name'
    | 'invoice_id';

  /**
   * Sort direction (asc/desc)
   */
  sort_order?: 'asc' | 'desc';

  /**
   * Filter by document type. If not provided, returns all types.
   */
  type?: DocumentsAPI.DocumentType | null;
}

export interface InboxListCreditNotesParams extends DocumentsNumberPageParams {
  /**
   * Field to sort by
   */
  sort_by?:
    | 'created_at'
    | 'invoice_date'
    | 'due_date'
    | 'invoice_total'
    | 'customer_name'
    | 'vendor_name'
    | 'invoice_id';

  /**
   * Sort direction (asc/desc)
   */
  sort_order?: 'asc' | 'desc';
}

export interface InboxListInvoicesParams extends DocumentsNumberPageParams {
  /**
   * Field to sort by
   */
  sort_by?:
    | 'created_at'
    | 'invoice_date'
    | 'due_date'
    | 'invoice_total'
    | 'customer_name'
    | 'vendor_name'
    | 'invoice_id';

  /**
   * Sort direction (asc/desc)
   */
  sort_order?: 'asc' | 'desc';
}

export declare namespace Inbox {
  export {
    type DocumentState as DocumentState,
    type PaginatedDocumentResponse as PaginatedDocumentResponse,
    type InboxListParams as InboxListParams,
    type InboxListCreditNotesParams as InboxListCreditNotesParams,
    type InboxListInvoicesParams as InboxListInvoicesParams,
  };
}

export { type DocumentResponsesDocumentsNumberPage };
