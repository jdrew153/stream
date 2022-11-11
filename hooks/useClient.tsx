import { useEffect, useState } from 'react';
import {DefaultGenerics, StreamChat} from 'stream-chat'
interface Client {
    apiKey: string,
    userData: UserData,
    tokenOrProvider: string
}

export interface UserData {
    id?: string,
    name?: string,
    image?: string
}

export const useClient = (props:Client) => {
   const [chatClient, setChatClient] = useState(null);

   useEffect(() => {
    const client = new StreamChat(props.apiKey);

    // prevents app from setting stale client
    let didUserConnectInterrupt = false;
    /* @ts-ignore */
    const conectionPromise = client.connectUser(props.userData, props.tokenOrProvider)
    .then(() => {
         /* @ts-ignore */
        if (!didUserConnectInterrupt) setChatClient(client)
    });

    return () => {
        didUserConnectInterrupt = true;
        setChatClient(null)
        conectionPromise
        .then(() => client.disconnectUser)
        .then(() => {
            console.log('connection closed...')
        });
    };
   }, [props.apiKey, props.tokenOrProvider, props.userData.id]);

   return chatClient as unknown as StreamChat<DefaultGenerics>;
};