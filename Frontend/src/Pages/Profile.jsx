import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Profile.css'
import { jwtDecode } from "jwt-decode";

const Profile = () => {
    const token = localStorage.getItem("token");
    // const decoded = jwtDecode(token);
    // const username = decoded.sub;

    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postMessage, setPostMessage] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/userDetails',{
                headers : {
                    Authorization: `Bearer ${token}`,
                }
                });
                setUserDetails(response.data);
                setUserPosts(response.data.posts || []);
                console.log(response.data);
                setLoading(false);
            }catch (err) {
                console.error(err);
                setPostMessage("Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [token]);
    const handleFileChange = async(e) => {
        const file = e.target.files[0];
        if(!file) return;
        setProfilePicture(file);
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8080/api/upload/image", 
                formData, {
                    headers : {
                        "Content-Type" : "multipart/form-data",
                        Authorization : `Bearer ${token}`
                    },
            });
            const fileUrl = response.data;

            const updateResponse = await axios.post(
                "http://localhost:8080/api/user/updateProfilePicture",
                { profilePicture: fileUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("profile picture uploaded successfully!");
            console.log("file url: " , updateResponse.data);
        } catch(error) {
            console.log(error);
            setMessage("Failed to upload");
        }
    }

    // const handleUpload = async (e) => {
    //     e.preventDefault();

    //     if(!profilePicture) return;
        
    // };
    const handleLike = async (postId) => {
        try {
            setUserPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                ? {
                    ...p,
                    liked: !p.liked,
                    likeCount: (p.likeCount || 0) + (p.liked ? -1 : 1),
                    }
                : p
            )
            );
            const response = await axios.post(
            `http://localhost:8080/api/like/${postId}`,
            {},
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
    
            if (response.data) {
            setUserPosts((prevPosts) =>
                prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        liked: response.data.liked,
                        likeCount: response.data.likeCount,
                    }
                    : post
                )
            );
            }
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    const handleDeletePost = async (postId) => {
        if(confirm('Are you sure you want to delete this post')) {
            try{
                const response = await axios.delete(
                    `http://localhost:8080/api/post/deletePost/${postId}`, 
                    { headers : {
                        Authorization : `Bearer ${token}`,
                    },}
                );
                console.log(response.data);
                setUserPosts(response.data.userPost);
                if(response.data.message === 'success') {
                    setMessage("Post deleted successfully");
                } else {
                    setMessage("Failed to delete post")
                }
            } catch(err) {
                console.log(err);
                setMessage("Network error while deleting post");
            }
        }
    };

    return (
        <div className="container" style={{backgroundColor: "white", padding: "1rem"}}>
            <h3>My Profile</h3>
            {loading && <p>Loading....</p>}
            {!loading && (
            <div>
            <div className="profile-header">
                <div className="d-flex align-items-center mb-2 user-name">
                    <div className="profile-pic-wrapper">
                    {userDetails.profilePicture ? (
                        <img
                        src={`http://localhost:8080${userDetails.profilePicture}`}
                        alt="profile"
                        width={70}
                        height={70}
                        className="rounded-circle me-2 profile-pic"
                        />
                    ) : (
                        <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: "70px",
                            height: "70px",
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            textTransform: "uppercase",
                        }}
                        >
                        {(userPosts.username || "A")[0]}
                        </div>
                    )}
                    <input type="file" accept="image/*" id="uploadProfilePic"
                        style={{display: "none"}} onChange={handleFileChange} />
                    <button className="upload-btn" title="Upload"
                     onClick={() => document.getElementById("uploadProfilePic").click()}>
                        <FontAwesomeIcon icon={["fas", "plus"]} className="rounded-circle"/>
                    </button>
                    </div>
                    <strong className="ms-2">{userDetails.username || "Anonymous"}</strong>
                </div>
                <hr />
                <div className="profile-info text-start">
                    <div className="d-flex">
                        <FontAwesomeIcon icon={["fas","envelope"]} size="lg" className="p-2"/>
                        <h6 className="p-2">{userDetails.email}</h6>
                    </div>
                    <hr />
                    <div className="d-flex">
                        <FontAwesomeIcon icon={["fas","hourglass"]} size="lg" className="p-2"/>    
                        <h6 className="p-2">Account created: {userDetails.createdAt}</h6>
                    </div>
                    <hr />
                </div>
            </div>
            {postMessage && <p style={{color: setMessage.includes('error' || 'Failed') ? 'red' : 'green'}}>
                {postMessage}</p>}
            {/* <div className="upload-sectiion">
                {preview && <img src={preview} alt="Preview" width={120}/>}
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Profile Picture</button>

                {message && <p>{message}</p>}
            </div> */}
            {message && <p style={{color: message.includes('Failed') ? 'red' : 'green'}}>{message}</p>}

            <div className="post-section">
                <h6>Your posts</h6>
                {userPosts.length === 0 ? (
                    <p>No post yet.</p>
                ) : (
                    <div className="posts-list">
                        {userPosts.map((post) => (
                            <div key={post.id} className="post-card">
                                {post.postImage && ( 
                                    <div className="mt-2">
                                    <img
                                        src={`http://localhost:8080${post.postImage}`}
                                        alt="post"
                                        className="img-fluid"
                                    />
                                    </div> 
                                )}
                                <div><p className="post-content">{post.content}</p></div>
                                <div className="d-flex justify-content-between align-items-center mt-3"
                                 style={{backgroundColor: "#dad1d1"}}>
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                        className="like-btn"
                                        title="Like"
                                        onClick={() => handleLike(post.id)}
                                        style={{
                                            color: post.liked ? "red" : "gray",
                                            border: "none",
                                            background: "transparent",
                                        }}
                                        >
                                        <FontAwesomeIcon icon={["fas", "thumbs-up"]} size="lg" />
                                        </button>
                                        <p className="mb-0">{post.likeCount || 0}</p>
                                    </div>
                                    <div>
                                    <button className="btn border-0 text-end" title="delete post" style={{color : 'red'}}
                                        onClick={() => handleDeletePost(post.id)}>
                                            <FontAwesomeIcon icon={['fas', 'trash-can']}/>
                                    </button>
                                    <small className="text-muted">
                                        {new Date(post.createdAt).toLocaleString()}
                                    </small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
            )}
        </div>
    );
}
export default Profile;