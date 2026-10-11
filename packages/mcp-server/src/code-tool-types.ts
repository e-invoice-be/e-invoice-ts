export type WorkerOutput = {
  is_error: boolean;
  result: unknown | null;
  log_lines: string[];
  err_lines: string[];
};
