import { emptyPage, jsonResponse, stubClient } from './stub-client';

describe('resource drafts', () => {
  test('list: requests GET /api/drafts/ and returns the documents of the page', async () => {
    const { client, requests } = stubClient(() =>
      jsonResponse({
        items: [{ id: 'doc_1', created_at: '2026-01-01T00:00:00Z', state: 'DRAFT' }],
        page: 1,
        page_size: 20,
        pages: 1,
        total: 1,
        has_next_page: false,
      }),
    );

    const page = await client.drafts.list();

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/drafts/');
    expect(requests[0]!.url.search).toEqual('');
    expect(page.items).toEqual([{ id: 'doc_1', created_at: '2026-01-01T00:00:00Z', state: 'DRAFT' }]);
  });

  test('list: sends every query param of the spec', async () => {
    const { client, requests } = stubClient(() => jsonResponse(emptyPage));

    await client.drafts.list({
      date_from: '2026-01-01T00:00:00Z',
      date_to: '2026-02-01T00:00:00Z',
      page: 2,
      page_size: 5,
      search: 'acme',
      sort_by: 'invoice_total',
      sort_order: 'asc',
      state: 'FAILED',
      type: 'SELFBILLING_CREDIT_NOTE',
    });

    expect(Object.fromEntries(requests[0]!.url.searchParams)).toEqual({
      date_from: '2026-01-01T00:00:00Z',
      date_to: '2026-02-01T00:00:00Z',
      page: '2',
      page_size: '5',
      search: 'acme',
      sort_by: 'invoice_total',
      sort_order: 'asc',
      state: 'FAILED',
      type: 'SELFBILLING_CREDIT_NOTE',
    });
  });
});
