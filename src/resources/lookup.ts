// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as LookupAPI from './lookup';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Lookup extends APIResource {
  /**
   * Lookup Peppol ID. The peppol_id must be in the form of `<scheme>:<id>`. The
   * scheme is a 4-digit code representing the identifier scheme, and the id is the
   * actual identifier value. For example, for a Belgian company it is
   * `0208:0123456789` (where 0208 is the scheme for Belgian enterprises, followed by
   * the 10 digits of the official BTW / KBO number).
   */
  retrieve(query: LookupRetrieveParams, options?: RequestOptions): APIPromise<LookupRetrieveResponse> {
    return this._client.get('/api/lookup', { query, ...options });
  }
}

/**
 * Certificate information for a Peppol endpoint.
 */
export interface Certificate {
  /**
   * Status of the certificate validation: 'success', 'error', or 'pending'
   */
  status: string;

  /**
   * Details about the certificate including subject, issuer, validity dates, etc.
   */
  details?: { [key: string]: unknown } | null;

  /**
   * Error message if certificate validation failed
   */
  error?: string | null;
}

/**
 * Response from a Peppol ID lookup operation.
 *
 * This model represents the complete result of validating and looking up a Peppol
 * ID in the Peppol network, including DNS information, service metadata, business
 * card details, and certificate information.
 *
 * Example: A successful lookup for a Peppol ID "0192:991825827" would return DNS
 * information, service metadata with supported document types and processes,
 * business card information with organization details, and certificate data.
 */
export interface LookupRetrieveResponse {
  /**
   * Business card information for the Peppol participant
   */
  businessCard: LookupRetrieveResponse.BusinessCard;

  /**
   * List of certificates found for the Peppol participant
   */
  certificates: Array<Certificate>;

  /**
   * Information about the DNS lookup performed
   */
  dnsInfo: LookupRetrieveResponse.DNSInfo;

  /**
   * List of error messages if any errors occurred during the lookup
   */
  errors: Array<string>;

  /**
   * Total execution time of the lookup operation in milliseconds
   */
  executionTimeMs: number;

  /**
   * Metadata about the query that was performed
   */
  queryMetadata: LookupRetrieveResponse.QueryMetadata;

  /**
   * Service metadata information for the Peppol participant
   */
  serviceMetadata: LookupRetrieveResponse.ServiceMetadata;

  /**
   * Overall status of the lookup: 'success' or 'error'
   */
  status: string;
}

export namespace LookupRetrieveResponse {
  /**
   * Business card information for the Peppol participant
   */
  export interface BusinessCard {
    /**
     * List of business entities associated with the Peppol ID
     */
    entities: Array<BusinessCard.Entity>;

    /**
     * Time taken to query the business card in milliseconds
     */
    queryTimeMs: number;

    /**
     * Status of the business card lookup: 'success', 'error', or 'pending'
     */
    status: string;

    /**
     * Error message if business card lookup failed
     */
    error?: string | null;
  }

  export namespace BusinessCard {
    /**
     * Business entity information in the Peppol network.
     */
    export interface Entity {
      /**
       * Additional information about the business entity
       */
      additionalInformation?: Array<string> | null;

      /**
       * ISO 3166-1 alpha-2 country code of the business entity
       */
      countryCode?: string | null;

      /**
       * Name of the business entity
       */
      name?: string | null;

      /**
       * ISO 8601 date of when the entity was registered in Peppol
       */
      registrationDate?: string | null;
    }
  }

  /**
   * Information about the DNS lookup performed
   */
  export interface DNSInfo {
    /**
     * List of DNS records found for the Peppol participant
     */
    dnsRecords: Array<DNSInfo.DNSRecord>;

    /**
     * Hostname of the SML used for the query
     */
    smlHostname: string;

    /**
     * Status of the DNS lookup: 'success', 'error', or 'pending'
     */
    status: string;

    /**
     * Error message if the DNS lookup failed
     */
    error?: string | null;
  }

