import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
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

    //get user state from redux
    // let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);
    let dispatch = useDispatch();

    const navigate = useNavigate();
    const onFormSubmit = (userCredentialsObject) => {
        // console.log("OK OK")
        dispatch(userLogin(userCredentialsObject));
    };

    useEffect(() => {
        if (isSuccess) {
          navigate("/Homepage");
        }
        if(isError){
          alert("Invalid Username or Password !!!");
        }
      }, [isSuccess, isError]);

    return (
    <div className="">
        <div className="card cols col-lg-5 col-md-8 col-10 mx-auto m-5">
            <div className="container mb-2">
                <p className="display-6 text-center">Login</p>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email",{required:true})}/>
                        {errors.email && (<p className="text-danger">*Required field</p>)}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })}/>
                        {errors.password?.type==='required'&& <p className="text-danger">* Required field</p>}
                    </Form.Group>

                    <Button style={{ backgroundColor: "black", color:"white"}} variant="primary" type="submit" className="d-block mx-auto">
                        Login
                    </Button>

                    <Form.Label className=" d-flex align-items-center">
                        Don't have an account? 
                        <Button onClick={()=>navigate('/sign-up')} variant="link">Signup</Button>
                    </Form.Label>
                </Form>
            </div>
        </div>
    </div>
    )
}

export default Login