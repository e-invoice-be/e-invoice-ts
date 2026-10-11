import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Webhooks extends APIResource {
  /**
   * Create a new webhook
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._client.post('/api/webhooks/', { body, ...options });
  }

  /**
   * Get a webhook by ID
   */
  retrieve(webhookID: string, options?: RequestOptions): APIPromise<WebhookResponse> {
    return this._client.get(path`/api/webhooks/${webhookID}`, options);
  }

  /**
   * Update a webhook by ID
   */
  update(
    webhookID: string,
    body: WebhookUpdateParams,
    options?: RequestOptions,
  ): APIPromise<WebhookResponse> {
    return this._client.put(path`/api/webhooks/${webhookID}`, { body, ...options });
  }

  /**
   * Get all webhooks for the current tenant
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/api/webhooks/', options);
  }

  /**
   * Delete a webhook
   */
  delete(webhookID: string, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete(path`/api/webhooks/${webhookID}`, options);
  }

  /**
   * Get the history of a webhook
   */
  retrieveHistory(webhookID: string, options?: RequestOptions): APIPromise<WebhookRetrieveHistoryResponse> {
    return this._client.get(path`/api/webhooks/${webhookID}/history`, options);
  }

  /**
   * Send a test event to a webhook for testing and debugging purposes
   */
  test(
    webhookID: string,
    body: WebhookTestParams,
    options?: RequestOptions,
  ): APIPromise<WebhookTestResponse> {
    return this._client.post(path`/api/webhooks/${webhookID}/test`, { body, ...options });
  }
}

/**
 * Response model for webhook API endpoints.
 */
export interface WebhookResponse {
  id: string;

  events: Array<string>;

  secret: string;

  url: string;

  enabled?: boolean;
}

export type WebhookListResponse = Array<WebhookResponse>;

/**
 * Model for webhook deletion.
 */
export interface WebhookDeleteResponse {
  is_deleted: boolean;
}

export interface WebhookRetrieveHistoryResponse {
  history: Array<{ [key: string]: unknown }>;
}

/**
 * Schema for webhook test response.
 */
export interface WebhookTestResponse {
  /**
   * Descriptive message about the test result
   */
  message: string;

  /**
   * Whether the test completed successfully
   */
  success: boolean;

  /**
   * Result from process_webhook_task
   */
  webhook_delivery_result: { [key: string]: unknown };
}

export interface WebhookCreateParams {
  events: Array<string>;

  url: string;

  enabled?: boolean;
}

export interface WebhookUpdateParams {
  enabled?: boolean | null;

  events?: Array<string> | null;

  url?: string | null;
}

export interface WebhookTestParams {
  /**
   * Custom event data payload
   */
  data: { [key: string]: unknown };

  /**
   * Must be valid WebhookEventType
   */
  event_type: string;
}

export declare namespace Webhooks {
  export {
    type WebhookResponse as WebhookResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookRetrieveHistoryResponse as WebhookRetrieveHistoryResponse,
    type WebhookTestResponse as WebhookTestResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookTestParams as WebhookTestParams,
  };
}
