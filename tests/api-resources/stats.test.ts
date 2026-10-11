import EInvoice from 'e-invoice-api';

const client = new EInvoice({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource stats', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.stats.retrieve();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.stats.retrieve(
        {
          aggregation: 'DAY',
          end_date: '2019-12-27',
          start_date: '2019-12-27',
        },
        { path: '/_unknown_path' },
      ),
    ).rejects.toThrow(EInvoice.NotFoundError);
  });
});
