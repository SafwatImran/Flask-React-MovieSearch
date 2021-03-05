import {Link} from 'react-router-dom'
const Header = ({login}) => {
    const buttonOnClick = (event) =>{
        localStorage.removeItem('token')
        login(false)
    }
    
    return (
        <div class="topnav" >
            <a class="active" href="">Home</a>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <a href="" >Search</a>
            <button className='btn' type='button' onClick={buttonOnClick}>Logout</button>
        </div>

    )
}

export default Header
