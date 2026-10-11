import { jsonResponse, stubClient } from './stub-client';

describe('resource documents', () => {
  test('retrieveTimeline: requests GET /api/documents/{document_id}/timeline and returns the timeline', async () => {
    const { client, requests } = stubClient(() =>
      jsonResponse({
        document_id: 'doc_1',
        events: [{ event_type: 'document_created', timestamp: '2026-01-01T00:00:00Z' }],
      }),
    );

    const timeline = await client.documents.retrieveTimeline('doc/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/documents/doc%2F1/timeline');
    expect(requests[0]!.url.search).toEqual('');
    expect(timeline).toEqual({
      document_id: 'doc_1',
      events: [{ event_type: 'document_created', timestamp: '2026-01-01T00:00:00Z' }],
    });
  });
});
