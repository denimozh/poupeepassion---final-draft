import React from 'react'
import { Channel, ChannelHeader, MessageInput, MessageList, Window } from 'stream-chat-react'

const ChatChannel = () => {
  return (
    <div className='w-full'>
        <Channel>
            <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
            </Window>
        </Channel>
    </div>
  )
}

export default ChatChannel