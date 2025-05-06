import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const path = context.params.path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';

  try {
    const response = await fetch(`${BACKEND_URL}/api/${path}${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(request.headers.get('Authorization')
          ? { 'Authorization': request.headers.get('Authorization') as string }
          : {})
      },
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(`Error proxying GET request to /api/${path}:`, error);

    // Return a fallback response with local storage option
    return NextResponse.json(
      { error: 'API endpoint not available, using local storage fallback' },
      { status: 503 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const path = context.params.path.join('/');

  try {
    const body = await request.json().catch(() => ({}));

    const response = await fetch(`${BACKEND_URL}/api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('Authorization')
          ? { 'Authorization': request.headers.get('Authorization') as string }
          : {})
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(`Error proxying POST request to /api/${path}:`, error);

    return NextResponse.json(
      { error: 'API endpoint not available' },
      { status: 503 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const path = context.params.path.join('/');

  try {
    const body = await request.json().catch(() => ({}));

    const response = await fetch(`${BACKEND_URL}/api/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('Authorization')
          ? { 'Authorization': request.headers.get('Authorization') as string }
          : {})
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(`Error proxying PUT request to /api/${path}:`, error);

    return NextResponse.json(
      { error: 'API endpoint not available' },
      { status: 503 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const path = context.params.path.join('/');

  try {
    const response = await fetch(`${BACKEND_URL}/api/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('Authorization')
          ? { 'Authorization': request.headers.get('Authorization') as string }
          : {})
      },
    });

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(`Error proxying DELETE request to /api/${path}:`, error);

    return NextResponse.json(
      { error: 'API endpoint not available' },
      { status: 503 }
    );
  }
}
