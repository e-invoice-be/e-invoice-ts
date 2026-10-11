import { jsonResponse, stubClient } from './stub-client';

describe('resource webhooks', () => {
  test('retrieveHistory: requests GET /api/webhooks/{webhook_id}/history and returns the history', async () => {
    const history = {
      history: [{ event_type: 'document.sent', status_code: 200, delivered_at: '2026-10-01T08:00:00Z' }],
    };
    const { client, requests } = stubClient(() => jsonResponse(history));

    const response = await client.webhooks.retrieveHistory('wh/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/webhooks/wh%2F1/history');
    expect(requests[0]!.url.search).toEqual('');
    expect(response).toEqual(history);
  });

  test('test: posts the test event as JSON to /api/webhooks/{webhook_id}/test and returns the result', async () => {
    const result = {
      success: true,
      message: 'Test event delivered',
      webhook_delivery_result: { status_code: 200 },
    };
    const { client, requests } = stubClient(() => jsonResponse(result));

    const response = await client.webhooks.test('wh/1', {
      event_type: 'document.received',
      data: { document_id: 'doc_1' },
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('POST');
    expect(requests[0]!.url.pathname).toEqual('/api/webhooks/wh%2F1/test');
    expect(requests[0]!.url.search).toEqual('');
    expect(requests[0]!.body).toEqual({ event_type: 'document.received', data: { document_id: 'doc_1' } });
    expect(response).toEqual(result);
  });
});