  export namespace DNSInfo {
    /**
     * DNS record information for a Peppol participant.
     */
    export interface DNSRecord {
      /**
       * IP address found in the DNS record
       */
      ip: string;
    }
  }

  /**
   * Metadata about the query that was performed
   */
  export interface QueryMetadata {
    /**
     * Scheme of the identifier, typically 'iso6523-actorid-upis'
     */
    identifierScheme: string;

    /**
     * The actual Peppol ID value being queried
     */
    identifierValue: string;

    /**
     * Domain of the SML (Service Metadata Locator) used for the lookup
     */
    smlDomain: string;

    /**
     * ISO 8601 timestamp of when the query was executed
     */
    timestamp: string;

    /**
     * Version of the API used for the lookup
     */
    version: string;
  }

  /**
   * Service metadata information for the Peppol participant
   */
  export interface ServiceMetadata {
    /**
     * List of endpoints found for the Peppol participant
     */
    endpoints: Array<ServiceMetadata.Endpoint>;

    /**
     * Time taken to query the service metadata in milliseconds
     */
    queryTimeMs: number;

    /**
     * Status of the service metadata lookup: 'success', 'error', or 'pending'
     */
    status: string;

    /**
     * Error message if service metadata lookup failed
     */
    error?: string | null;
  }

  export namespace ServiceMetadata {
    /**
     * Information about a Peppol participant's endpoint.
     */
    export interface Endpoint {
      /**
       * List of document types supported by this endpoint
       */
      documentTypes: Array<Endpoint.DocumentType>;

      /**
       * Status of the endpoint lookup: 'success', 'error', or 'pending'
       */
      status: string;

      /**
       * URL of the endpoint
       */
      url: string;

      /**
       * Error message if endpoint lookup failed
       */
      error?: string | null;

      /**
       * List of processes supported by this endpoint
       */
      processes?: Array<Endpoint.Process> | null;
    }

    export namespace Endpoint {
      /**
       * Document type supported by a Peppol participant.
       */
      export interface DocumentType {
        /**
         * Scheme of the document type identifier
         */
        scheme: string;

        /**
         * Value of the document type identifier
         */
        value: string;
      }

      /**
       * Process information in the Peppol network.
       */
      export interface Process {
        /**
         * List of endpoints supporting this process
         */
        endpoints: Array<Process.Endpoint>;

        /**
         * Identifier of the process
         */
        processId: Process.ProcessID;
      }

      export namespace Process {
        /**
         * Endpoint information for a specific Peppol process.
         */
        export interface Endpoint {
          /**
           * URL or address of the endpoint
           */
          address: string;

          /**
           * Transport profile used by this endpoint
           */
          transportProfile: string;

          /**
           * Certificate information for a Peppol endpoint.
           */
          certificate?: LookupAPI.Certificate | null;

          /**
           * ISO 8601 date when the service was activated
           */
          serviceActivationDate?: string | null;

          /**
           * Human-readable description of the service
           */
          serviceDescription?: string | null;

          /**
           * ISO 8601 date when the service will expire
           */
          serviceExpirationDate?: string | null;

          /**
           * URL for technical contact information
           */
          technicalContactUrl?: string | null;

          /**
           * URL for technical documentation
           */
          technicalInformationUrl?: string | null;
        }

        /**
         * Identifier of the process
         */
        export interface ProcessID {
          /**
           * Scheme of the process identifier
           */
          scheme: string;

          /**
           * Value of the process identifier
           */
          value: string;
        }
      }
    }
  }
}

export interface LookupRetrieveParams {
  /**
   * Peppol ID in the format `<scheme>:<id>`. Example: `0208:1018265814` for a
   * Belgian company.
   */
  peppol_id: string;
}

export declare namespace Lookup {
  export {
    type Certificate as Certificate,
    type LookupRetrieveResponse as LookupRetrieveResponse,
    type LookupRetrieveParams as LookupRetrieveParams,
  };
}
