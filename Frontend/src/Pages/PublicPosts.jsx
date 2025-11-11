import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./publicpost.css";
import myImage from'./dualipa.jpeg';

const getRandomColor = (username) => {
    const colors = [
        "#be4646ff",
        "#5deb70ff",
        "#496c9eff",
        "#b69b32ff",
        "#C77DFF",
        "#b3806eff",
    ];
    if (!username) return colors[0];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};

const PublicPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const settingsRef = useRef(null);
    const [showSetting, setShowSetting] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
    const fetchPublicPosts = async () => {
        try {
        const response = await axios.get("http://localhost:8080/api/post/public",{
            headers : {
                Authorization: `Bearer ${token}`,
            },
        });
        setPosts(response.data);
        console.log(response.data);
        } catch (err) {
        setError("Something went wrong!");
        console.error(err);
        } finally {
        setLoading(false);
        }
    };
    fetchPublicPosts();
    }, []);

    useEffect(() => {
    const handleClickOutside = (e) => {
        if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSetting(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLike = async (postId) => {
    try {
        setPosts((prev) =>
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
        setPosts((prevPosts) =>
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

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="position-fixed publicpost-top" ref={settingsRef}>
                <button
                className="btn rounded-circle"
                onClick={() => navigate("/profile")}
                title="Profile"
                >
                <FontAwesomeIcon icon={["far", "user-circle"]} size="lg" />
                </button>
                <button
                className="btn rounded-circle"
                title="Settings"
                onClick={() => setShowSetting(!showSetting)}
                >
                <FontAwesomeIcon icon={["fas", "cog"]} size="lg" />
                </button>

                {showSetting && (
                <div
                    className="position-absolute bg-white border rounded shadow p-2"
                    style={{ top: "45px", right: 0, zIndex: 10 }}
                >
                    <button
                    className="dropdown-item text-start"
                    onClick={() => navigate("/settings")}
                    >
                    <FontAwesomeIcon
                        icon={["fas", "user-gear"]}
                        className="me-2"
                    />
                    Account Setting
                    </button>
                    <button className="dropdown-item text-start" onClick={handleLogout}>
                    <FontAwesomeIcon
                        icon={["fas", "arrow-right-from-bracket"]}
                        className="me-2"
                    />
                    Logout
                    </button>
                </div>
                )}
            </div>

            <button
                className="btn rounded-circle shadow creatpost-btn"
                title="Create post"
                onClick={() => navigate("/createpost")}
            >
                <FontAwesomeIcon icon={["fas", "plus"]} />
            </button>
            </div>

            <div>
            {loading && <p>Loading Posts...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && posts.length === 0 && <p>No public posts available...</p>}

            {posts.map((post) => (
                <div key={post.id} className="card mb-3 post-card">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-2 card-header">
                    {post.profilePicture ? (
                        <img
                        src={`http://localhost:8080${post.profilePicture}`}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-circle me-2 profile-pic"
                        />
                    ) : (
                        <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: getRandomColor(post.username || "A"),
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "18px",
                            textTransform: "uppercase",
                        }}
                        >
                        {(post.username || "A")[0]}
                        </div>
                    )}
                    <strong className="post-username">{post.username || "Anonymous"}</strong>
                    </div>
                    {post.postImage && ( 
                        <div className="mt-2">
                        <img
                            src={`http://localhost:8080${post.postImage}`}
                            alt="post"
                            className="img-fluid"
                        />
                        </div> 
                    )}

                    <div><p className="card-text">{post.content}</p></div>

                    <div className="d-flex justify-content-between align-items-center mt-3 card-footer">
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

                        <small className="text-muted">
                            {new Date(post.createdAt).toLocaleString()}
                        </small>
                    </div>
                </div>
            </div>
            ))}
            </div>
        </div>
    );
};

export default PublicPosts;
