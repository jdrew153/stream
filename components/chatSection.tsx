import { Button, TextInput } from "@mantine/core";
import MessageComponent from "./messageComponent";
import {ScrollArea} from '@mantine/core';

const ChatSection: React.FC = () => {
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
                <div className='p-4'>
                <MessageComponent/>
                </div>
            </ScrollArea>
                <div className='w-full flex  justify-center p-2'>
                    <form className='w-full'>
                       <div className='w-full h-full flex flex-row space-y-2'>
                       <TextInput 
                        placeholder='Send a Message'
                        variant='filled'
                        style={{
                            'width': '100%',
                            'padding': '8px',
                            
                        }}/>

                        <Button
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