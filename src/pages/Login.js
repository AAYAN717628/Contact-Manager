import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [credentials, setCredentials] = useState({username: ""}) 
    const navigate = useNavigate();
const server = async (e) => {

    e.preventDefault();

    const res = await fetch("https://4000-aayan717628-contactmana-75tgxthr1j6.ws-us77.gitpod.io/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            username: credentials.username
        })
    });
    const data = await res.json()
    
    if(data){
       navigate(`/main`)
        localStorage.setItem('token',data.token)
    } 
}
const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
   <>
<div className='bg-gray-800 h-screen w-screen flex justify-center items-center'>
    <div className="px-6 py-3 rounded border w-64">
        <div className="flex flex-col items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-white">Login</h2>
        </div>
        <form onSubmit={server}>
           
            <div className="flex flex-col my-2">
                <label htmlFor='username' className="text-xs text-gray-400">Username</label>
                <input 
                   name='username'
                   id='username'
                    className="border rounded px-3 py-1 mt-2"
                    type="text" 
                    value={credentials.username}
                    onChange={onChange}
                    />
            </div>
         
            <div className="flex flex-col items-center justify-center my-3">
                <button className="my-3 py-1 w-full rounded bg-blue-600 text-blue-200" type='submit'> 
                    Submit
                </button>
              
            </div>
        </form>
    </div>
</div>
   </>
  )
}
