import React ,{useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import {useSelector} from "react-redux";
import axios from 'axios';

function UploadModule() {

    const {register,handleSubmit,formState:{errors}} = useForm()
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);

    const [data,setData]=useState()
    const onFormSubmit = (user) => {
        let podData = Object.assign(user,userObj);
        console.log(podData)
        const file=podData.file[0]
        const thumbnail=podData.thumbnail[0]
        const data=new FormData()
        data.append("file",file)
        data.append('upload_preset',"the-podcasters")
        data.append('cloud_name',"dndv7br0m")
        fetch("https://api.cloudinary.com/v1_1/dndv7br0m/video/upload",{
            method:"post",
            body:data
        })
        .then((res)=>res.json())
        .then((data)=>{
            const thumbdata=new FormData()
            thumbdata.append("file",thumbnail)
            thumbdata.append('upload_preset',"the-podcasters")
            thumbdata.append('cloud_name',"dndv7br0m")
            fetch("https://api.cloudinary.com/v1_1/dndv7br0m/image/upload",{
                method:"post",
                body:thumbdata
            })
            .then((res1)=>res1.json())
            .then((data1)=>{
            console.log(userObj)
            const podcastData={
            "podname":podData.podname,
            "poddesciption":podData.poddesciption,
            "type":podData.type,
            "speaker":podData.speaker,
            "thumbnail":data1.secure_url,
            "file":data.secure_url,
            "views":0,
            }
        axios.post('http://localhost:4000/podcast-api/create-podcast',podcastData)
        .then(response => {
            console.log(response)
        })
        .catch(error => alert(error))
    })
    }).catch((err)=>{console.log(err)})
        
    }
  return (
    <div className='bg-gray-800 h-screen'>
        <h1 className='block italic text-4xl font-bold text-white text-center mb-12 pt-8'>Upload Podcasts:</h1>
        <div className='text-white flex justify-center'>
        <Form onSubmit = {handleSubmit(onFormSubmit)} className='font-semibold text-lg'>
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
                        <Form.Label>Select Form Type</Form.Label>
                            <Form.Select className=" text-black italic" placeholder="Type" {...register("type",{required:true})}>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                            </Form.Select>
                            {errors.type?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Speaker</Form.Label>
                            <Form.Control type="text" className=" text-black italic " placeholder="Speaker" {...register("speaker",{required:true})}/>
                            {errors.speaker?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Thumbnail</Form.Label>
                            <Form.Control type="file" placeholder="Thumbnail" {...register("thumbnail",{required:true})}/>
                            {errors.thumbnail?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload File</Form.Label>
                            <Form.Control type="file" placeholder="File" {...register("file",{required:true})}/>
                            {errors.file?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Button style={{ backgroundColor: "rgb(1, 95, 130)"}} variant="primary" type="submit" className="d-block mx-auto">
                            Upload
                        </Button>

                    </Form>
        </div>
    </div>
  )
}

export default UploadModule