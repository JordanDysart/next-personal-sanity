import { NextRequest, NextResponse } from 'next/server';

export default async function membership(req: NextRequest, res: NextResponse) {
  // get submitted form data from request body
  const body = await req.json();

  res.blob('text/plain', 'Hello World');
}
