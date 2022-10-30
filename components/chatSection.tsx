import { Button, TextInput } from "@mantine/core";
import MessageComponent from "./messageComponent";
import {ScrollArea} from '@mantine/core';
import {useForm} from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'
import dayjs from 'dayjs';
import { Key, useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';



interface Message {
    message_id: String,
    sender: String,
    content: String,
    timeStamp: String
}


const ChatSection: React.FC = () => {



    const queryClient = useQueryClient();

    const [messages, setMessages] = useState<[Message]>();

    const getStreamChat = useQuery(['stream-chat'], async () => {
        const response = await axios.get("http://localhost:8080/api/get-all-messages")
        return response.data
    })

    const postMessage = useMutation(['send-new-message'], async (message:Message) => {
        const response = await axios.post("http://localhost:8080/api/write-new-message", message)
        return response.data
    }, {
    
        onSuccess: (message) => {
            console.log("success")
            queryClient.invalidateQueries(['stream-chat'])
        },
        onError: () => {
            console.log("There was an error while trying to send the message")
        }
    })

   

    const messageForm = useForm<Message>({
        initialValues: {
            message_id: uuidv4().toString(),
            sender: 'jdrew',
            content: '',
            timeStamp: dayjs().toString(),
        },
        
    })

    async function handleMessageSubmit(values:Message) {
        const newMessage = postMessage.mutateAsync(values)

        return newMessage
    }
    

    
  
    return (
        <>
        <div className='h-full flex flex-grow-0 flex-col  bg-nav-bar-black w-full mt-1 '>
            <div className='flex items-center justify-center w-full h-16 text-white border-solid border-b-slate-400 border-b-1 '>
                <h3>
                  Stream  Chat
                </h3>

            </div>
           
            <div className='h-full w-full flex flex-col  items-end'>
           <ScrollArea style={{ height: '100%', width: '100%'}}>
                {!getStreamChat.error === null ? (
                    <>

                        error loading chat....
                    </>
                ) : (
                    <>
                    { getStreamChat.data && getStreamChat.data.map((m:Message) => 
                        <div className='p-4'>
                        <MessageComponent sender={m.sender} content={m.content} time_stamp={m.timeStamp} key={m.message_id as Key}/>
                        </div>
                    )}
                    </>
                )}
            </ScrollArea>
                <div className='w-full flex  justify-center p-2'>
                    <form className='w-full'  onSubmit={async (e) => {
                        e.preventDefault()
                         handleMessageSubmit({
                            content: messageForm.values.content,
                            message_id: messageForm.values.message_id,
                            sender: messageForm.values.sender,
                            timeStamp: messageForm.values.timeStamp
                        })
                        .then(() => messageForm.reset())
                        
                        
                    }}>
                       <div className='w-full h-full flex flex-row space-y-2'>
                       <TextInput 
                        placeholder='Send a Message'
                        variant='filled'
                        style={{
                            'width': '100%',
                            'padding': '8px',
                            
                        }}
                        {...messageForm.getInputProps('content')}
                        />

                        <Button
                            type='submit'
                            
                            className='hover:bg-purple-500 hover:cursor-pointer bg-purple-500'
                            
                        >
                            Send
                        </Button>
                       </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};

export default ChatSection;