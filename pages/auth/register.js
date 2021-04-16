import { useState } from 'react';

const Register = () => {
    const [fileds , setFileds] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(fileds)
        const register = await fetch('/api/auth/register' ,{
            method: 'POST',
            body: JSON.stringify(fileds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const registerRe = await register.json();
        console.log(registerRe)
        
       
    }

    const hanldeChange = (e) =>{
        const name = e.target.getAttribute('name');
        setFileds({
            ...fileds,
            [name]: e.target.value
        })

    }

    return(
        <div>
            <h1>Register Page</h1>

            <div>
                <form onSubmit={handleSubmit.bind(this)}>
                    <input type="text" name="email" placeholder="Email" onChange={hanldeChange.bind(this)} /> <br/>
                    <input type="password" name="password" placeholder="Password" onChange={hanldeChange.bind(this)}  /> <br/>
                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Register;