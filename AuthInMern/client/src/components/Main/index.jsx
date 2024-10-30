import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import styles from "./styles.module.css";
import EvidenceSubmission from "../EvidenceSubmission";

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const renderUserTypeSpecificContent = () => {
        switch (user?.userType) {
            case 'admin':
                return <h2>Welcome, Admin!</h2>;
            case 'police':
                return (
                    <>
                        <h2>Welcome, Police Department!</h2>
                        <EvidenceSubmission />
                    </>
                );
            case 'forensic':
                return (
                    <>
                        <h2>Welcome, Forensic Department!</h2>
                        <EvidenceSubmission />
                    </>
                );
            default:
                return <h2>Welcome!</h2>;
        }
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Evidence Vault</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className={styles.content}>
                {renderUserTypeSpecificContent()}
                {user && (
                    <p>You are logged in as: {user.email}</p>
                )}
            </div>
        </div>
    );
};

export default Main;