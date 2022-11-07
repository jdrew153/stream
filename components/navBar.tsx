import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {useState} from 'react'


interface User {
    id?: string
    username: string
    email: string
    validEmail: boolean
}

const NavBar: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const signUpForm = useForm<User>({
        initialValues: {
            username: '',
            email: '',
            validEmail: false
        
        }
    })

    return (
        <>
        <div className='w-screen h-16 flex flex-col bg-nav-bar-black shadow-2xl items-end'>
            <Button className='bg-purple-500 hover:bg-purple-500 hover:cursor-pointer h-10 mr-2 mt-2'
                onClick={() => {
                    if (!showModal) {
                        setShowModal(true)
                    } else {
                        setShowModal(false)
                    }
                }}
            >
                Enter Stream
            </Button>
        </div>
        <div className='h-full w-screen'>
                <Modal
                    opened={showModal}
                    onClose={() => setShowModal(false)}
                    title= " Enter Some Details to Chat in the Stream"
                    className='rounded-xl'
                >
                    <div className='w-full h-full'>
                       <form className='w-full h-full p-4 flex flex-col space-y-4'>
                       <div>
                            <TextInput
                                title='Email'
                                placeholder="Enter your Email"
                                {...signUpForm.getInputProps('email')}
                                
                            />
                        </div>

                        <div>
                            <TextInput
                                title='Username'
                                placeholder='Enter a username'
                                {...signUpForm.getInputProps('username')}
                            />
                        </div>
                        <div className='w-full h-12 flex space-y-4 justify-center items-center'>
                            <Button
                                type="submit"
                                className='h-full bg-purple-500 hover:bg-purple-500 hover:cursor-pointer'
                            >
                                Enter Chat
                            </Button>

                        </div>
                       </form>

                    </div>

                </Modal>
        </div>
        </>
    )
};

export default NavBar;