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

  test('retrieveLifecycle: requests GET /api/documents/{document_id}/lifecycle and returns the events', async () => {
    const lifecycle = {
      document_id: 'doc_1',
      events: [
        {
          canonical_status: 'delivered',
          direction: 'in',
          level: 'transport',
          native_code: 'AP',
          occurred_at: '2026-01-01T00:00:00Z',
          reason: null,
          reason_code: null,
          source: 'peppol:mlr',
        },
        {
          canonical_status: null,
          direction: 'in',
          level: 'business',
          native_code: 'XX',
          occurred_at: '2026-01-02T00:00:00Z',
          reason: 'Unknown status',
          reason_code: 'OTH',
          source: 'peppol:imr',
        },
      ],
    };
    const { client, requests } = stubClient(() => jsonResponse(lifecycle));

    const result = await client.documents.retrieveLifecycle('doc/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/documents/doc%2F1/lifecycle');
    expect(requests[0]!.url.search).toEqual('');
    expect(result).toEqual(lifecycle);
  });

  test('create: sends the document fields and line item fields in the body', async () => {
    const { client, requests } = stubClient(() =>
      jsonResponse({ id: 'doc_1', created_at: '2026-01-01T00:00:00Z' }),
    );

    const body = {
      buyer_reference: 'COST-CENTRE-42',
      currency: 'EUR' as const,
      customer_phone: '+49 89 7654321',
      document_type: 'CREDIT_NOTE' as const,
      items: [
        {
          date: '2026-01-15',
          description: 'Ergonomic wireless mouse',
          name: 'Wireless mouse',
          price_base_quantity: '100',
          quantity: 200,
          unit_price: '12.50',
        },
      ],
      preceding_invoice_date: '2025-12-31',
      preceding_invoice_id: 'INV-2025-001',
      rounding_amount: -0.25,
      sales_order: 'SO-7',
      tax_currency: 'SEK',
      total_tax_in_tax_currency: '57.40',
      vendor_phone: '+49 30 1234567',
    };
    const document = await client.documents.create({ ...body, construct_pdf: true });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('POST');
    expect(requests[0]!.url.pathname).toEqual('/api/documents/');
    expect(requests[0]!.url.searchParams.get('construct_pdf')).toEqual('true');
    expect(requests[0]!.body).toEqual(body);
    expect(document).toEqual({ id: 'doc_1', created_at: '2026-01-01T00:00:00Z' });
  });
});
