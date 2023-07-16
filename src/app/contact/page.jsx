'use client'
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Contact = () => {

  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, message })
      })
      const data = await response.json();
      if (response.status === 201) {
        toast.success(data?.message)
        router.push('/')
      }
    } catch (error) {
      console.log(message);
      toast.error('something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
          <input name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="name" required className={styles.input} />
          <input name="email" onChange={(e) => setEmail(e.target.value)} type='email' placeholder="email" required className={styles.input} />
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            required
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="8"
            name="message"
          ></textarea>
          <button disabled={loading && true} type='submit' className={styles.btn}>{loading ? 'Sending..' : 'Send!'}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
