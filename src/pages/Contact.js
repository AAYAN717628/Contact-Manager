import React, { useState, useEffect } from 'react'

export default function Contact() {
    const [todoo, setTodo] = useState({text: ""}) 
    const view = async (e) => {

        const res = await fetch("https://4000-aayan717628-contactmana-75tgxthr1j6.ws-us77.gitpod.io/see", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
    
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        });
   
        const status = await res.json()
        const check = status
        if(check.todo === undefined){
            document.getElementById('yep').innerHTML = "You don't have any notes"
        } else {
            document.getElementById('yep').innerHTML = status.todo
        }
    

    }

const sent = async (e) => {
    e.preventDefault();

    const res = await fetch("https://4000-aayan717628-contactmana-75tgxthr1j6.ws-us77.gitpod.io/sent", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            text: todoo.text,
            token: localStorage.getItem('token')
        })
    });

    const status = await res.json()
    document.getElementById('server').innerHTML = status.message
    const refr = () => {
        document.getElementById('server').innerHTML = ""
    }
     setTimeout(refr,5000)
    view()
}



    const onChange = (e)=>{
        setTodo({...todoo, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        view();
            } ,[] );
  return (
    <>

<div className="h-screen bg-gray-800">
	<nav className="flex justify-center p-4 bg-gray-800">
		<h1 className="text-white text-2xl font-bold">My Notes</h1>
       
	</nav>
	<div>

		<form className="flex justify-center mt-10" onSubmit={sent} method='POST'>
			<div className="bg-gray-50 p-8 rounded-lg">
				<h1 className="text-center mb-4">Write Here</h1>
                <p className='text-green-500 fond-bold text-center' id='server'></p>
				<div className="flex space-x-2 p-2 bg-white rounded-md">
                <input 
                   name='text'
                   id='text'
                    className="border rounded px-3 py-1 mt-2"
                    type="text" 
                    placeholder='Type here'
                    value={todoo.text}
                    onChange={onChange}
                    />
					<button className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold hover:bg-green-700" type='submit'>Save</button>
				</div>
			</div>
		</form>
        <div className="flex justify-center relative  mt-6  top-0 right-0 p-3 space-x-1">
				
					<p className="bg-white px-12 py-8 rounded-lg w-80 text-center font-sans" id='yep'>Fetching Your Notes</p>
                    
				</div>
                <div className="flex justify-center relative  mt-6  top-0 right-0 p-2 space-x-1">
                    <a href='/'>
				<button className='text-white bg-green-500 px-10 py-8 rounded-lg w-40 h-20 item-center font-sans   hover:bg-green-700'>LogOut</button>
                </a>
                
            </div>
             
                
	</div>
</div>
<div>
		
		</div>
        <footer className="footer footer-center  w-full p-4 bg-gray-700 text-white">
      <div className="text-center">
        <p>
         Developed By © 2022 -
          <a className="font-semibold" href="https://aayan.tech/"
            >Aayan</a>
        </p>
        
      </div>
    </footer>
    </>
  )
}
