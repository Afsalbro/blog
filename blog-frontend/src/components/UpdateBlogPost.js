import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBlogPost } from '../services/api';
import { toast } from 'react-toastify';

const UpdateBlogPost = ({ token, posts, setPosts }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const post = posts.find((post) => post.id === parseInt(id));
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
        setLoading(false);
    }, [id, posts]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateBlogPost(id, title, content);
            const updatedPosts = posts.map((post) => 
                post.id === parseInt(id) ? { ...post, title, content } : post
            );
            setPosts(updatedPosts);
            toast.success('Post updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to update post.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Update Blog Post</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Post</button>
            </form>
        </div>
    );
};

export default UpdateBlogPost;
