import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Register.css';

const Register = () => {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[passwordHash, setPasswordHash] = useState('');
    const navigate = useNavigate();
    const[message, setMessage] = useState('');
    const[showPassword, setShowPassword] = useState(false);

    const newUser = async(e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            passwordHash
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", user);
                setMessage('User registered successfully');
                console.log(response.data);
                setUsername('');
                setEmail('');
                setPasswordHash('');
            }
        catch(error) {
            console.log(error);
            if(error.response) {
                setMessage("Registration failed: " + error.response.data)
            } else {
                setMessage('Error: ' + error.message);
            }
        }
    };

    const handleNavigate = () => {
        navigate('/login');
    }

    return (
        <div className='register-container'>
            <form onSubmit={newUser} className='register-form'>
                <fieldset>
                    <legend className='register-legend'>SignUp</legend>
                    <div className='input-group'>
                        <label htmlFor="username" className='text-start'>Username</label>
                        <input type="text" id='username' name='username' value={username}
                            onChange={e => setUsername(e.target.value)} required
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="email" className='text-start'>Email</label>
                        <input type="email" name="email" id="email" value={email}
                            onChange={e => setEmail(e.target.value)} required
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="passwordHash" className='text-start'>Password</label>
                        <div className='password-wrapper'>
                            <input type={showPassword ? 'text' : 'password'} name="passwordHash" id="passwordHash" 
                            value={passwordHash}
                            onChange={e => setPasswordHash(e.target.value)} required
                            />
                            <FontAwesomeIcon icon={showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']}
                            onClick={() => setShowPassword(!showPassword)} className='password-icon'/>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='register-button rounded-0'>register</button>
                    </div>
                </fieldset>
            </form>
            {message && (
                <div style={{marginTop: '1rem',marginBottom: '1rem', 
                color: message.includes('failed' || 'Error') ? 'red' : 'green'}}>
                    {message}
                </div>
            )}
            {message === 'User registered successfully' && (
                <div className='register-login-btn bold'>
                    <span>Go to...</span>
                    <button className='login-btn rounded-0' onClick={handleNavigate}
                    >Login</button>
                </div>
            )}
        </div>
    );
};
export default Register;