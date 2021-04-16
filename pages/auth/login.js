import {useState} from 'react';

const Login = () => {
    const[fileds , setFileds] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const login  = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(fileds),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!login.ok) return;
       const loginRes = await login.json();
       console.log(loginRes)
       if(loginRes){
        localStorage.setItem('dataLogin' , JSON.stringify(loginRes));
       }

    }
    const hanldeChange = (e) => {
        const name = e.target.getAttribute('name');
        setFileds({
            ...fileds,
            [name]: e.target.value
        })


    }

    return(
        <div>
            <h1>Login Page</h1>

            <div>
                <form onSubmit={handleSubmit.bind(this)}>
                    <input type="text" name="email" placeholder="Email" onChange={hanldeChange.bind(this)} /> <br/>
                    <input type="password" name="password" placeholder="Password" onChange={hanldeChange.bind(this)}  /> <br/>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;