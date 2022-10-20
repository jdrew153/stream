
import {Avatar} from '@mantine/core';

const MessageComponent = () => {
    return (
        <>
        <div className='w-full relative flex flex-row space-x-3'>
            <div className='w-10 h-10 flex flex-row space-x-2 items-center'>
                <Avatar radius='lg'/>
                <div className='h-8 flex items-center justify-center'>
                    <h3>
                        Test
                    </h3>
                </div>
            </div>
            <div className='flex relative w-full mt-3 justify-center ml-8 '>
                <header>
                    First Comment
                </header>
            </div>
        </div>
        </>
    )
};

export default MessageComponent;