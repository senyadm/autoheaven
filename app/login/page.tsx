import { InputField } from '@/components/ui/input-field'
import { InputWithLabel } from '@/components/input-with-label'
import React from 'react'
import Image from 'next/image'
import logo from '../../public/autoheven_logo.svg'
import { Button } from "@/components/ui/button"

const Login = () => {
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-4 rounded-lg shadow ">
        <div className='flex flex-col justify-center text-center'>
 <div className="mx-auto mb-6">
    <Image src={logo} height={30} width={30} alt="" />
  </div>
         <h3 className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Sign-up</h3>
    <InputWithLabel label='Email' placeholder='ava.wright@gmail.com'/>
     <InputWithLabel label='Password' placeholder='ava.wright@gmail.com'/>
      <Button >
            Sign up
          </Button>
        </div>
      
      </div>
    </div>
  );
}

export default Login