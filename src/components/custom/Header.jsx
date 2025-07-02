import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

export default function Header() {
    const {user,isSignedIn} =useUser();
  return (
    <div className="px-6 py-4 flex items-center justify-between shadow-md bg-white dark:bg-background">
   <Link to={'/'}>
<h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ff5100] to-[#ff7e00] bg-clip-text text-transparent tracking-tight">
    Resumellow
  </h1>
  </Link>
  {isSignedIn?
    <div className='flex gap-2 items-center'>
        <Link to={'dashboard'}>
        <Button variant="outline">Dashboard</Button>
        </Link>
    <UserButton/>
    </div>:
    <Link to={'/auth/sign-in'}>
    <Button className="bg-gradient-to-r from-[#ff5100] to-[#ff7e00] px-6 py-2 rounded-xl shadow-lg hover:brightness-110 transition-all">
      Get Started
    </Button>
    </Link>
  }
  
</div>

  )
}
