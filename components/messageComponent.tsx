
import {Avatar, Text} from '@mantine/core';


const MessageComponent = () => {
    return (
        <>
        <div className='w-auto h-auto relative flex flex-row space-x-2'>
            <div className='w-6 h-6 flex flex-row space-x-1 items-center'>
                <Avatar radius='xl'/>
                <div className='h-8 flex items-center justify-center'>
                    <header className='text-sm font-semibold'>
                        Test
                    </header>
                </div>
            </div>
            <div className='flex w-auto absolute justify-center '>
                <div className=' w-24'>

                </div>
               <div className='max-w-[440px] h-auto'>
                    <Text size='sm' lineClamp={4}>
                        why is line clamp not working....
                    </Text>
               </div>
            </div>
        </div>
        </>
    )
};

export default MessageComponent;