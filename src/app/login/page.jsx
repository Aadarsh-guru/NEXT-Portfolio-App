"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useData } from "@/context/DataProvider";

const Login = () => {

    const [loading, setLoading] = useState(false)
    const { user, setUser } = useData()
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            setLoading(true)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json()
            if (data?.success) {
                router.push('/dashboard')
                toast.success(data?.message)
                setUser(data?.user)
                localStorage.setItem('user', JSON.stringify(data?.user))
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
            <h1 className={styles.title}> Welcome Back</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                <button disabled={loading && true} type='submit' className={styles.button}>{loading ? 'logging in..' : 'Login'}</button>
            </form>
            <span className={styles.or}>- OR -</span>
            <Link className={styles.link} href="/register">
                Create new account
            </Link>
        </div>
    );
};

export default Login;
