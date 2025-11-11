import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('PUBLIC');
    const [message, setMessage] = useState('');
    const [postImage, setPostImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);
            } catch(error) {
                console.error("Failed to decode token: ", error);
            }
        }
    }, []);

    const handlePost = async(e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if(!token) {
            setMessage("You must be logged in to create a post");
            return;
        }

        const formData = new FormData();
        formData.append("content", content);
        formData.append("visibility", visibility);
        if(postImage) formData.append("postImage", postImage);

        try {
            const response = await axios.post('http://localhost:8080/api/post/create', 
                formData, 
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
            setMessage(response.data);
            setContent('');
            if(response.data === 'Post created successfully') {
                alert('Post created successfully');
                navigate('/publicpost');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error creating post.');
        }
    }

    return (
        <div style={{padding: '2rem', backgroundColor: "rgb(76 68 95)"}}>
            <h4 style={{color: "darkgrey"}}>Create post</h4>
            <form onSubmit={handlePost} 
                style={{padding: "1rem",
                    textAlign: "start",
                    border: "1px solid #dcc5c5",
                    fontWeight: "bolder",
                    color: "white"}}
            >
                <div>
                    <label htmlFor="content">Content</label><br />
                    <textarea name="content" id="content" value={content} className='my-2'
                        onChange={(e) => setContent(e.target.value)} required
                    ></textarea>
                </div>
                <hr />
                <div>
                    <label htmlFor="visibility">Visibility</label><br />
                    <select name="visibility" id="visibility" className='my-2'
                    onChange={(e) => setVisibility(e.target.value)} required>
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                </div>
                <hr />
                <div>
                    <label htmlFor='postImage'>upload Image</label><br />
                    <input type="file" id='postImage' accept='image/*' className='my-2'
                        onChange={(e) => setPostImage(e.target.files[0])}/>
                </div>
                <div style={{textAlign: "center"}}>
                    <button type='submit' className='mt-2'>Create post</button>
                </div>
            </form>
            {message && (
                <p>{message}</p>
            )}
        </div>
    );
};
export default CreatePost;