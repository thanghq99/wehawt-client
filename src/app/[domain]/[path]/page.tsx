import React from 'react';

const Page = async ({
  params,
}: {
  params: Promise<{ path: string; domain: string }>;
}) => {
  const domain = (await params).domain;
  const path = (await params).path;

  return (
    <div>
      Domain: {domain} <br />
      Path: {path}
    </div>
  );
};

export default Page;
