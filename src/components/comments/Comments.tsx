import { PostData } from '@/lib/types'
import React from 'react'
import CommentInput from './CommentInput'

interface CommentsProps {
    post: PostData
}

const Comments = ({ post }: CommentsProps) => {
  return (
    <div>
      <CommentInput post={post} />
    </div>
  )
}

export default Comments