import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'


 const Login = () => {
    const [formData, setFormData]  = useState({
      email : '',
      password : '',
    });
    const { email,password } = formData;

    const onChange = e => setFormData
    ({ ...formData,[e.target.name]:e.target.value })
    const onSubmit = async e => {
      e.preventDefault();
      console.log('Success');
      
    }
    return (
        <Fragment>
          <h1 className="large text-primary">
          تسجيل الدخول
      </h1>
      <p className="lead"><i className="fa fa-user"></i> سجل إلى حسابك</p>
      <form className='form'
       onSubmit={e => onSubmit(e)}>
      
      <div className="form-group">
        <input type="Email"
         placeholder="Email Account"
         value={email}
         name = 'email'
           onChange = {e => onChange(e)}
           required
         />
      </div>
      <div className="form-group">
        <input type="password" 
        minLength = "6"
        placeholder="Password"
        name = 'password'
         value={password}
           onChange = {e => onChange(e)}
           required
         />
      </div>
      <input type="submit" value="سجل دخولك" className=" btn btn-primary" />
      </form>
      <p className="my-1 bold">
      ليس لديك حساب؟<Link to="/register"> سجل</Link>
      </p>

        </Fragment>
    )
}

export default Login;
