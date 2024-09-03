"use client"

import InfiniteScrollContainer from '@/components/InfiniteScrollContainer'
import DeletePostDialog from '@/components/posts/DeletePostDialog'
import Post from '@/components/posts/Post'
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton'
import { Button } from '@/components/ui/button'
import kyInstance from '@/lib/ky'
import { NotificationsPage } from '@/lib/types'
import { useInfiniteQuery, useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import Notification from './Notification'

const Notifications = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({pageParam}) => kyInstance.get(
            "/api/notifications",
            pageParam ? { searchParams: { cursor: pageParam }} : {}
        ).json<NotificationsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => kyInstance.patch("/api/notifications/mark-as-read"),
        onSuccess: () => {
            queryClient.setQueryData(["unread-notification-count"], {
                unreadCount: 0
            })
        },
        onError(error){
            console.log("Failed to mark notifications as read.", error);
        }
    });

    useEffect(() => {
        mutate()
    }, [mutate])

    const notifications = data?.pages.flatMap(page => page.notifications) || [];

    if (status === "pending") {
        return <PostsLoadingSkeleton />
    }

    if (status === "success" && !notifications.length && !hasNextPage) {
        return( 
            <p className='text-center text-muted-foreground'>
                You don&apos;t have any notifications.
            </p>
        );
    }

    if (status === "error"){
        return <p className='text-center text-destructive'>An error occured while loading the notifications.</p>
    }
    return (
        <InfiniteScrollContainer className='space-y-5' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
            {notifications.map((notification) => (
                <Notification key={notification.id} notification={notification}/>
            ))}
            {isFetchingNextPage && <Loader2 className='mx-auto my-3 animate-spin'/>}
        </InfiniteScrollContainer>
    )
}

export default Notifications