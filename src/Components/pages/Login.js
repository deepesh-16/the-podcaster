import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../Slices/userSlice'
import { useEffect } from "react";

function Login() {
const {
register,
handleSubmit,
formState: { errors },
} = useForm();

let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
(state) => state.user
);

let dispatch = useDispatch();

const navigate = useNavigate();

const onFormSubmit = (userCredentialsObject) => {
dispatch(userLogin(userCredentialsObject));
};

useEffect(() => {
if (isSuccess) {
navigate("/home");
}
if(isError){
alert("Invalid Username or Password !!!");
}
}, [isSuccess, isError]);

return (
<div className="flex justify-center h-screen pt-16 bg-gray-800">
<div className="card max-w-md w-full ">
<div className="text-3xl font-bold text-center mb-5 text-white">Login</div>
<Form onSubmit={handleSubmit(onFormSubmit)}>
<Form.Group className="mb-6" controlId="formBasicEmail">
<Form.Label className="block text-white font-bold mb-2">Email address</Form.Label>
<Form.Control type="email" placeholder="Enter email" {...register("email",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
{errors.email && (<p className="text-red-500 text-xs italic">*Required field</p>)}
</Form.Group>

<Form.Group className="mb-6" controlId="formBasicPassword">
<Form.Label className="block text-white font-bold mb-2">Password</Form.Label>
<Form.Control type="password" placeholder="Password" {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
{errors.password?.type==='required'&& <p className="text-red-500 text-xs italic">* Required field</p>}
</Form.Group>

<Button style={{ color:"#fff"}} variant="primary" type="submit" className="w-full py-2 rounded-md font-bold bg-cyan-600 text-white focus:outline-none focus:shadow-outline hover:bg-blue-800">
Login
</Button>

<Form.Label className="block mt-4 text-white">
Don't have an account?
<Button onClick={()=>navigate('/sign-up')} variant="link" className="text-indigo-500 hover:bg-transparent">
Signup
</Button>
</Form.Label>
</Form>
</div>
</div>
)
}

export default Login