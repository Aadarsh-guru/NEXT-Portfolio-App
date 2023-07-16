"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


const Register = () => {

    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        try {
            setLoading(true)
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json()
            if (res.status === 201) {
                router.push("/login?success=Account has been created");
                toast.success(data?.message)
            } else {
                toast.success(data?.message)
            }
        } catch (err) {
            console.log(err);
            toast.error('something went wrong.')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create an Account</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className={styles.input}
                />
                <input
                    type='email'
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button disabled={loading && true} type='submit' className={styles.button}>{loading ? 'Registering..' : 'Register'}</button>
            </form>
            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/login">
                Login with an existing account
            </Link>
        </div>
    );
};

export default Register;
