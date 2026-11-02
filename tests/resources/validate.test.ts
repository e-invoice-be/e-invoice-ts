import { jsonResponse, stubClient } from './stub-client';

describe('resource validate', () => {
  test('validateJson: sends the document fields and line item fields in the body', async () => {
    const validation = { id: 'val_1', file_name: null, is_valid: true, issues: [], ubl_document: null };
    const { client, requests } = stubClient(() => jsonResponse(validation));

    const body = {
      buyer_reference: 'COST-CENTRE-42',
      customer_phone: '+49 89 7654321',
      items: [
        {
          date: '2026-01-15',
          name: 'Wireless mouse',
          price_base_quantity: 100,
          quantity: '200',
          unit_price: 12.5,
        },
      ],
      preceding_invoice_date: '2025-12-31',
      preceding_invoice_id: 'INV-2025-001',
      rounding_amount: '0.25',
      sales_order: 'SO-7',
      tax_currency: 'SEK',
      total_tax_in_tax_currency: 57.4,
      vendor_phone: '+49 30 1234567',
    };
    const result = await client.validate.validateJson(body);

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toEqual('POST');
    expect(requests[0]!.url.pathname).toEqual('/api/validate/json');
    expect(requests[0]!.body).toEqual(body);
    expect(result).toEqual(validation);
  });
});
