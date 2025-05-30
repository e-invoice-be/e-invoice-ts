// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Attachments extends APIResource {
  /**
   * Get attachment details with for an invoice or credit note with link to download
   * file (signed URL, valid for 1 hour)
   */
  retrieve(
    attachmentID: string,
    params: AttachmentRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<DocumentAttachment> {
    const { document_id } = params;
    return this._client.get(path`/api/documents/${document_id}/attachments/${attachmentID}`, options);
  }

  /**
   * Get all attachments for an invoice or credit note
   */
  list(documentID: string, options?: RequestOptions): APIPromise<AttachmentListResponse> {
    return this._client.get(path`/api/documents/${documentID}/attachments`, options);
  }

  /**
   * Delete an attachment from an invoice or credit note
   */
  delete(
    attachmentID: string,
    params: AttachmentDeleteParams,
    options?: RequestOptions,
  ): APIPromise<AttachmentDeleteResponse> {
    const { document_id } = params;
    return this._client.delete(path`/api/documents/${document_id}/attachments/${attachmentID}`, options);
  }

  /**
   * Add a new attachment to an invoice or credit note
   */
  add(
    documentID: string,
    body: AttachmentAddParams,
    options?: RequestOptions,
  ): APIPromise<DocumentAttachment> {
    return this._client.post(
      path`/api/documents/${documentID}/attachments`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface DocumentAttachment {
  id: string;

  file_name: string;

  file_size?: number;

  file_type?: string;

  file_url?: string | null;
}

export type AttachmentListResponse = Array<DocumentAttachment>;

export interface AttachmentDeleteResponse {
  is_deleted: boolean;
}

export interface AttachmentRetrieveParams {
  document_id: string;
}

export interface AttachmentDeleteParams {
  document_id: string;
}

export interface AttachmentAddParams {
  file: Uploadable;
}

export declare namespace Attachments {
  export {
    type DocumentAttachment as DocumentAttachment,
    type AttachmentListResponse as AttachmentListResponse,
    type AttachmentDeleteResponse as AttachmentDeleteResponse,
    type AttachmentRetrieveParams as AttachmentRetrieveParams,
    type AttachmentDeleteParams as AttachmentDeleteParams,
    type AttachmentAddParams as AttachmentAddParams,
  };
}
