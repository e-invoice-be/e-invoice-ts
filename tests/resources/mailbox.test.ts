import { emptyPage, jsonResponse, stubClient } from './stub-client';

const inboundEmail = {
  id: 'ie_1',
  message_id: '<abc@mail.example.com>',
  sender_email: 'supplier@example.com',
  sender_name: 'Supplier',
  to_addresses: 'inbox@example.com',
  cc_addresses: null,
  bcc_addresses: null,
  subject: 'Invoice 2026-001',
  attachments: [{ filename: 'invoice.pdf', size: 1024, content_type: 'application/pdf' }],
  attachment_count: 1,
  processed: false,
  error_message: 'No UBL found',
  received_at: '2026-10-01T08:00:00Z',
  created_at: '2026-10-01T08:00:01Z',
  processed_at: null,
  document_id: null,
};

describe('resource mailbox', () => {
  test('list: sends the filters as query params and returns a page of inbound emails', async () => {
    const { client, requests } = stubClient(() =>
      jsonResponse({
        items: [inboundEmail],
        total: 1,
        page: 1,
        page_size: 20,
        pages: 1,
        has_next_page: false,
      }),
    );

    const page = await client.mailbox.list({
      page: 1,
      page_size: 20,
      status: 'failed',
      processed: false,
      received_from: '2026-10-01T00:00:00Z',
      received_to: '2026-10-31T23:59:59Z',
      search: 'invoice',
      sort_by: 'created_at',
      sort_order: 'asc',
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/mailbox/');
    expect(Object.fromEntries(requests[0]!.url.searchParams)).toEqual({
      page: '1',
      page_size: '20',
      status: 'failed',
      processed: 'false',
      received_from: '2026-10-01T00:00:00Z',
      received_to: '2026-10-31T23:59:59Z',
      search: 'invoice',
      sort_by: 'created_at',
      sort_order: 'asc',
    });
    expect(page.items).toEqual([inboundEmail]);
  });

  test('list: sends no query string without params', async () => {
    const { client, requests } = stubClient(() => jsonResponse(emptyPage));

    await client.mailbox.list();

    expect(requests[0]!.url.pathname).toEqual('/api/mailbox/');
    expect(requests[0]!.url.search).toEqual('');
  });

  test('retrieve: requests GET /api/mailbox/{inbound_email_id}', async () => {
    const { client, requests } = stubClient(() => jsonResponse(inboundEmail));

    const email = await client.mailbox.retrieve('ie/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/mailbox/ie%2F1');
    expect(email).toEqual(inboundEmail);
  });

  test('reprocess: requests POST /api/mailbox/{inbound_email_id}/reprocess without a body', async () => {
    const { client, requests } = stubClient(() => jsonResponse(inboundEmail));

    const email = await client.mailbox.reprocess('ie/1');

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('POST');
    expect(requests[0]!.url.pathname).toEqual('/api/mailbox/ie%2F1/reprocess');
    expect(requests[0]!.body).toBeUndefined();
    expect(email).toEqual(inboundEmail);
  });

  test('downloadAttachment: returns the raw binary response', async () => {
    const { client, requests } = stubClient(
      () =>
        new Response(new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x00, 0xff]), {
          headers: { 'Content-Type': 'application/pdf' },
        }),
    );

    const response = await client.mailbox.downloadAttachment('invoice 1.pdf', { inbound_email_id: 'ie_1' });

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('GET');
    expect(requests[0]!.url.pathname).toEqual('/api/mailbox/ie_1/attachments/invoice%201.pdf');
    expect(requests[0]!.url.search).toEqual('');
    expect(response).toBeInstanceOf(Response);
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([
      0x25, 0x50, 0x44, 0x46, 0x00, 0xff,
    ]);
  });
});
