import React from 'react';

const Page = async ({ params }: { params: Promise<{ domain: string }> }) => {
  const domain = (await params).domain;

  return <div>Domain: {domain}</div>;
};

export default Page;
