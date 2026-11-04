export type WorkerOutput = {
  is_error: boolean;
  result: unknown;
  log_lines: string[];
  err_lines: string[];
};
