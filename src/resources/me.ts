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
  name: string;

  /**
   * BCC recipient email to deliver documents
   */
  bcc_recipient_email?: string | null;

  /**
   * Address of the company. Must be in the form of `Street Name Street Number`
   */
  company_address?: string | null;

  /**
   * City of the company
   */
  company_city?: string | null;

  /**
   * Country of the company
   */
  company_country?: string | null;

  /**
   * Email of the company
   */
  company_email?: string | null;

  /**
   * Name of the company. Must include the company type. For example: `BV`, `NV`,
   * `CVBA`, `VOF`
   */
  company_name?: string | null;

  /**
   * Company number. For Belgium this is the CBE number or their EUID (European
   * Unique Identifier) number
   */
  company_number?: string | null;

  /**
   * Company tax ID (VAT number), including the country prefix. Stored in compact
   * form: uppercased with separators removed, e.g. `BE0123456789`.
   */
  company_tax_id?: string | null;

  /**
   * Zip code of the company
   */
  company_zip?: string | null;

  /**
   * Credit balance of the tenant
   */
  credit_balance?: number;

  description?: string | null;

  /**
   * IBANs of the tenant
   */
  ibans?: Array<string> | null;

  /**
   * Peppol IDs of the tenant
   */
  peppol_ids?: Array<string> | null;

  /**
   * Plan of the tenant
   */
  plan?: 'starter' | 'pro' | 'enterprise';

  /**
   * Legacy field. Does not show whether a Peppol ID is published: it is usually
   * `false`, also for a tenant whose Peppol IDs are published.
   */
  smp_registration?: boolean | null;

  /**
   * Legacy field. Does not show whether or when a Peppol ID was published.
   */
  smp_registration_date?: string | null;
}

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };
}
