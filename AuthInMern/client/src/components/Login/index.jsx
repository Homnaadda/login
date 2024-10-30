import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "", userType: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <div className={styles.logo}>EVIDENCE VAULT</div>
                    <div className={styles.tagline}>EVIDENCE PROTECTION USING BLOCKCHAIN</div>
                </div>
                <div className={styles.nav}>
                    <a href="#">Home</a>
                    <a href="#" className={styles.active}>Login</a>
                    <a href="#">Contact</a>
                </div>
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <label htmlFor="userType">You are?</label>
                        <select
                            name="userType"
                            onChange={handleChange}
                            value={data.userType}
                            required
                            className={styles.input}
                        >
                            <option value="">Select User Type</option>
                            <option value="admin">Admin</option>
                            <option value="police">Police Department</option>
                            <option value="forensic">Forensic Department</option>
                        </select>
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;