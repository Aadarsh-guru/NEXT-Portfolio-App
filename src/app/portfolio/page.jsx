import Hero from "public/hero.png";
import styles from "./page.module.css";
import Link from 'next/link';
import Image from 'next/image';

const Portfolio = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>
                    Cheers to seamless web solutions that make your business hop!
                </h1>
                <p className={styles.desc}>
                    Unleashing the power of web technology for your success.
                </p>
                <Link href={'/portfolio'}>
                    <button className={styles.btn}>See Our Portfolio</button>
                </Link>
            </div>
            <div className={styles.item}>
                <Image src={Hero} alt="" className={styles.img} />
            </div>
        </div>
    )
}

export default Portfolio