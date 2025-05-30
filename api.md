# Documents

Types:

- <code><a href="./src/resources/documents/documents.ts">CurrencyCode</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentAttachmentCreate</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentCreate</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentDirection</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentResponse</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentType</a></code>
- <code><a href="./src/resources/documents/documents.ts">PaymentDetailCreate</a></code>
- <code><a href="./src/resources/documents/documents.ts">UnitOfMeasureCode</a></code>
- <code><a href="./src/resources/documents/documents.ts">DocumentDeleteResponse</a></code>

Methods:

- <code title="post /api/documents/">client.documents.<a href="./src/resources/documents/documents.ts">create</a>({ ...params }) -> DocumentResponse</code>
- <code title="get /api/documents/{document_id}">client.documents.<a href="./src/resources/documents/documents.ts">retrieve</a>(documentID) -> DocumentResponse</code>
- <code title="delete /api/documents/{document_id}">client.documents.<a href="./src/resources/documents/documents.ts">delete</a>(documentID) -> DocumentDeleteResponse</code>
- <code title="post /api/documents/{document_id}/send">client.documents.<a href="./src/resources/documents/documents.ts">send</a>(documentID, { ...params }) -> DocumentResponse</code>

## Attachments

Types:

- <code><a href="./src/resources/documents/attachments.ts">DocumentAttachment</a></code>
- <code><a href="./src/resources/documents/attachments.ts">AttachmentListResponse</a></code>
- <code><a href="./src/resources/documents/attachments.ts">AttachmentDeleteResponse</a></code>

Methods:

- <code title="get /api/documents/{document_id}/attachments/{attachment_id}">client.documents.attachments.<a href="./src/resources/documents/attachments.ts">retrieve</a>(attachmentID, { ...params }) -> DocumentAttachment</code>
- <code title="get /api/documents/{document_id}/attachments">client.documents.attachments.<a href="./src/resources/documents/attachments.ts">list</a>(documentID) -> AttachmentListResponse</code>
- <code title="delete /api/documents/{document_id}/attachments/{attachment_id}">client.documents.attachments.<a href="./src/resources/documents/attachments.ts">delete</a>(attachmentID, { ...params }) -> AttachmentDeleteResponse</code>
- <code title="post /api/documents/{document_id}/attachments">client.documents.attachments.<a href="./src/resources/documents/attachments.ts">add</a>(documentID, { ...params }) -> DocumentAttachment</code>

## Ubl

Types:

- <code><a href="./src/resources/documents/ubl.ts">UblGetResponse</a></code>

Methods:

- <code title="get /api/documents/{document_id}/ubl">client.documents.ubl.<a href="./src/resources/documents/ubl.ts">get</a>(documentID) -> UblGetResponse</code>

# Inbox

Types:

- <code><a href="./src/resources/inbox.ts">DocumentState</a></code>
- <code><a href="./src/resources/inbox.ts">PaginatedDocumentResponse</a></code>

Methods:

- <code title="get /api/inbox/">client.inbox.<a href="./src/resources/inbox.ts">list</a>({ ...params }) -> PaginatedDocumentResponse</code>
- <code title="get /api/inbox/credit-notes">client.inbox.<a href="./src/resources/inbox.ts">listCreditNotes</a>({ ...params }) -> PaginatedDocumentResponse</code>
- <code title="get /api/inbox/invoices">client.inbox.<a href="./src/resources/inbox.ts">listInvoices</a>({ ...params }) -> PaginatedDocumentResponse</code>

# Outbox

Methods:

- <code title="get /api/outbox/drafts">client.outbox.<a href="./src/resources/outbox.ts">listDraftDocuments</a>({ ...params }) -> PaginatedDocumentResponse</code>
- <code title="get /api/outbox/">client.outbox.<a href="./src/resources/outbox.ts">listReceivedDocuments</a>({ ...params }) -> PaginatedDocumentResponse</code>

# Validate

Types:

- <code><a href="./src/resources/validate.ts">UblDocumentValidation</a></code>
- <code><a href="./src/resources/validate.ts">ValidateValidatePeppolIDResponse</a></code>

Methods:

- <code title="post /api/validate/json">client.validate.<a href="./src/resources/validate.ts">validateJson</a>({ ...params }) -> UblDocumentValidation</code>
- <code title="get /api/validate/peppol-id">client.validate.<a href="./src/resources/validate.ts">validatePeppolID</a>({ ...params }) -> ValidateValidatePeppolIDResponse</code>
- <code title="post /api/validate/ubl">client.validate.<a href="./src/resources/validate.ts">validateUbl</a>({ ...params }) -> UblDocumentValidation</code>

# Lookup

Types:

- <code><a href="./src/resources/lookup.ts">Certificate</a></code>
- <code><a href="./src/resources/lookup.ts">LookupRetrieveResponse</a></code>

Methods:

- <code title="get /api/lookup">client.lookup.<a href="./src/resources/lookup.ts">retrieve</a>({ ...params }) -> LookupRetrieveResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookListResponse</a></code>
- <code><a href="./src/resources/webhooks.ts">WebhookDeleteResponse</a></code>

Methods:

- <code title="post /api/webhooks/">client.webhooks.<a href="./src/resources/webhooks.ts">create</a>({ ...params }) -> WebhookResponse</code>
- <code title="get /api/webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks.ts">retrieve</a>(webhookID) -> WebhookResponse</code>
- <code title="put /api/webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks.ts">update</a>(webhookID, { ...params }) -> WebhookResponse</code>
- <code title="get /api/webhooks/">client.webhooks.<a href="./src/resources/webhooks.ts">list</a>() -> WebhookListResponse</code>
- <code title="delete /api/webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks.ts">delete</a>(webhookID) -> WebhookDeleteResponse</code>
