import {Form } from 'semantic-ui-react'

const Home = () => {
    return (
        <Form className='form-control'>
          <Form.Field>
          <label>Search for a movie</label>
          <input placeholder='Search'/>
          </Form.Field>
        </Form>
    )}

export default Home
