// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxAPI from './inbox';
import * as DocumentsAPI from './documents/documents';
import { DocumentResponsesDocumentsNumberPage } from './documents/documents';
import { DocumentsNumberPage, type DocumentsNumberPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Outbox extends APIResource {
  /**
   * Retrieve a paginated list of draft documents with filtering options.
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

export interface OutboxListDraftDocumentsParams extends DocumentsNumberPageParams {}

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
