import React from 'react';

import { auth } from '@/auth';
import LoginButton from '@/components/auth/LoginButton';
import { SignOutButton } from '@/components/auth/SignOutButton';

const Page = async () => {
  const session = await auth();
  return (
    <div>
      Home
      {session?.user ? <SignOutButton /> : <LoginButton />}
    </div>
  );
};

export default Page;
