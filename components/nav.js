import Link from 'next/link';
import Cookie from 'js-cookie';
import Router from 'next/router';

export default function Nav(){
    function handleLogout(e){
        e.preventDefault();    
        Cookie.remove('token');
        Router.replace('/auth/login');
    }
    return(
        <div style={{width:'100%',height: 50,backgroundColor:'blue',color:'white',position:'fixed'}}>
            <div style={{padding: 10}}>
            <Link href="/posts">Home</Link>
            &nbsp;| &nbsp;
            <Link href="/posts/create">Create</Link>
             &nbsp;| &nbsp;
             <a href="#!" onClick={handleLogout.bind(this)}>Log Out</a>
            </div>
        </div>
    )
}