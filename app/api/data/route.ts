import { NextResponse } from 'next/server';
import { generateDataBatch } from '@/lib/dataGenerator';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const size = Number(url.searchParams.get('size') ?? '500');
  const now = Date.now();
  const data = generateDataBatch(size, now - 1000, now);
  return NextResponse.json({ data, timestamp: now });
}

