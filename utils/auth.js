import cookie from 'js-cookie'
import Router from 'next/router'
import axios from 'axios'

export const handleLogin = (token) => {
   // console.log("in auth-handle login",token.token);    
   // cookie.set('foo', 'bar');
   
   cookie.set('token', token.token);
   cookie.set('id', token.userid);
   localStorage.setItem('token', token.token);
   localStorage.setItem('userid', token.userid);
  
     Router.push('/user/my-profile');
}

export const redirectUser = (ctx, location) => {
    if(ctx.req){
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end()
    } else {
        Router.push(location)
    }
}

export const handleLogout = () => {
  
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    
    cookie.remove('name');
   
    cookie.remove('token');
    cookie.remove('id');
     window.location.reload();
    Router.push('/');
   
}    