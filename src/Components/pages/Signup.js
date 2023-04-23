import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
    const {register,handleSubmit,formState:{errors}} = useForm()
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const onFormSubmit = (user) => {
        let staffStatus;
        console.log(userObj);
        if(userObj.email != null) staffStatus = true;
        else staffStatus = false;

        let staffObj = {
            isStaff: staffStatus
        }
        let userData = Object.assign(user,staffObj);
        console.log(userData)
        axios.post('http://localhost:4000/user-api/create-user',userData)
        .then(response => {
            console.log(response)
        })
        .catch(error => alert(error))
    }

    return (
        <div className="flex  justify-center h-screen bg-gray-800">
            <div className="card max-w-md w-full pt-8">
                <div className="container mb-2">
                    <div className="text-3xl font-bold text-center mb-5 text-white "> Signup </div>
                    <Form onSubmit = {handleSubmit(onFormSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" {...register("email",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.email && (<p className="text-red-500 text-xs italic">*Required field</p>)}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="Phone number" {...register("phone",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.phone?.type==='required'&& <p className="text-red-500 text-xs italic">* Required field</p>}
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='block text-white font-bold mb-2'>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register("password",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.password?.type==='required'&& <p className="text-red-500 text-xs italic">* Required field</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>City</Form.Label>
                            <Form.Control type="text" placeholder="City" {...register("city",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.city?.type==='required'&& <p className="text-red-500 text-xs italic">* Required field</p>}
                        </Form.Group>
    
                        <Button style={{  color: '#fff'}} variant="primary" type="submit" className="w-full py-2 rounded-md font-bold bg-cyan-600 text-white focus:outline-none focus:shadow-outline hover:bg-blue-800">
                            Signup
                        </Button>

                    
                    <Form.Label className='block mt-4 text-white'>
                      Already registered?
                      <Button onClick={()=> navigate('/Login')}  variant="link" className="text-indigo-500 hover:bg-transparent">
                        Login
                        </Button>
                      </Form.Label>
                    </Form>
                </div>
            </div>
        </div>
        )
}

export default Signup