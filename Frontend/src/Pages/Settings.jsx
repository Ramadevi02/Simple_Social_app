import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Settings = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const [username, setUsername] = useState(decoded.sub);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState([]);
    const [showChangeUsername, setShowChangeUsername] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/userDetails',{
                headers : {
                    Authorization: `Bearer ${token}`,
                }}
            );
            console.log(response.data);
            setUserDetails(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setMessage("Sommething went wrong");
        } finally {
            setLoading(false);
        }
        };
        fetchUserDetails();
    }, [token]);

    const handleChangeUsername = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/user/changeUsername`, 
            {oldUsername: username, newUsername}, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            setMessage(response.data);
            alert(response.data)
            setNewUsername('');
        } catch(err) {
            console.error(err);
            setMessage("Failed to change username");
        }
    };

    const handleChangePassword = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/auth/changePasswordJson`,
                { username, newPassword }, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    },
                }
            );
            setMessage(response.data);
            alert(response.data);
            setNewPassword('');
        } catch (err) {
            console.error(err);
            setMessage('Failed to change password');
        }
    };

    const handleDeleteAccount = async (userId) => {
        if(confirm("Are you sure you want to delete your account permanetly?")){
        try {
            const response = await axios.delete(`http://localhost:8080/api/auth/deleteAccount/${userId}`,
                { headers: {
                    Authorization : `Bearer ${token}`
                },}
            );
            setMessage(response.data);
            console.log(response.data);
            if(response.data === 'Account deleted successfully') {
                alert('Sad to see you go...');
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setMessage("Error deleting account")
        }
        }
    };

    return (
        <div className="settings"  style={{padding: "2rem", backgroundColor: "rgb(76 68 95)"}}>
            <h4 style={{color: "#82af82"}}>Account settings</h4>
            <div className="mb-2 text-start">
                <button className=" btn border-0 change-btn" onClick={() => setShowChangeUsername(true)}>
                    Change username
                </button>
                {showChangeUsername && (
                <div className="text-center">
                    <input type="text" value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}/><br/>
                    <button className="mt-2" onClick={handleChangeUsername}>Change</button>
                </div>
                )}
            </div>
            <hr style={{color: "white"}}/>
            <div className="mb-2 text-start">
                <button className="btn border-0 change-btn" onClick={() => setShowChangePassword(true)}>
                Change password</button>
                {showChangePassword && (
                <div className="text-center">
                    <div className="password-wrapper">
                        <input type={showPassword ? 'text' : 'password'} value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}/>
                        <FontAwesomeIcon icon={showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']}
                        onClick={() => setShowPassword(!showPassword)} className="password-icon"/>
                    </div><br/>
                    <button className="mt-2" onClick={handleChangePassword}>Change</button>
                </div>
                )}
            </div>
            <hr style={{color: "white"}} />
            <div className="text-start">
                <button className="border-0" style={{paddingLeft: "0"}}
                onClick={() => handleDeleteAccount(userDetails.id)}>
                <FontAwesomeIcon icon={['fas', 'trash-can']} size="lg" className="delete-acc-icon"/>
                Delete Account</button>
            </div>
            {message && <p className="mt-2" style={{color: message.includes("Failed" || "Error") ? "red" : "green"}}>
            {message}</p>}
        </div>
    );
}
export default Settings;