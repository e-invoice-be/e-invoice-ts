import { APIResource } from '../../core/resource';
import * as PdfAPI from './pdf';
import { Pdf, PdfCreateParams, PdfCreateResponse, PdfRetrieveResponse } from './pdf';

export class Conversion extends APIResource {
  pdf: PdfAPI.Pdf = new PdfAPI.Pdf(this._client);
}

Conversion.Pdf = Pdf;

export declare namespace Conversion {
  export {
    Pdf as Pdf,
    type PdfCreateResponse as PdfCreateResponse,
    type PdfRetrieveResponse as PdfRetrieveResponse,
    type PdfCreateParams as PdfCreateParams,
  };
}
