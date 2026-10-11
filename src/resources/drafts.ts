import { APIResource } from '../core/resource';
import * as InboxAPI from './inbox';
import * as DocumentsAPI from './documents/documents';
import { DocumentResponsesDocumentsNumberPage } from './documents/documents';
import { DocumentsNumberPage, type DocumentsNumberPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class Drafts extends APIResource {
  /**
   * Retrieve a paginated list of draft documents with filtering options including
   * state and text search.
   */
  list(
    query: DraftListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentResponsesDocumentsNumberPage, DocumentsAPI.DocumentResponse> {
    return this._client.getAPIList('/api/drafts/', DocumentsNumberPage<DocumentsAPI.DocumentResponse>, {
      query,
      ...options,
    });
  }
}

export interface DraftListParams extends DocumentsNumberPageParams {
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
   * Filter by document state. By default return all states (DRAFT, TRANSIT, FAILED).
   */
  state?: InboxAPI.DocumentState | null;

  /**
   * Filter by document type
   */
  type?: DocumentsAPI.DocumentType | null;
}

export declare namespace Drafts {
  export { type DraftListParams as DraftListParams };
}

export { type DocumentResponsesDocumentsNumberPage };
