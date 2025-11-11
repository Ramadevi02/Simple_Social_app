import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const  handleNavigate = () => {
        navigate('/register');
    }
    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                                username, password});
            
           if (response.status === 200) {
                const {message, token} = response.data;
                //localStorage.removeItem("token");
                localStorage.setItem("token", token);
                console.log(token);
                setMessage(message);
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.sub) {
                        localStorage.setItem("username", decoded.sub);
                    } 
                } catch (err) {
                    console.error("Failed to decode token", err);
                }
                navigate('/publicpost')
           } 
        } catch(error) {
            console.error("Login error: ", error);
            if(error.response) {
                setMessage('Login failed: ', error.response.data);
            } else {
                setMessage('Login failed: Network error');
            }
        }
    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className='login-form'>
                <fieldset className='login-fieldset'>
                    <legend className='login-legende'>Login</legend>
                    <div className='input-group'>
                        <label className='text-start' htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={username}
                            onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className='input-group'>
                        <label className='text-start' htmlFor="password">Password</label>
                        <div className='password-wrapper'>
                            <input type={showPassword ? 'text' : 'password'}
                                name="password" id="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                            <FontAwesomeIcon 
                            icon={showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']} 
                            onClick={() => setShowPassword(!showPassword)} className='password-icon'/>
                        </div> 
                    </div>
                    <div>
                        <button type='submit' className='login-button rounded-0'>Login</button>
                    </div>
                </fieldset>
            </form>
            {message && (
                <p style={{color: message.includes('failed') ? 'red' : 'green'}}>{message}</p>
            )}
            <div className='register-link'>
                <span>Don't have an account?</span>
                <button onClick={handleNavigate} className='signup-button rounded-0'>SignUp</button>
            </div>
        </div>
    );
};
export default Login;