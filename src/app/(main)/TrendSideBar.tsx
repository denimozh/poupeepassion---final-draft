import { validateRequest } from '@/auth'
import prisma from '@/lib/prisma';
import { userDataSelect } from '@/lib/types';
import React from 'react'

const TrendSideBar = () => {
  return (
    <div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none'>
        <WhoToFollow/>
    </div>
  )
}

async function WhoToFollow(){
    const { user } = await validateRequest();

    if(!user) return null;

    const usersToFollow = await prisma.user.findMany({
      where: {
        NOT: {
          id: user?.id
        }
      },
      select: userDataSelect,
      take: 5
    })

    return <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='text-xl font-bold'>Who to follow</div>
    </div>
}

export default TrendSideBar