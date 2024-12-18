import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';
import LoginButton from '@/components/auth/LoginButton';

const Page = async () => {
  const session = await auth();

  if (session?.user) redirect('/');

  return (
    <div>
      Login page
      <LoginButton />
    </div>
  );
};

export default Page;
