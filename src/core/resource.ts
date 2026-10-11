import type { EInvoice } from '../client';

export abstract class APIResource {
  protected _client: EInvoice;

  constructor(client: EInvoice) {
    this._client = client;
  }
}
