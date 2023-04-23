import React from 'react'
import axios from 'axios'

function ResumeWatching() {
  const handleClick = () => {
      const temp = {
        name: "Hello world",
        email: "hello@world.com"
      }
      axios.post('http://localhost:4000/favorite-api/add-to-favorites',temp)
      .then(response => {
          console.log(response)
      })
      .catch(error => alert(error))
  }
  return (
    <div>
      <button onClick={handleClick}>
        Hello
      </button>
    </div>
  )
}

export default ResumeWatching