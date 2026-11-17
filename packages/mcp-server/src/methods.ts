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
    clientCallName: 'client.documents.retrieveTimeline',
    fullyQualifiedName: 'documents.retrieveTimeline',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}/timeline',
  },
  {
    clientCallName: 'client.documents.retrieveLifecycle',
    fullyQualifiedName: 'documents.retrieveLifecycle',
    httpMethod: 'get',
    httpPath: '/api/documents/{document_id}/lifecycle',
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
    clientCallName: 'client.drafts.list',
    fullyQualifiedName: 'drafts.list',
    httpMethod: 'get',
    httpPath: '/api/drafts/',
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
  {
    clientCallName: 'client.webhooks.retrieveHistory',
    fullyQualifiedName: 'webhooks.retrieveHistory',
    httpMethod: 'get',
    httpPath: '/api/webhooks/{webhook_id}/history',
  },
  {
    clientCallName: 'client.webhooks.test',
    fullyQualifiedName: 'webhooks.test',
    httpMethod: 'post',
    httpPath: '/api/webhooks/{webhook_id}/test',
  },
  {
    clientCallName: 'client.mailbox.retrieve',
    fullyQualifiedName: 'mailbox.retrieve',
    httpMethod: 'get',
    httpPath: '/api/mailbox/{inbound_email_id}',
  },
  {
    clientCallName: 'client.mailbox.list',
    fullyQualifiedName: 'mailbox.list',
    httpMethod: 'get',
    httpPath: '/api/mailbox/',
  },
  {
    clientCallName: 'client.mailbox.downloadAttachment',
    fullyQualifiedName: 'mailbox.downloadAttachment',
    httpMethod: 'get',
    httpPath: '/api/mailbox/{inbound_email_id}/attachments/{filename}',
  },
  {
    clientCallName: 'client.mailbox.reprocess',
    fullyQualifiedName: 'mailbox.reprocess',
    httpMethod: 'post',
    httpPath: '/api/mailbox/{inbound_email_id}/reprocess',
  },
  {
    clientCallName: 'client.stats.retrieve',
    fullyQualifiedName: 'stats.retrieve',
    httpMethod: 'get',
    httpPath: '/api/stats',
  },
  {
    clientCallName: 'client.conversion.pdf.create',
    fullyQualifiedName: 'conversion.pdf.create',
    httpMethod: 'post',
    httpPath: '/api/conversion/pdf',
  },
  {
    clientCallName: 'client.conversion.pdf.retrieve',
    fullyQualifiedName: 'conversion.pdf.retrieve',
    httpMethod: 'get',
    httpPath: '/api/conversion/pdf/{task_id}',
  },
  {
    clientCallName: 'client.conversion.pdf.retrieveResult',
    fullyQualifiedName: 'conversion.pdf.retrieveResult',
    httpMethod: 'get',
    httpPath: '/api/conversion/pdf/{task_id}/result',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    const allowedMethodsSet = new Set<SdkMethod>();

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
            `Invalid regex pattern for allowed method: "${pattern}": ${
              e instanceof Error ? e.message : String(e)
            }`,
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
          `Invalid regex pattern for blocked method: "${pattern}": ${
            e instanceof Error ? e.message : String(e)
          }`,
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

/**
 * Method restrictions requested by a client for a single request. The fields have the same meaning as
 * the `codeAllowHttpGets`, `codeAllowedMethods` and `codeBlockedMethods` options.
 */
export type ClientMethodPermissions = {
  allowHttpGets?: boolean | undefined;
  allowedMethods?: string[] | undefined;
  blockedMethods?: string[] | undefined;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const MAX_CLIENT_METHOD_PATTERN_LENGTH = 128;
const MAX_CLIENT_METHOD_QUANTIFIERS = 8;
const MAX_QUANTIFIER_BOUND = 100;

type PatternAtom = { kind: 'group'; hasRepetition: boolean } | { kind: 'other' };

/**
 * Rejects client method patterns whose repetition is nested or unbounded in size.
 * Matching then stays proportional to the pattern and the fixed list of method names.
 */
export function assertSafeClientMethodPattern(pattern: string): void {
  if (pattern.length > MAX_CLIENT_METHOD_PATTERN_LENGTH) {
    throw new Error(`method pattern is longer than ${MAX_CLIENT_METHOD_PATTERN_LENGTH} characters`);
  }

  let quantifiers = 0;
  const groups: { hasRepetition: boolean }[] = [];
  let lastAtom: PatternAtom | undefined;
  let i = 0;

  const markQuantifier = (repeating: boolean) => {
    quantifiers += 1;
    if (quantifiers > MAX_CLIENT_METHOD_QUANTIFIERS) {
      throw new Error('method pattern has too many quantifiers');
    }
    if (repeating && lastAtom?.kind === 'group' && lastAtom.hasRepetition) {
      throw new Error('method pattern contains nested repetition');
    }
    if (repeating) {
      const current = groups[groups.length - 1];
      if (current) current.hasRepetition = true;
    }
    lastAtom = { kind: 'other' };
  };

  while (i < pattern.length) {
    const char = pattern[i]!;
    if (char === '\\') {
      if (i + 1 >= pattern.length) {
        throw new Error('method pattern has a trailing escape');
      }
      i += 2;
      lastAtom = { kind: 'other' };
      continue;
    }
    if (char === '[') {
      i += 1;
      if (pattern[i] === '^') i += 1;
      let closed = false;
      while (i < pattern.length) {
        if (pattern[i] === '\\') {
          i += 2;
          continue;
        }
        if (pattern[i] === ']') {
          closed = true;
          i += 1;
          break;
        }
        i += 1;
      }
      if (!closed) {
        throw new Error('method pattern has an unterminated character class');
      }
      lastAtom = { kind: 'other' };
      continue;
    }
    if (char === '(') {
      i += 1;
      if (pattern[i] === '?') {
        i += 1;
        const next = pattern[i];
        if (next === '<') {
          i += 1;
          if (pattern[i] === '=' || pattern[i] === '!') {
            i += 1;
          } else {
            while (i < pattern.length && pattern[i] !== '>') i += 1;
            i += 1;
          }
        } else if (next === '=' || next === '!' || next === ':') {
          i += 1;
        } else {
          while (i < pattern.length && /[a-zA-Z-]/.test(pattern[i]!)) i += 1;
          if (pattern[i] === ':') i += 1;
        }
      }
      groups.push({ hasRepetition: false });
      lastAtom = undefined;
      continue;
    }
    if (char === ')') {
      const group = groups.pop();
      if (!group) {
        throw new Error('method pattern has an unmatched )');
      }
      lastAtom = { kind: 'group', hasRepetition: group.hasRepetition };
      i += 1;
      continue;
    }
    if (char === '*' || char === '+' || char === '?') {
      markQuantifier(char !== '?');
      i += 1;
      if (pattern[i] === '?') i += 1;
      continue;
    }
    if (char === '{') {
      const match = /^\{(\d+)(,(\d+)?)?\}/.exec(pattern.slice(i));
      if (match) {
        const min = Number(match[1]);
        const max =
          match[2] === undefined ? min
          : match[3] === undefined ? undefined
          : Number(match[3]);
        if (min > MAX_QUANTIFIER_BOUND || (max !== undefined && (max > MAX_QUANTIFIER_BOUND || max < min))) {
          throw new Error('method pattern quantifier is too large');
        }
        // An exact `{n}` does not branch. `{n,}` and `{n,m}` do.
        markQuantifier(match[2] !== undefined && max !== min);
        i += match[0].length;
        if (pattern[i] === '?') i += 1;
        continue;
      }
    }
    lastAtom = { kind: 'other' };
    i += 1;
  }

  if (groups.length > 0) {
    throw new Error('method pattern has an unmatched (');
  }
}

/**
 * Applies a client's method restrictions on top of the operator's options. The result allows a method
 * only if both the operator's options and the client's permissions allow it, so a client can narrow the
 * operator's configuration but never widen it.
 */
export function narrowCodeToolOptions(options: McpOptions, permissions: ClientMethodPermissions): McpOptions {
  for (const pattern of [...(permissions.allowedMethods ?? []), ...(permissions.blockedMethods ?? [])]) {
    assertSafeClientMethodPattern(pattern);
  }

  const blockedByClient =
    blockedMethodsForCodeTool({
      codeAllowHttpGets: permissions.allowHttpGets,
      codeAllowedMethods: permissions.allowedMethods,
      codeBlockedMethods: permissions.blockedMethods,
    })?.map((method) => `^${escapeRegExp(method.fullyQualifiedName)}$`) ?? [];

  if (blockedByClient.length === 0) {
    return options;
  }
  return { ...options, codeBlockedMethods: [...(options.codeBlockedMethods ?? []), ...blockedByClient] };
}
