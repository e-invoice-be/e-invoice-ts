import { toFile } from 'e-invoice-api';
import { jsonResponse, stubClient } from '../stub-client';

describe('resource pdf', () => {
  test('create: requests the PDF as multipart form data to /api/conversion/pdf and returns the task', async () => {
    const { client, requests } = stubClient(() => jsonResponse({ task_id: 'task_1', status: 'pending' }));

    const task = await client.conversion.pdf.create({
      file: await toFile(new Uint8Array([0x25, 0x50, 0x44, 0x46]), 'invoice.pdf', {
        type: 'application/pdf',
      }),
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('POST');
    expect(requests[0]!.url.pathname).toEqual('/api/conversion/pdf');
    expect(requests[0]!.url.search).toEqual('');
    const body = requests[0]!.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    expect(Array.from(body.keys())).toEqual(['file']);
    const file = body.get('file') as File;
    expect(file.name).toEqual('invoice.pdf');
    expect(file.type).toEqual('application/pdf');
    expect(Array.from(new Uint8Array(await file.arrayBuffer()))).toEqual([0x25, 0x50, 0x44, 0x46]);
    expect(task).toEqual({ task_id: 'task_1', status: 'pending' });
  });

  test('retrieve: requests GET /api/conversion/pdf/{task_id} and returns the task status', async () => {
    const { client, requests } = stubClient(() => jsonResponse({ task_id: 'task/1', status: 'completed' }));

    const task = await client.conversion.pdf.retrieve('task/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/conversion/pdf/task%2F1');
    expect(requests[0]!.url.search).toEqual('');
    expect(task).toEqual({ task_id: 'task/1', status: 'completed' });
  });

  test('retrieveResult: requests GET /api/conversion/pdf/{task_id}/result and returns the converted document', async () => {
    const result = {
      document_type: 'INVOICE',
      state: 'DRAFT',
      direction: 'OUTBOUND',
      invoice_id: 'INV-2026-001',
      currency: 'EUR',
      invoice_total: '121.00',
      success: true,
      error_message: null,
      error_type: null,
      ubl_document: '<Invoice/>',
    };
    const { client, requests } = stubClient(() => jsonResponse(result));

    const document = await client.conversion.pdf.retrieveResult('task/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/conversion/pdf/task%2F1/result');
    expect(requests[0]!.url.search).toEqual('');
    expect(document).toEqual(result);
  });
});
