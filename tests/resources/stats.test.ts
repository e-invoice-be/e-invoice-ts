import { jsonResponse, stubClient } from './stub-client';

const stats = {
  tenant_id: 'ten_1',
  period_start: '2026-09-01',
  period_end: '2026-09-30',
  aggregation: 'MONTH',
  actions: [
    { action: 'DOCUMENT_SENT', stat_date: '2026-09-01', count: 12 },
    { action: 'DOCUMENT_RECEIVED', stat_date: '2026-09-01', count: 3 },
  ],
  total_days: 30,
  average_daily_usage: 0.5,
  budget_estimation_days: 120,
};

describe('resource stats', () => {
  test('retrieve: sends the period and aggregation as query params and returns the statistics', async () => {
    const { client, requests } = stubClient(() => jsonResponse(stats));

    const response = await client.stats.retrieve({
      start_date: '2026-09-01',
      end_date: '2026-09-30',
      aggregation: 'MONTH',
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/stats');
    expect(Object.fromEntries(requests[0]!.url.searchParams)).toEqual({
      start_date: '2026-09-01',
      end_date: '2026-09-30',
      aggregation: 'MONTH',
    });
    expect(response).toEqual(stats);
  });

  test('retrieve: sends no query string without params', async () => {
    const { client, requests } = stubClient(() => jsonResponse(stats));

    await client.stats.retrieve();

    expect(requests[0]!.url.pathname).toEqual('/api/stats');
    expect(requests[0]!.url.search).toEqual('');
  });
});
