import fetch, { Response } from 'node-fetch';
import { join, dirname } from 'path';
import { promises as fs } from 'fs';
import { CACHE_DIR, CACHE_TIMEOUT_MS } from './consts';

export async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function fetchAndCache(url: string, key: string, dir: string = CACHE_DIR): Promise<string> {
  const cacheFile = join(dir, key, "doc.html");
  await fs.mkdir(dirname(cacheFile), { recursive: true });
  if (await fileExists(cacheFile)) {
    const stat = await fs.stat(cacheFile);
    if ((new Date()).valueOf() - stat.mtime.valueOf() < CACHE_TIMEOUT_MS) {
      return  await fs.readFile(cacheFile, "utf-8");
    }
  }
  const body = await (await fetch(url)).text();
  fs.writeFile(cacheFile, body, "utf-8");
  return body;
}
