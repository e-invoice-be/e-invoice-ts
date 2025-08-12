// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EInvoice, { toFile } from 'e-invoice-api';

const client = new EInvoice({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource validate', () => {
  // Prism tests are disabled
  test.skip('validateJson', async () => {
    const responsePromise = client.validate.validateJson({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('validatePeppolID: only required params', async () => {
    const responsePromise = client.validate.validatePeppolID({ peppol_id: 'peppol_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('validatePeppolID: required and optional params', async () => {
    const response = await client.validate.validatePeppolID({ peppol_id: 'peppol_id' });
  });

  // Prism tests are disabled
  test.skip('validateUbl: only required params', async () => {
    const responsePromise = client.validate.validateUbl({
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

  // Prism tests are disabled
  test.skip('validateUbl: required and optional params', async () => {
    const response = await client.validate.validateUbl({
      file: await toFile(Buffer.from('# my file contents'), 'README.md'),
    });
  });
});
