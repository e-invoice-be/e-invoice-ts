import { multipartFormRequestOptions, createForm } from 'e-invoice-api/internal/uploads';
import { toFile } from 'e-invoice-api/core/uploads';
import fs from 'fs';

describe('form data validation', () => {
  test('valid values do not error', async () => {
    await multipartFormRequestOptions(
      {
        body: {
          foo: 'foo',
          string: 1,
          bool: true,
          file: await toFile(Buffer.from('some-content')),
          blob: new Blob(['Some content'], { type: 'text/plain' }),
        },
      },
      fetch,
    );
  });

  test('null', async () => {
    await expect(() =>
      multipartFormRequestOptions(
        {
          body: {
            null: null,
          },
        },
        fetch,
      ),
    ).rejects.toThrow(TypeError);
  });

  test('undefined is stripped', async () => {
    const form = await createForm(
      {
        foo: undefined,
        bar: 'baz',
      },
      fetch,
    );
    expect(form.has('foo')).toBe(false);
    expect(form.get('bar')).toBe('baz');
  });

  test('nested undefined property is stripped', async () => {
    const form = await createForm(
      {
        bar: {
          baz: undefined,
        },
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([]);

    const form2 = await createForm(
      {
        bar: {
          foo: 'string',
          baz: undefined,
        },
      },
      fetch,
    );
    expect(Array.from(form2.entries())).toEqual([['bar[foo]', 'string']]);
  });

  test('nested undefined array item is stripped', async () => {
    const form = await createForm(
      {
        bar: [undefined, undefined],
      },
      fetch,
    );
    expect(Array.from(form.entries())).toEqual([]);

    const form2 = await createForm(
      {
        bar: [undefined, 'foo'],
      },
      fetch,
    );
    expect(Array.from(form2.entries())).toEqual([['bar[]', 'foo']]);
  });

  test('Response values are uploaded as files named after the URL', async () => {
    const response = new Response('<Invoice/>');
    Object.defineProperty(response, 'url', { value: 'https://example.com/invoices/invoice.xml' });
    const form = await createForm({ file: response }, fetch);
    const file = form.get('file') as File;
    expect(file).toBeInstanceOf(File);
    expect(file.name).toEqual('invoice.xml');
    expect(await file.text()).toEqual('<Invoice/>');
  });

  test('streams (e.g. fs.ReadStream) are uploaded as files named after the path', async () => {
    const form = await createForm({ file: fs.createReadStream(__filename) }, fetch);
    const file = form.get('file') as File;
    expect(file).toBeInstanceOf(File);
    expect(file.name).toEqual('form.test.ts');
    expect(await file.text()).toEqual(await fs.promises.readFile(__filename, 'utf-8'));
  });

  test('unsupported values are rejected', async () => {
    await expect(createForm({ fn: () => {} }, fetch)).rejects.toThrow(
      /Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob/,
    );
  });

  test('a fetch implementation without FormData support is rejected', async () => {
    // mimics node-fetch, which stringifies a global FormData body to "[object FormData]"
    class StringifyingResponse extends Response {
      constructor(body: unknown) {
        super(String(body));
      }
    }
    const legacyFetch = Object.assign(async () => new Response(), { Response: StringifyingResponse });
    await expect(createForm({ foo: 'bar' }, legacyFetch as any)).rejects.toThrow(
      'The provided fetch function does not support file uploads with the current global FormData class.',
    );
  });
});
