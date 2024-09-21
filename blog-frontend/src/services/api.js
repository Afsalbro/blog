import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:8000/api'; 

// Set the token in headers for authenticated requests
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Login service
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || 'Login failed';
    }
};

// Logout service
export const logout = async (token) => {
    setAuthToken(token); 
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Logout failed';
    }
};


// Fetch all blog posts
export const fetchBlogPosts = async (token) => {
    setAuthToken(token); 
    try {
        const response = await axios.get(`${API_URL}/blog-posts`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch blog posts';
    }
};

// Create a new blog post
export const createBlogPost = async (title, content) => {
    try {
        const response = await axios.post(`${API_URL}/blog-posts`, {
            title,
            content
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || 'Failed to create blog post';
    }
};

// Update an existing blog post
export const updateBlogPost = async (id, title, content) => {
    try {
        const response = await axios.put(`${API_URL}/blog-posts/${id}`, {
            title,
            content
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update blog post';
    }
};

// Delete a blog post
export const deleteBlogPost = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/blog-posts/${id}`);
        return response.data;  
    } catch (error) {
        throw error.response?.data?.message || 'Failed to delete blog post';
    }
};

