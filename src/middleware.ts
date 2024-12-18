import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

const PORT = process.env.PORT || 3333;

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export default auth((req: NextRequest) => {
  const url = req.nextUrl;

  let hostname = req.headers
    .get('host')!
    .replace(`.localhost:${PORT}`, `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    .replace('www.', '')
    .replace(`:${PORT}`, '');

  console.log('hostname', hostname);

  if (
    hostname.includes('---') &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split('---')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  if (hostname === `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log('rewired to admin');
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, req.url),
    );
  }

  if (hostname === `me.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log('rewired to me');
    return NextResponse.rewrite(
      new URL(`/me${path === '/' ? '' : path}`, req.url),
    );
  }

  if (
    hostname === 'localhost' ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    if (path === '/login') {
      console.log('rewired to login');
      return NextResponse.rewrite(new URL('/login', req.url));
    }

    console.log('rewired to home');
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url),
    );
  }

  console.log(
    'rewired to: ',
    new URL(`/${hostname}${path}`, req.url).toString(),
  );
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});
