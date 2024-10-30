import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const EvidenceSubmission = () => {
    const [evidence, setEvidence] = useState({
        title: '',
        description: '',
        dateCollected: '',
        location: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setEvidence({ ...evidence, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/evidence";
            const { data } = await axios.post(url, evidence, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setSuccess('Evidence submitted successfully');
            setError('');
            setEvidence({ title: '', description: '', dateCollected: '', location: '' });
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                setSuccess('');
            }
        }
    };

    return (
        <div className={styles.submission_container}>
            <h2>Submit Evidence</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Evidence Title"
                    name="title"
                    onChange={handleChange}
                    value={evidence.title}
                    required
                    className={styles.input}
                />
                <textarea
                    placeholder="Evidence Description"
                    name="description"
                    onChange={handleChange}
                    value={evidence.description}
                    required
                    className={styles.input}
                />
                <input
                    type="date"
                    name="dateCollected"
                    onChange={handleChange}
                    value={evidence.dateCollected}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    onChange={handleChange}
                    value={evidence.location}
                    required
                    className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                {success && <div className={styles.success_msg}>{success}</div>}
                <button type="submit" className={styles.green_btn}>
                    Submit Evidence
                </button>
            </form>
        </div>
    );
};

export default EvidenceSubmission;