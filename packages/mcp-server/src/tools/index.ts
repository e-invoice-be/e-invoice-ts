// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_documents from './documents/create-documents';
import retrieve_documents from './documents/retrieve-documents';
import delete_documents from './documents/delete-documents';
import create_from_pdf_documents from './documents/create-from-pdf-documents';
import send_documents from './documents/send-documents';
import validate_documents from './documents/validate-documents';
import retrieve_documents_attachments from './documents/attachments/retrieve-documents-attachments';
import list_documents_attachments from './documents/attachments/list-documents-attachments';
import delete_documents_attachments from './documents/attachments/delete-documents-attachments';
import add_documents_attachments from './documents/attachments/add-documents-attachments';
import create_from_ubl_documents_ubl from './documents/ubl/create-from-ubl-documents-ubl';
import get_documents_ubl from './documents/ubl/get-documents-ubl';
import list_inbox from './inbox/list-inbox';
import list_credit_notes_inbox from './inbox/list-credit-notes-inbox';
import list_invoices_inbox from './inbox/list-invoices-inbox';
import list_draft_documents_outbox from './outbox/list-draft-documents-outbox';
import list_received_documents_outbox from './outbox/list-received-documents-outbox';
import validate_json_validate from './validate/validate-json-validate';
import validate_peppol_id_validate from './validate/validate-peppol-id-validate';
import validate_ubl_validate from './validate/validate-ubl-validate';
import retrieve_lookup from './lookup/retrieve-lookup';
import retrieve_participants_lookup from './lookup/retrieve-participants-lookup';
import retrieve_me from './me/retrieve-me';
import create_webhooks from './webhooks/create-webhooks';
import retrieve_webhooks from './webhooks/retrieve-webhooks';
import update_webhooks from './webhooks/update-webhooks';
import list_webhooks from './webhooks/list-webhooks';
import delete_webhooks from './webhooks/delete-webhooks';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_documents);
addEndpoint(retrieve_documents);
addEndpoint(delete_documents);
addEndpoint(create_from_pdf_documents);
addEndpoint(send_documents);
addEndpoint(validate_documents);
addEndpoint(retrieve_documents_attachments);
addEndpoint(list_documents_attachments);
addEndpoint(delete_documents_attachments);
addEndpoint(add_documents_attachments);
addEndpoint(create_from_ubl_documents_ubl);
addEndpoint(get_documents_ubl);
addEndpoint(list_inbox);
addEndpoint(list_credit_notes_inbox);
addEndpoint(list_invoices_inbox);
addEndpoint(list_draft_documents_outbox);
addEndpoint(list_received_documents_outbox);
addEndpoint(validate_json_validate);
addEndpoint(validate_peppol_id_validate);
addEndpoint(validate_ubl_validate);
addEndpoint(retrieve_lookup);
addEndpoint(retrieve_participants_lookup);
addEndpoint(retrieve_me);
addEndpoint(create_webhooks);
addEndpoint(retrieve_webhooks);
addEndpoint(update_webhooks);
addEndpoint(list_webhooks);
addEndpoint(delete_webhooks);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
