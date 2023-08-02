"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { links } from '@/constants/navbarConfig'
import { useData } from "@/context/DataProvider";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import DarkModeToggle from "../darkmodeToggleButton/DarkModeToggle";

const Navbar = () => {

  const { user, setUser } = useData()
  const router = useRouter()
  const path = usePathname()
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
        <DarkModeToggle />
        {links.map((link) => (
          <Link style={path === link?.url ? { color: '#53c28b', transition: 'all 0.5s ease' } : null} key={link.id} href={link.url} className={styles.link}>
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
