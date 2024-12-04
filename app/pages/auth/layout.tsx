import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* This layout wraps around login and signup pages */}
      {children}
    </>
  );
};

export default AuthLayout;
