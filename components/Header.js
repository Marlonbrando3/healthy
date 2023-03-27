import React from 'react'
import Image from 'next/image'
import logo from '../images/logo_healthy_life.png'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='w-full h-20 bg-white fixed drop-shadow-md'>
        <div className='w-[1100px] mx-auto'>
          <a href="/">
            <Image className='h-20 w-auto py-3'
                alt="logo"
                src={logo}
                height={200}
                width={140}
            />
          </a>
        </div>
    </div>
  )
}
