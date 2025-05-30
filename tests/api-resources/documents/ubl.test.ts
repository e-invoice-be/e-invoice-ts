// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EInvoiceAPI, { toFile } from 'e-invoice-api';

const client = new EInvoiceAPI({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource ubl', () => {
  // skipped: tests are disabled for the time being
  test.skip('createFromUbl: only required params', async () => {
    const responsePromise = client.documents.ubl.createFromUbl({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('createFromUbl: required and optional params', async () => {
    const response = await client.documents.ubl.createFromUbl({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.documents.ubl.get('document_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
