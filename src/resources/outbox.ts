// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InboxAPI from './inbox';
import * as DocumentsAPI from './documents/documents';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Outbox extends APIResource {
  /**
   * Retrieve a paginated list of draft documents with filtering options.
   */
  listDraftDocuments(
    query: OutboxListDraftDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InboxAPI.PaginatedDocumentResponse> {
    return this._client.get('/api/outbox/drafts', { query, ...options });
  }

  /**
   * Retrieve a paginated list of received documents with filtering options.
   */
  listReceivedDocuments(
    query: OutboxListReceivedDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InboxAPI.PaginatedDocumentResponse> {
    return this._client.get('/api/outbox/', { query, ...options });
  }
}

export interface OutboxListDraftDocumentsParams {
  /**
   * Page number
   */
  page?: number;

  /**
   * Number of items per page
   */
  page_size?: number;
}

export interface OutboxListReceivedDocumentsParams {
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
