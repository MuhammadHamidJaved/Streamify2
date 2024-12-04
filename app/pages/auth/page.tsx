'use client';
import React from 'react';
import Container from '../../../components/Container';
// import { useSession } from '@/components/Context/SessionContext';
const AuthPage = () => {
  // const session = useSession();
  return (
    <div style={{width:'100%',height:'100%'}}>
      <Container  />
      {/* <h1>{session.session?session.session:'one  to 3'}</h1> */}
    </div>
  );
};

export default AuthPage;
