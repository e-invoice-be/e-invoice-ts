import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.documents.create',
    fullyQualifiedName: 'documents.create',
    httpMethod: 'post',
    httpPath: '/api/documents/',
  },
  {
    clientCallName: 'client.documents.retrieve',
    fullyQualifiedName: 'documents.retrieve',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}',
  },
  {
    clientCallName: 'client.documents.delete',
    fullyQualifiedName: 'documents.delete',
    httpMethod: 'delete',
    httpPath: '/api/documents/{document_id}',
  },
  {
    clientCallName: 'client.documents.createFromPdf',
    fullyQualifiedName: 'documents.createFromPdf',
    httpMethod: 'post',
    httpPath: '/api/documents/pdf',
  },
  {
    clientCallName: 'client.documents.send',
    fullyQualifiedName: 'documents.send',
    httpMethod: 'post',
    httpPath: '/api/documents/{document_id}/send',
  },
  {
    clientCallName: 'client.documents.validate',
    fullyQualifiedName: 'documents.validate',
    httpMethod: 'post',
    httpPath: '/api/documents/{document_id}/validate',
  },
  {
    clientCallName: 'client.documents.attachments.retrieve',
    fullyQualifiedName: 'documents.attachments.retrieve',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}/attachments/{attachment_id}',
  },
  {
    clientCallName: 'client.documents.attachments.list',
    fullyQualifiedName: 'documents.attachments.list',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}/attachments',
  },
  {
    clientCallName: 'client.documents.attachments.delete',
    fullyQualifiedName: 'documents.attachments.delete',
    httpMethod: 'delete',
    httpPath: '/api/documents/{document_id}/attachments/{attachment_id}',
  },
  {
    clientCallName: 'client.documents.attachments.add',
    fullyQualifiedName: 'documents.attachments.add',
    httpMethod: 'post',
    httpPath: '/api/documents/{document_id}/attachments',
  },
  {
    clientCallName: 'client.documents.ubl.createFromUbl',
    fullyQualifiedName: 'documents.ubl.createFromUbl',
    httpMethod: 'post',
    httpPath: '/api/documents/ubl',
  },
  {
    clientCallName: 'client.documents.ubl.get',
    fullyQualifiedName: 'documents.ubl.get',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}/ubl',
  },
  {
    clientCallName: 'client.inbox.list',
    fullyQualifiedName: 'inbox.list',
    httpMethod: 'get',
    httpPath: '/api/inbox/',
  },
  {
    clientCallName: 'client.inbox.listCreditNotes',
    fullyQualifiedName: 'inbox.listCreditNotes',
    httpMethod: 'get',
    httpPath: '/api/inbox/credit-notes',
  },
  {
    clientCallName: 'client.inbox.listInvoices',
    fullyQualifiedName: 'inbox.listInvoices',
    httpMethod: 'get',
    httpPath: '/api/inbox/invoices',
  },
  {
    clientCallName: 'client.outbox.listDraftDocuments',
    fullyQualifiedName: 'outbox.listDraftDocuments',
    httpMethod: 'get',
    httpPath: '/api/outbox/drafts',
  },
  {
    clientCallName: 'client.outbox.listReceivedDocuments',
    fullyQualifiedName: 'outbox.listReceivedDocuments',
    httpMethod: 'get',
    httpPath: '/api/outbox/',
  },
  {
    clientCallName: 'client.validate.validateJson',
    fullyQualifiedName: 'validate.validateJson',
    httpMethod: 'post',
    httpPath: '/api/validate/json',
  },
  {
    clientCallName: 'client.validate.validatePeppolID',
    fullyQualifiedName: 'validate.validatePeppolID',
    httpMethod: 'get',
    httpPath: '/api/validate/peppol-id',
  },
  {
    clientCallName: 'client.validate.validateUbl',
    fullyQualifiedName: 'validate.validateUbl',
    httpMethod: 'post',
    httpPath: '/api/validate/ubl',
  },
  {
    clientCallName: 'client.lookup.retrieve',
    fullyQualifiedName: 'lookup.retrieve',
    httpMethod: 'get',
    httpPath: '/api/lookup',
  },
  {
    clientCallName: 'client.lookup.retrieveParticipants',
    fullyQualifiedName: 'lookup.retrieveParticipants',
    httpMethod: 'get',
    httpPath: '/api/lookup/participants',
  },
  {
    clientCallName: 'client.me.retrieve',
    fullyQualifiedName: 'me.retrieve',
    httpMethod: 'get',
    httpPath: '/api/me/',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/api/webhooks/',
  },
  {
    clientCallName: 'client.webhooks.retrieve',
    fullyQualifiedName: 'webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/api/webhooks/{webhook_id}',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'put',
    httpPath: '/api/webhooks/{webhook_id}',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/api/webhooks/',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/api/webhooks/{webhook_id}',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
