import {Link, Redirect} from 'react-router-dom'
const Header = ({login}) => {
    const buttonOnClick = (event) =>{
        localStorage.removeItem('token')
        login(false)
        {<Redirect to="/login"/>}
    }
    
    return (
        <div class="topnav" >
            <Link to='/'>Home</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/search' >Search</Link>
            <button className='btn' type='button' onClick={buttonOnClick}>Logout</button>
        </div>

    )
}

export default Header
