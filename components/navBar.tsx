import { Button, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {useState} from 'react'
import { setCookie, getCookie } from "cookies-next";


interface User {
    id?: string
    username: string
    email: string
    validEmail: boolean
}

const NavBar: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const validatedUser = getCookie('user')

    const signUpForm = useForm<User>({
        initialValues: {
            username: '',
            email: '',
            validEmail: false
        
        }
    })

    const SignUp = useMutation(['create-new-users'], async (values:User) => {
        try {
            const response = await axios.post("http://localhost:5000/api/create-new-user", values)
            return response.data
        } catch(e) {
            alert(e)
        }
    }, {
        onSuccess: (user:User) => {
            alert('Successfully created user')
            setCookie('user', {
                "username" : user.username
            })
            setTimeout(() => 
                setShowModal(false)
            , 750)
        },
        onError: (err) => {
            alert(`Error occurred: ${err}`)
        }
    })


    return (
        <>
        <div className='w-screen h-16 flex flex-col bg-nav-bar-black shadow-2xl items-end'>
            <Button className={`bg-purple-500 hover:bg-purple-500 hover:cursor-pointer h-10 mr-2 mt-2 ${(validatedUser == null) ?  ('opacity-100') : ('opacity-0')}`}
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
                       <form className='w-full h-full p-4 flex flex-col space-y-4'
                       onSubmit={(e) => {
                        e.preventDefault()
                        SignUp.mutateAsync({
                            username:signUpForm.values.username,
                            email: signUpForm.values.email,
                            validEmail: true
                        })
                       }}
                       >
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