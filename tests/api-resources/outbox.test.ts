// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EInvoice from 'e-invoice-api';

const client = new EInvoice({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource outbox', () => {
  // Prism tests are disabled
  test.skip('listDraftDocuments', async () => {
    const responsePromise = client.outbox.listDraftDocuments();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listDraftDocuments: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.outbox.listDraftDocuments({ page: 1, page_size: 1 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(EInvoice.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listReceivedDocuments', async () => {
    const responsePromise = client.outbox.listReceivedDocuments();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listReceivedDocuments: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.outbox.listReceivedDocuments(
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
    ).rejects.toThrow(EInvoice.NotFoundError);
  });
});
