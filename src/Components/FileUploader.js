import React from 'react'
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";

const uploader = Uploader({
    apiKey: "free"
});


const options = { multi: true }

function FileUploader() {
  return (
    <div>
        <UploadDropzone uploader={uploader}       // Required.
            options={options}         // Optional.
            width="600px"             // Optional.
            height="375px"            // Optional.
            onUpdate={files => {      // Optional.
            if (files.length === 0) {
                console.log('No files selected.')
            } else {
                console.log('Files uploaded:');
                console.log(files.map(f => f.fileUrl));
            }
        }} />
    </div>
  )
}

export default FileUploader