// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DocumentsAPI from './documents/documents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Inbox extends APIResource {
  /**
   * Retrieve a paginated list of received documents with filtering options.
   */
  list(
    query: InboxListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedDocumentResponse> {
    return this._client.get('/api/inbox/', { query, ...options });
  }

  /**
   * Retrieve a paginated list of received credit notes with filtering options.
   */
  listCreditNotes(
    query: InboxListCreditNotesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedDocumentResponse> {
    return this._client.get('/api/inbox/credit-notes', { query, ...options });
  }

  /**
   * Retrieve a paginated list of received invoices with filtering options.
   */
  listInvoices(
    query: InboxListInvoicesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedDocumentResponse> {
    return this._client.get('/api/inbox/invoices', { query, ...options });
  }
}

export type DocumentState = 'DRAFT' | 'TRANSIT' | 'FAILED' | 'SENT' | 'RECEIVED';

export type DocumentTypeInput = 'INVOICE' | 'CREDIT_NOTE';

export interface PaginatedDocumentResponse {
  items: Array<DocumentsAPI.DocumentResponse>;

  page: number;

  page_size: number;

  pages: number;

  total: number;
}

export interface InboxListParams {
  /**
   * Filter by issue date (from)
   */
  date_from?: string | null;

  /**
   * Filter by issue date (to)
   */
  date_to?: string | null;

  /**
   * Page number
   */
  page?: number;

  /**
   * Number of items per page
   */
  page_size?: number;

  /**
   * Search in invoice number, seller/buyer names
   */
  search?: string | null;

  /**
   * Filter by sender ID
   */
  sender?: string | null;

  /**
   * Filter by document state
   */
  state?: DocumentState | null;

  /**
   * Filter by document type
   */
  type?: DocumentTypeInput | null;
}

export interface InboxListCreditNotesParams {
  /**
   * Page number
   */
  page?: number;

  /**
   * Number of items per page
   */
  page_size?: number;
}

export interface InboxListInvoicesParams {
  /**
   * Page number
   */
  page?: number;

  /**
   * Number of items per page
   */
  page_size?: number;
}

export declare namespace Inbox {
  export {
    type DocumentState as DocumentState,
    type DocumentTypeInput as DocumentTypeInput,
    type PaginatedDocumentResponse as PaginatedDocumentResponse,
    type InboxListParams as InboxListParams,
    type InboxListCreditNotesParams as InboxListCreditNotesParams,
    type InboxListInvoicesParams as InboxListInvoicesParams,
  };
}
