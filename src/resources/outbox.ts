// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxAPI from './inbox';
import * as DocumentsAPI from './documents/documents';
import { DocumentResponsesDocumentsNumberPage } from './documents/documents';
import { DocumentsNumberPage, type DocumentsNumberPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Outbox extends APIResource {
  /**
   * Retrieve a paginated list of draft documents with filtering options including
   * state and text search.
   */
  listDraftDocuments(
    query: OutboxListDraftDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList('/api/outbox/drafts', DocumentsNumberPage<DocumentsAPI.DocumentResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Retrieve a paginated list of sent documents with filtering options including
   * state, type, sender, date range, and text search.
   */
  listReceivedDocuments(
    query: OutboxListReceivedDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList('/api/outbox/', DocumentsNumberPage<DocumentsAPI.DocumentResponse>, {
      query,
      ...options,
    });
  }
}

export interface OutboxListDraftDocumentsParams extends DocumentsNumberPageParams {
  /**
   * Search in invoice number, seller/buyer names
   */
  search?: string | null;

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
   * Filter by document state
   */
  state?: InboxAPI.DocumentState | null;

  /**
   * Filter by document type
   */
  type?: DocumentsAPI.DocumentType | null;
}

export interface OutboxListReceivedDocumentsParams extends DocumentsNumberPageParams {
  /**
   * Filter by issue date (from)
   */
  date_from?: string | null;

  /**
   * Filter by issue date (to)
   */
  date_to?: string | null;

  /**
   * Filter by receiver (customer_name, customer_email, customer_tax_id,
   * customer_company_id, customer_id)
   */
  receiver?: string | null;

  /**
   * Search in invoice number, seller/buyer names
   */
  search?: string | null;

  /**
   * @deprecated (Deprecated) Filter by sender ID
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
   * Filter by document state
   */
  state?: InboxAPI.DocumentState | null;

  /**
   * Filter by document type
   */
  type?: DocumentsAPI.DocumentType | null;
}

export declare namespace Outbox {
  export {
    type OutboxListDraftDocumentsParams as OutboxListDraftDocumentsParams,
    type OutboxListReceivedDocumentsParams as OutboxListReceivedDocumentsParams,
  };
}

export { type DocumentResponsesDocumentsNumberPage };
