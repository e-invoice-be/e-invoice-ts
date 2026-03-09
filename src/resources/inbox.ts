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
  type?: DocumentsAPI.DocumentType | null;
}

export interface InboxListCreditNotesParams extends DocumentsNumberPageParams {}

export interface InboxListInvoicesParams extends DocumentsNumberPageParams {}

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
