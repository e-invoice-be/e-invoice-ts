import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { DocumentsNumberPage, type DocumentsNumberPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Mailbox extends APIResource {
  /**
   * Retrieve a single inbound email by ID, scoped to the caller's tenant.
   */
  retrieve(inboundEmailID: string, options?: RequestOptions): APIPromise<InboundEmailResponse> {
    return this._client.get(path`/api/mailbox/${inboundEmailID}`, options);
  }

  /**
   * Retrieve a paginated list of received inbound emails with filtering, search, and
   * sorting options.
   */
  list(
    query: MailboxListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<InboundEmailResponsesDocumentsNumberPage, InboundEmailResponse> {
    return this._client.getAPIList('/api/mailbox/', DocumentsNumberPage<InboundEmailResponse>, {
      query,
      ...options,
    });
  }

  /**
   * Download a specific attachment from an inbound email by filename. Returns the
   * binary content with the correct Content-Type.
   */
  downloadAttachment(
    filename: string,
    params: MailboxDownloadAttachmentParams,
    options?: RequestOptions,
  ): APIPromise<Response> {
    const { inbound_email_id } = params;
    return this._client.get(path`/api/mailbox/${inbound_email_id}/attachments/${filename}`, {
      ...options,
      __binaryResponse: true,
    });
  }

  /**
   * Retry processing of a previously failed inbound email by replaying the original
   * Postmark payload.
   */
  reprocess(inboundEmailID: string, options?: RequestOptions): APIPromise<InboundEmailResponse> {
    return this._client.post(path`/api/mailbox/${inboundEmailID}/reprocess`, options);
  }
}

export type InboundEmailResponsesDocumentsNumberPage = DocumentsNumberPage<InboundEmailResponse>;

export interface InboundEmailResponse {
  id: string;

  created_at: string;

  message_id: string;

  sender_email: string;

  attachment_count?: number;

  attachments?: Array<InboundEmailResponse.Attachment>;

  bcc_addresses?: string | null;

  cc_addresses?: string | null;

  document_id?: string | null;

  error_message?: string | null;

  processed?: boolean;

  processed_at?: string | null;

  received_at?: string | null;

  sender_name?: string | null;

  subject?: string | null;

  to_addresses?: string | null;
}

export namespace InboundEmailResponse {
  export interface Attachment {
    filename: string;

    content_type?: string | null;

    size?: number | null;
  }
}

export interface MailboxListParams extends DocumentsNumberPageParams {
  /**
   * Filter by processing status. If not provided, returns all. Ignored when `status`
   * is set.
   */
  processed?: boolean | null;

  /**
   * Inclusive lower bound on received date (falls back to created_at when
   * received_at is null)
   */
  received_from?: string | null;

  /**
   * Inclusive upper bound on received date (falls back to created_at when
   * received_at is null)
   */
  received_to?: string | null;

  /**
   * Case-insensitive search across sender email, subject, message ID, and attachment
   * filenames
   */
  search?: string | null;

  /**
   * Field to sort by
   */
  sort_by?: 'received_at' | 'created_at';

  /**
   * Sort direction (asc/desc)
   */
  sort_order?: 'asc' | 'desc';

  /**
   * Filter by status: pending, success, or failed. Takes precedence over `processed`
   * if both are provided.
   */
  status?: 'pending' | 'success' | 'failed' | null;
}

export interface MailboxDownloadAttachmentParams {
  inbound_email_id: string;
}

export declare namespace Mailbox {
  export {
    type InboundEmailResponse as InboundEmailResponse,
    type InboundEmailResponsesDocumentsNumberPage as InboundEmailResponsesDocumentsNumberPage,
    type MailboxListParams as MailboxListParams,
    type MailboxDownloadAttachmentParams as MailboxDownloadAttachmentParams,
  };
}
