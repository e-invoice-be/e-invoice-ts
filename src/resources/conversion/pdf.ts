// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentsAPI from '../documents/documents';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Pdf extends APIResource {
  /**
   * Convert a PDF to a document
   *
   * @example
   * ```ts
   * const pdf = await client.conversion.pdf.create({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  create(body: PdfCreateParams, options?: RequestOptions): APIPromise<PdfCreateResponse> {
    return this._client.post(
      '/api/conversion/pdf',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Get the status of a PDF conversion task
   *
   * @example
   * ```ts
   * const pdf = await client.conversion.pdf.retrieve('task_id');
   * ```
   */
  retrieve(taskID: string, options?: RequestOptions): APIPromise<PdfRetrieveResponse> {
    return this._client.get(path`/api/conversion/pdf/${taskID}`, options);
  }

  /**
   * Get the result of a PDF conversion task
   *
   * @example
   * ```ts
   * const response = await client.conversion.pdf.retrieveResult(
   *   'task_id',
   * );
   * ```
   */
  retrieveResult(
    taskID: string,
    options?: RequestOptions,
  ): APIPromise<DocumentsAPI.DocumentCreateFromPdfResponse> {
    return this._client.get(path`/api/conversion/pdf/${taskID}/result`, options);
  }
}

export interface PdfCreateResponse {
  /**
   * The ID of the task that will process the PDF
   */
  task_id: string;

  /**
   * The status of the task
   */
  status?: 'pending' | 'completed' | 'failed';
}

export interface PdfRetrieveResponse {
  /**
   * The ID of the task that will process the PDF
   */
  task_id: string;

  /**
   * The status of the task
   */
  status?: 'pending' | 'completed' | 'failed';
}

export interface PdfCreateParams {
  file: Uploadable;
}

export declare namespace Pdf {
  export {
    type PdfCreateResponse as PdfCreateResponse,
    type PdfRetrieveResponse as PdfRetrieveResponse,
    type PdfCreateParams as PdfCreateParams,
  };
}
