// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EInvoiceAPI from 'e-invoice-api';

const client = new EInvoiceAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource inbox', () => {
  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.inbox.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inbox.list(
        {
          date_from: '2019-12-27T18:11:19.117Z',
          date_to: '2019-12-27T18:11:19.117Z',
          page: 1,
          page_size: 1,
          search: 'search',
          sender: 'sender',
          state: 'DRAFT',
          type: 'INVOICE',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(EInvoiceAPI.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('listCreditNotes', async () => {
    const responsePromise = client.inbox.listCreditNotes();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listCreditNotes: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inbox.listCreditNotes({ page: 1, page_size: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(EInvoiceAPI.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('listInvoices', async () => {
    const responsePromise = client.inbox.listInvoices();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('listInvoices: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inbox.listInvoices({ page: 1, page_size: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(EInvoiceAPI.NotFoundError);
  });
});
