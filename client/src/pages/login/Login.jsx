import {CircularProgress, TextField} from '@mui/material'
import {useContext, useRef} from 'react'
import './login.css'
import {loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'

const Login = () => {
    const email = useRef()
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked')
        loginCall(
            {email: email.current.value, password: password.current.value},
            dispatch
        )
    }
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Facebook</h3>
                    <span className='loginDesc'>
                        Connect with friends and world around you on Facebook.
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleSubmit}>
                        <TextField
                            label='Email'
                            type='email'
                            inputRef={email}
                            required
                        />
                        <TextField
                            label='Password'
                            type='password'
                            inputRef={password}
                            required
                            minLength='6'
                        />
                        <button className='loginButton' disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color='inherit' />
                            ) : (
                                'Log In'
                            )}
                        </button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton' disabled>
                            {isFetching ? (
                                <CircularProgress color='inherit' />
                            ) : (
                                'Create a New Account'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
