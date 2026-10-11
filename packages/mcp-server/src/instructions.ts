import fs from 'fs/promises';
import { getLogger } from './logger';

const INSTRUCTIONS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface InstructionsCacheEntry {
  fetchedInstructions: string;
  fetchedAt: number;
}

const DEFAULT_INSTRUCTIONS = `
This is the e-invoice-api MCP server. Use it to interact with the e-invoice.be Peppol API.

Available tools:
- search_docs: Search SDK documentation to find the right methods and parameters.
- execute: Run TypeScript code against a pre-authenticated SDK client. Define an async run(client) function.

Workflow:
- If unsure about the API, call search_docs first.
- Write complete solutions in a single execute call when possible. For large datasets, use API filters to narrow results or paginate within a single execute block.
- If execute returns an error, read the error and fix your code rather than retrying the same approach.
- Variables do not persist between execute calls. Return or log all data you need.
- If a request to the API times out, try a smaller query or add filters.
`;

const instructionsCache = new Map<string, InstructionsCacheEntry>();

export async function getInstructions({
  customInstructionsPath,
}: {
  customInstructionsPath?: string | undefined;
}): Promise<string> {
  if (!customInstructionsPath) {
    return DEFAULT_INSTRUCTIONS;
  }

  const now = Date.now();
  const cacheKey = customInstructionsPath;
  const cached = instructionsCache.get(cacheKey);

  if (cached && now - cached.fetchedAt <= INSTRUCTIONS_CACHE_TTL_MS) {
    return cached.fetchedInstructions;
  }

  // Evict stale entries so the cache doesn't grow unboundedly.
  for (const [key, entry] of instructionsCache) {
    if (now - entry.fetchedAt > INSTRUCTIONS_CACHE_TTL_MS) {
      instructionsCache.delete(key);
    }
  }

  const fetchedInstructions = await fetchLatestInstructionsFromFile(customInstructionsPath);

  instructionsCache.set(cacheKey, { fetchedInstructions, fetchedAt: now });
  return fetchedInstructions;
}

async function fetchLatestInstructionsFromFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf-8');
  } catch (error) {
    getLogger().error({ error, path }, 'Error fetching instructions from file');
    throw error;
  }
}
