import { Metadata } from 'next'
import signupImage from "@/assets/signupImage.jpg"
import Image from 'next/image'
import Link from 'next/link'
import SignUpForm from './SignUpForm'

export const metadata: Metadata = {
    title: "Sign up"
}

const page = () => {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
        <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl'>
            <div className='w-full space-y-10 overflow-y-auto p-10 md:w-1/2'>
                <div className='space-y-1 text-center'>
                    <h1 className='text-3xl font-bold'>Sign up to Poupee Passion</h1>
                    <p className='text-muted-foreground'>Buy Dolls, Share you Collection, Talk to others</p>
                </div>
                <div className='space-y-5'>
                    <SignUpForm/>
                    <Link href={"/login"} className='block text-center hover:underline'>
                        Already have an account? <span className='text-primary'>Log in</span>
                    </Link>
                </div>
            </div>
            <Image src={signupImage} alt='' className='hidden w-1/2 object-cover md:block'/>
        </div>
    </main>
  )
}

export default page