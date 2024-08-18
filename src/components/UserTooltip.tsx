"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import { PropsWithChildren } from "react";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import Linkify from "./Linkify";
import FollowerCount from "./FollowerCount";

interface UserTooltipProps extends PropsWithChildren {
    user: UserData
}

export default function UserTooltip({children, user}: UserTooltipProps) {
    const { user: loggedInUser } = useSession();

    const followerState: FollowerInfo = {
        followers: user._count.followers,
        isFollowedByUser: !!user.followers.some(
            ({followerId}) => followerId === loggedInUser.id
        )
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <div className="z-50 flex max-w-80 min-w-52 w-fit flex-col gap-3 break-words px-4 py-4 bg-popover border-gray-700 rounded-xl shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                        <div className="flex items-center justify-between gap-2">
                            <Link href={`/users/${user.username}`}>
                                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
                            </Link>
                            {loggedInUser.id !== user.id && (
                                <FollowButton userId={user.id} initialState={followerState} />
                            )}
                        </div>
                        <div>
                            <Link href={`/users/${user.username}`}>
                                <div className="text-lg font-semibold hover:underline">
                                    {user.displayName}
                                </div>
                                <div className="text-muted-foreground">
                                    @{user.username}
                                </div>
                            </Link>
                        </div>
                        {user.bio && (
                            <Linkify>
                                <div className="line-clamp-4 whitespace-pre-line"> 
                                    {user.bio}
                                </div>
                            </Linkify>
                        )}
                        <FollowerCount userId={user.id} initialState={followerState}/>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}