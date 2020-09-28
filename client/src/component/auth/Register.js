import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import{setAlert} from '../../actions/alert';


 const Register = ({setAlert}) => {
    const [formData, setFormData]  = useState({
      name : '',
      email : '',
      password : '',
      password2 : '',
    });
    const { name,email,password,password2 } = formData;

    const onChange = e => setFormData
    ({ ...formData,[e.target.name]:e.target.value })
    const onSubmit = async e => {
      e.preventDefault();
      if(password !== password2) {
        setAlert('Password not match','danger');
      } else {
       console.log('Success');
      }
    }
    return (
        <Fragment>
 <h1 className="large text-primary">
        Sign Up
      </h1>
      <p className="lead"><i className="fa fa-user"></i> انشئ حسابك</p>
      <form className='form'
       onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <input
           type="text"
           placeholder="Name"
           name = 'name'
           value={name}
           onChange = {e => onChange(e)}
           required
            />
      </div>
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
      <div className="form-group">
        <input type="password"
        minLength = "6"
         placeholder=" Confirm Password "
         name = 'password2'
          value={password2}
           onChange = {e => onChange(e)}
           required
          />
      </div>
      <input type="submit" value="سجل" className=" btn btn-primary" />
      </form>
      <p className="my-1 bold">
        لديك حساب بالفعل؟ <Link to="/login">سجل الدخول</Link>
      </p>

        </Fragment>
    )
}

Register.propTypes={
  setAlert : PropTypes.func.isRequired,
}
export default connect(null,{ setAlert }) (Register);
