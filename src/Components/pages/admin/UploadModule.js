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
    <div className='flex  justify-center h-screen bg-gray-800'>
        <div className='card max-w-md w-full pt-8'>
        <h1 className='text-3xl font-bold text-center mb-5 text-white' >Upload Podcasts:</h1>
        <Form onSubmit = {handleSubmit(onFormSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Podcast Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Podcast Name" {...register("podname",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.podname && (<p className="text-danger">*Required field</p>)}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Posdcast Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" {...register("poddesciption",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.poddescriptions?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='block text-white font-bold mb-2'>Select Form Type</Form.Label>
                            <Form.Select placeholder="Type" {...register("type",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                            </Form.Select>
                            {errors.type?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Speaker</Form.Label>
                            <Form.Control type="text"placeholder="Speaker" {...register("speaker",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.speaker?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Upload Thumbnail</Form.Label>
                            <Form.Control type="file" placeholder="Thumbnail" {...register("thumbnail",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.thumbnail?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className='block text-white font-bold mb-2'>Upload File</Form.Label>
                            <Form.Control type="file" placeholder="File" {...register("file",{required:true})} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            {errors.file?.type==='required'&& <p className="text-danger">* Required field</p>}
                        </Form.Group>

                        <Button style={{  color: '#fff'}} variant="primary" type="submit" className="w-full py-2 rounded-md font-bold bg-cyan-600 text-white focus:outline-none focus:shadow-outline hover:bg-blue-800">
                            Upload
                        </Button>

                    </Form>
        </div>
    </div>
  )
}

export default UploadModule