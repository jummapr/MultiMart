import React from 'react'
import Login from './components/Login';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Login />
    </div>
  )
}

export default LoginPage
