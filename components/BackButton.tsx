import { useRouter } from 'next/router';
import React from 'react';
import Button from './Button';

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <Button
      text="Back"
      className={`mt-6 ml-6 py-1 px-3 bg-slate-600 text-white mb-4 ${
        className ?? ''
      }`}
      onClick={router.back}
    />
  );
};

export default BackButton;
