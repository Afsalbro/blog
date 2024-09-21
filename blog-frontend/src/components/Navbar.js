import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSignInAlt, faPlus, faList } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ user, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm" style={{ backgroundColor: 'lightgray' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    <span className="fs-4">Blog App</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        <FontAwesomeIcon icon={faList} className="me-1" /> View Posts
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-post">
                                        <FontAwesomeIcon icon={faPlus} className="me-1" /> Create Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link btn btn-outline-primary" to="/login">
                                    <FontAwesomeIcon icon={faSignInAlt} className="me-1" /> Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
