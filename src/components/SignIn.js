import React from 'react';
// import { Button } from 'react-bootstrap';
import { Button } from '@mui/material';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="w-1/2 h-[500px] d-flex flex-col justify-center">
      <p className="mx-2">Welcome to</p>
      <h1 className="text-[180px]/[160px]">Local Tours</h1>
      <p className="ml-60">Click the button to get started</p>
      <Button variant="outlined" className="w-[470px] mt-3 mx-1 text-white border-transparent hover:border-white" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
