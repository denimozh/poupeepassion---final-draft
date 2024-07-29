import Link from 'next/link'
import React from 'react'
import lightLogo from "@/assets/lightLogo.png"
import darkLogo from "@/assets/darkLogo.png"
import Image from 'next/image'
import UserButton from '@/components/UserButton'
import SearchField from '@/components/SearchField'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-10 bg-card shadow-sm'>
        <div className='max-w-[90rem] mx-auto flex items-center justify-between flex-wrap gap-5 px-5 py-3'>
            <Link href="/" className="text-2xl">
                <Image src={darkLogo} alt='darkLogo' width={70} height={70} className='hidden dark:block'/>
                <Image src={lightLogo} alt='lightLogo' width={70} height={70} className='block dark:hidden'/>
            </Link>
            <SearchField/>
            <UserButton className="sm:ms-auto" />
        </div>
    </header>
  )
}

export default Navbar