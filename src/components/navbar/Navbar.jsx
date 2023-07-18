"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { links } from '@/constants/navbarConfig'
import { useData } from "@/context/DataProvider";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const { user, setUser } = useData()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data?.message)
        setUser({ name: '', email: '', createdAt: '' })
        localStorage.removeItem('user')
        router.push('/login')
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong.')
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Aadarsh Guru
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {
          user?.email ?
            (
              <button onClick={() => handleLogout()} className={styles.logout}>
                Logout
              </button>
            )
            : null
        }
      </div>
    </div>
  );
};

export default Navbar;
