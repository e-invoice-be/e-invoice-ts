// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from './documents';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Ubl extends APIResource {
  /**
   * Create a new invoice or credit note from a UBL file
   */
  createFromUbl(
    body: UblCreateFromUblParams,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.DocumentResponse> {
    return this._client.post(
      '/api/documents/ubl',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get the UBL for an invoice or credit note
   */
  get(documentID: string, options?: RequestOptions): APIPromise<UblGetResponse> {
    return this._client.get(path`/api/documents/${documentID}/ubl`, options);
  }
}

export interface UblGetResponse {
  id: string;

  file_name: string;

  file_hash?: string | null;

  file_size?: number;

  receiver_peppol_id?: string | null;

  receiver_peppol_scheme?: string | null;

  sender_peppol_id?: string | null;

  sender_peppol_scheme?: string | null;

  signed_url?: string | null;

  validated_at?: string | null;
}

export interface UblCreateFromUblParams {
  file: Uploadable;
}

export declare namespace Ubl {
  export { type UblGetResponse as UblGetResponse, type UblCreateFromUblParams as UblCreateFromUblParams };
}
