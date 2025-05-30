// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
  /**
   * Retrieve information about your account.
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/api/me/', options);
  }
}

export interface MeRetrieveResponse {
  /**
   * Credit balance of the tenant
   */
  credit_balance: number;

  name: string;

  /**
   * Plan of the tenant
   */
  plan: 'starter' | 'pro' | 'enterprise';

  description?: string | null;

  /**
   * IBANs of the tenant
   */
  ibans?: Array<string> | null;

  /**
   * Peppol IDs of the tenant
   */
  peppol_ids?: Array<string> | null;
}

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };
}
