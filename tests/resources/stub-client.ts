import EInvoice from 'e-invoice-api';

export interface StubbedRequest {
  method: string | undefined;
  url: URL;
  body: unknown;
}

export const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });

export const emptyPage = { items: [], page: 1, page_size: 20, pages: 0, total: 0, has_next_page: false };

/**
 * Builds a client whose `fetch` records every outgoing request and answers with `respond`.
 */
export const stubClient = (respond: () => Response) => {
  const requests: Array<StubbedRequest> = [];
  const client = new EInvoice({
    apiKey: 'My API Key',
    baseURL: 'http://localhost:5000/',
    fetch: async (url, init) => {
      requests.push({
        method: init?.method,
        url: new URL(String(url)),
        body: typeof init?.body === 'string' ? JSON.parse(init.body) : init?.body,
      });
      return respond();
    },
  });
  return { client, requests };
};
