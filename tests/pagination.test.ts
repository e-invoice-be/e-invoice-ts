import { jsonResponse, stubClient } from './resources/stub-client';

describe('DocumentsNumberPage auto-pagination', () => {
  const stubPages = (pages: Array<Record<string, unknown>>) => stubClient(() => jsonResponse(pages.shift()));

  test('stops after the page that reports has_next_page: false', async () => {
    const { client, requests } = stubPages([
      {
        items: [{ id: 'doc_1' }, { id: 'doc_2' }],
        page: 1,
        page_size: 2,
        pages: 2,
        total: 3,
        has_next_page: false,
      },
    ]);

    const page = await client.inbox.list();

    expect(page.hasNextPage()).toEqual(false);
    const ids: Array<string> = [];
    for await (const document of page) {
      ids.push(document.id);
    }
    expect(ids).toEqual(['doc_1', 'doc_2']);
    expect(requests).toHaveLength(1);
  });

  test('requests page + 1 while has_next_page is true', async () => {
    const { client, requests } = stubPages([
      {
        items: [{ id: 'doc_1' }, { id: 'doc_2' }],
        page: 1,
        page_size: 2,
        pages: 2,
        total: 3,
        has_next_page: true,
      },
      { items: [{ id: 'doc_3' }], page: 2, page_size: 2, pages: 2, total: 3, has_next_page: false },
    ]);

    const ids: Array<string> = [];
    for await (const document of client.inbox.list()) {
      ids.push(document.id);
    }

    expect(ids).toEqual(['doc_1', 'doc_2', 'doc_3']);
    expect(requests.map((request) => request.url.pathname + request.url.search)).toEqual([
      '/api/inbox/',
      '/api/inbox/?page=2',
    ]);
  });

  test('follows has_next_page: true when the page number already equals the item total', async () => {
    const { client, requests } = stubPages([
      { items: [{ id: 'doc_1' }], page: 1, page_size: 1, pages: 2, total: 1, has_next_page: true },
      { items: [{ id: 'doc_2' }], page: 2, page_size: 1, pages: 2, total: 2, has_next_page: false },
    ]);

    const page = await client.inbox.list();

    expect(page.hasNextPage()).toEqual(true);
    expect((await page.getNextPage()).items).toEqual([{ id: 'doc_2' }]);
    expect(requests).toHaveLength(2);
  });
});
