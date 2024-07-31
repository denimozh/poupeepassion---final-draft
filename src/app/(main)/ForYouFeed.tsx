"use client"

import InfiniteScrollContainer from '@/components/InfiniteScrollContainer'
import Post from '@/components/posts/Post'
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton'
import { Button } from '@/components/ui/button'
import kyInstance from '@/lib/ky'
import { PostData, PostsPage } from '@/lib/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'

const ForYouFeed = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "for-you"],
        queryFn: ({pageParam}) => kyInstance.get(
            "/api/posts/for-you",
            pageParam ? { searchParams: { cursor: pageParam }} : {}
        ).json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    const posts = data?.pages.flatMap(page => page.posts) || [];

    if (status === "pending") {
        return <PostsLoadingSkeleton />
    }

    if (status === "success" && !posts.length && !hasNextPage) {
        return( 
            <p className='text-center text-muted-foreground'>
                No one has posted anything yet.
            </p>
        );
    }

    if (status === "error"){
        return <p className='text-center text-destructive'>An error occured while loading the posts.</p>
    }
    return (
        <InfiniteScrollContainer className='space-y-5' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
            {posts.map(post => (
                <Post key={post.id} post={post}/>
            ))}
            {isFetchingNextPage && <Loader2 className='mx-auto my-3 animate-spin'/>}
        </InfiniteScrollContainer>
    )
}

export default ForYouFeed