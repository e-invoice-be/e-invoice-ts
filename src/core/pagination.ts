// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { EInvoiceError } from './error';
import { FinalRequestOptions } from '../internal/request-options';
import { defaultParseResponse } from '../internal/parse';
import { type EInvoice } from '../client';
import { APIPromise } from './api-promise';
import { type APIResponseProps } from '../internal/parse';
import { maybeObj } from '../internal/utils/values';

export type PageRequestOptions = Pick<FinalRequestOptions, 'query' | 'headers' | 'body' | 'path' | 'method'>;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: EInvoice;
  protected options: FinalRequestOptions;

  protected response: Response;
  protected body: unknown;

  constructor(client: EInvoice, response: Response, body: unknown, options: FinalRequestOptions) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new EInvoiceError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    return await this.#client.requestAPIList(this.constructor as any, nextOptions);
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
export class PagePromise<
    PageClass extends AbstractPage<Item>,
    Item = ReturnType<PageClass['getPaginatedItems']>[number],
  >
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: EInvoice,
    request: Promise<APIResponseProps>,
    Page: new (...args: ConstructorParameters<typeof AbstractPage>) => PageClass,
  ) {
    super(
      client,
      request,
      async (client, props) =>
        new Page(client, props.response, await defaultParseResponse(client, props), props.options),
    );
  }

  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface DocumentsNumberPageResponse<Item> {
  items: Array<Item>;

  page: number;

  page_size: number;

  total: number;
}

export interface DocumentsNumberPageParams {
  page?: number;

  page_size?: number;
}

export class DocumentsNumberPage<Item>
  extends AbstractPage<Item>
  implements DocumentsNumberPageResponse<Item>
{
  items: Array<Item>;

  page: number;

  page_size: number;

  total: number;

  constructor(
    client: EInvoice,
    response: Response,
    body: DocumentsNumberPageResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.items = body.items || [];
    this.page = body.page || 0;
    this.page_size = body.page_size || 0;
    this.total = body.total || 0;
  }

  getPaginatedItems(): Item[] {
    return this.items ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const currentPage = this.page;

    if (currentPage >= this.total) {
      return null;
    }

    return {
      ...this.options,
      query: {
        ...maybeObj(this.options.query),
        page: currentPage + 1,
      },
    };
  }
}
