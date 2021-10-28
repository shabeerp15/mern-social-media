import axios from 'axios'
import {useRef} from 'react'
import { useHistory } from 'react-router'
import './register.css'

const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user)
                history.push('/login')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Lamasocial</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you on
                        Lamasocial.
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleSubmit}>
                        <input
                            placeholder='Username'
                            required
                            ref={username}
                            className='loginInput'
                            type='text'
                        />
                        <input
                            placeholder='Email'
                            required
                            ref={email}
                            className='loginInput'
                            type='email'
                            minLength='6'
                        />
                        <input
                            placeholder='Password'
                            required
                            ref={password}
                            className='loginInput'
                            type='password'
                        />
                        <input
                            ref={passwordAgain}
                            placeholder='Password Again'
                            className='loginInput'
                            required
                            type='password'
                        />
                        <button className='loginButton' type='submit'>
                            Sign Up
                        </button>
                        <button className='loginRegisterButton'>
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
