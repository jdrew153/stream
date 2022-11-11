import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, VirtualizedMessageList, Window } from 'stream-chat-react';
import { useClient, UserData } from '../hooks/useClient';
import 'stream-chat-react/dist/css/v2/index.css';

import { useEffect, useState } from 'react';


const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNCJ9.M7t7rb0YjWiIXrWXkLQHLZKhNAjHBGMxxnSOF-unzFY'
const user: UserData = {
    id: '1234',
    name: 'jdrew',
    image: 'https://getstream.io/random_png/?id=lingering-shadow-3&name=lingering-shadow-3'
}


const StreamChatList: React.FC = () => {
    const chatClient = useClient({  apiKey: 'yt87ffbuwxzy', userData: user, tokenOrProvider: userToken });
    const [channel, setChannel] = useState(undefined);
    useEffect(() => {
        if (!chatClient || channel) return;

        const streamChannel = chatClient.channel('messaging', 'wedding-stream', {
            name: 'Wedding Stream'
        })
        /* @ts-ignore */
        setChannel(streamChannel);

    }, [chatClient]);

    if (!chatClient) return null;

    return(
        <>
        <Chat client={chatClient} theme='str-chat__theme-dark' useImageFlagEmojisOnWindows>
      <Channel channel={channel} >
        <Window >
          <ChannelHeader />
          <VirtualizedMessageList scrollToLatestMessageOnFocus/>
          <MessageInput focus />
        </Window>
      </Channel>
    </Chat>
        </>
    )
};

export default StreamChatList;