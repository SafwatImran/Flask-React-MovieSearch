import axios from 'axios'
import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'

let movieData={};
let searched = false;

const Searchbar = () => {
  const [text, setText] = useState('')
  let token = localStorage.getItem('token')
  const searchMovie = (text) =>{
    let data = {
      'movie':text
    } 
    let options = {
      headers : {
        'x-access-token':token,
        'Content-Type':'application/json'
      }
    }
    axios.post('search',data,options).then((res)=>{
      movieData = res.data
      searched = true
      console.log(movieData['Search'])
      
    }).catch((err)=>{
      console.log(err)
    })
  }
    return (
        <>
        <Form className='form-control'>
          <Form.Field>
          <label>Search for a movie</label>
          <input placeholder='Search' value={text} onChange={(e)=>setText(e.target.value)}/>
          <Button className='btn'type='button' onClick={(e)=>searchMovie(text)} >Search</Button>
          </Form.Field>
        </Form>
        {searched && <ul><li>hi</li></ul>}
        </>
    )}

export default Searchbar
