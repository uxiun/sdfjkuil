import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>sdfjkuil</title>
            </Head>

            <main className={styles.main}>
                <Link href="./parser"><a>parser</a></Link>
            </main>

            <footer className={styles.footer}>
                ithkuil
            </footer>
        </div>
    )
}

export default Home
