// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Ubl extends APIResource {
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

export declare namespace Ubl {
  export { type UblGetResponse as UblGetResponse };
}
