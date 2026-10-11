import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Stats extends APIResource {
  /**
   * Retrieve usage statistics for billing purposes. Returns statistics for document
   * sent and document received actions, grouped by aggregation period
   * (day/week/month). If no date parameters are provided, returns daily stats for
   * all available data.
   */
  retrieve(
    query: StatRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StatRetrieveResponse> {
    return this._client.get('/api/stats', { query, ...options });
  }
}

/**
 * Statistics response for a tenant.
 */
export interface StatRetrieveResponse {
  /**
   * List of action statistics, one entry per aggregation period per action
   */
  actions: Array<StatRetrieveResponse.Action>;

  /**
   * Aggregation type used
   */
  aggregation: 'DAY' | 'WEEK' | 'MONTH';

  /**
   * Average daily usage (total actions / total days)
   */
  average_daily_usage: number;

  /**
   * End date of the period
   */
  period_end: string;

  /**
   * Start date of the period
   */
  period_start: string;

  /**
   * Tenant ID
   */
  tenant_id: string;

  /**
   * Number of days in the period
   */
  total_days: number;

  /**
   * Estimated days until credits run out (credit_balance / average_daily_usage). 0.0
   * if average_daily_usage is 0 or credit_balance is None
   */
  budget_estimation_days?: number;
}

export namespace StatRetrieveResponse {
  /**
   * Statistics for a specific action in a specific time period.
   */
  export interface Action {
    /**
     * Type of action
     */
    action: 'DOCUMENT_SENT' | 'DOCUMENT_RECEIVED';

    /**
     * Number of occurrences of this action in this period
     */
    count: number;

    /**
     * The date/period this stat represents. For DAY aggregation this is the specific
     * day, for WEEK it's the start of the week, for MONTH it's the first day of the
     * month
     */
    stat_date: string;
  }
}

export interface StatRetrieveParams {
  /**
   * Aggregation type: DAY, WEEK, or MONTH. Defaults to DAY.
   */
  aggregation?: 'DAY' | 'WEEK' | 'MONTH' | null;

  /**
   * End date in yyyy-mm-dd format. If not provided, queries to latest available
   * data.
   */
  end_date?: string | null;

  /**
   * Start date in yyyy-mm-dd format. If not provided, queries from earliest
   * available data.
   */
  start_date?: string | null;
}

export declare namespace Stats {
  export { type StatRetrieveResponse as StatRetrieveResponse, type StatRetrieveParams as StatRetrieveParams };
}
