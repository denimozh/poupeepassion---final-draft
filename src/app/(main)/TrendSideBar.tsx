import { validateRequest } from '@/auth'
import FollowButton from '@/components/FollowButton';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import React, { Suspense } from 'react'

const TrendSideBar = () => {
  return (
    <div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none'>
      <Suspense fallback={<Loader2 className='mx-auto animate-spin'/>}>
        <WhoToFollow/>
      </Suspense>
    </div>
  )
}

async function WhoToFollow(){
    const { user } = await validateRequest();

    if(!user) return null;

    const usersToFollow = await prisma.user.findMany({
      where: {
        NOT: {
          id: user.id
        },
        followers: {
          none: {
            followerId: user.id,
          }
        }
      },
      select: getUserDataSelect(user.id),
      take: 5
    })

    return <div className='space-y-5 rounded-2xl bg-card p-5 shadow-sm'>
      <div className='text-xl font-bold'>Who to follow</div>
      {usersToFollow.map(user => (
        <div key={user.id} className='flex items-center justify-between gap-3'>
          <Link href={`/users/${user.username}`} className="flex items-center gap-3">
            <UserAvatar avatarUrl={user.avatarUrl} className='flex-none'/>
            <div>
              <p className='line-clamp-1 break-all font-semibold hover:underline'>{user.displayName}</p>
              <p className='line-clamp-1 break-all text-muted-foreground'>@{user.username}</p>
            </div>
          </Link>
          <FollowButton userId={user.id} initalState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({followerId}) => followerId === user.id,
            ),
          }}/>
        </div>
      ))}
    </div>
}
export default TrendSideBar