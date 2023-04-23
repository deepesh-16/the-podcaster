import React  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function UploadModule() {

    const {register,handleSubmit,formState:{errors}} = useForm()
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);


    const onFormSubmit = (user) => {
        let userData = Object.assign(user,userObj);
        const file=userData.file[0]
        console.log(file)
        const data=new FormData()
        data.append("file",file)
        data.append('upload_preset',"the-podcasters")
        data.append('cloud_name',"dndv7br0m")
        fetch("https://api.cloudinary.com/v1_1/dndv7br0m/video/upload",{
            method:"post",
            body:data
        })
        .then((res)=>res.json())
        .then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
        // axios.post('http://localhost:4000/user-api/create-user',userData)
        // .then(response => {
        //     console.log(response)
        // })
        // .catch(error => alert(error))
    }
  return (
    <div>
        <Form onSubmit = {handleSubmit(onFormSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Podcast Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Posdast Name" {...register("podname",{required:true})}/>
                            {errors.podname && (<p className="text-danger">*Required field</p>)}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Posdcast Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" {...register("poddesciption",{required:true})} />
                            {errors.poddescriptions?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select  placeholder="Type" {...register("type",{required:true})}>
                                <option>Select File Type</option>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                            </Form.Select>
                            {errors.type?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Speaker</Form.Label>
                            <Form.Control type="text" placeholder="Speaker" {...register("speaker",{required:true})}/>
                            {errors.speaker?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type="file" placeholder="File" {...register("file",{required:true})}/>
                            {errors.file?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Button style={{ backgroundColor: "rgb(1, 95, 130)"}} variant="primary" type="submit" className="d-block mx-auto">
                            Signup
                        </Button>

                    </Form>
    </div>
  )
}

export default UploadModule