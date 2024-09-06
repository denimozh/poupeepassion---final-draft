import React from 'react'
import { useSession } from '../SessionProvider'
import { ChannelList } from 'stream-chat-react';

const ChatSidebar = () => {
    const { user } = useSession();

    return (
        <div className='size-full flex flex-col border-e md:w-72'>
            <ChannelList filters={{ type: "messaging", members: { $in: [user.id]} }} showChannelSearch />
        </div>
    )
}

export default ChatSidebar