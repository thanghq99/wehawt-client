import React, { memo } from 'react';

import { signIn } from '@/auth';

type OAuth = 'google';

const LoginButton = ({}: { oauth?: OAuth }) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
};

export default memo(LoginButton);
