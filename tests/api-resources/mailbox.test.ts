import EInvoice from 'e-invoice-api';

const client = new EInvoice({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mailbox', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.mailbox.retrieve('inbound_email_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.mailbox.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.mailbox.list(
        {
          page: 1,
          page_size: 1,
          processed: true,
          received_from: '2019-12-27T18:11:19.117Z',
          received_to: '2019-12-27T18:11:19.117Z',
          search: 'search',
          sort_by: 'received_at',
          sort_order: 'asc',
          status: 'pending',
        },
        { path: '/_unknown_path' },
      ),
    ).rejects.toThrow(EInvoice.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('downloadAttachment: required and optional params', async () => {
    const response = await client.mailbox.downloadAttachment('filename', {
      inbound_email_id: 'inbound_email_id',
    });
  });

  // Mock server tests are disabled
  test.skip('reprocess', async () => {
    const responsePromise = client.mailbox.reprocess('inbound_email_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
