import axios from 'axios';
import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

const Register = () => {
  
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [show, setShow] = useState(false)
    const [res,setRes] = useState('')

    const buttonOnClick = (event) => {
        axios.post('register', {
            'name' : name,
            'password' : pass
          })
          .then((response) => {
            setRes(response.data['message'])
            setShow(true)
          }).catch((error) => {
            setRes(error.response.data['message'])
            console.log(error.response.data['message']);
          });
          
    };

    return (
    <div className='register form-control'>
       {show ?(<div><h3>{res}</h3></div> && <Redirect to="/login"/>): <h3>{res}</h3>}  
      <h1>Register</h1>  
      <Form>
          <Form.Field>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
          </Form.Field>
          <Form.Field>
          <label>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder='Password' />
          </Form.Field>
          <Button className='btn'type='button' onClick={buttonOnClick}>Submit</Button>
      </Form>
    </div>
  );
}

export default Register;