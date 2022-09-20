import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import Landing from "../components/clientOnboarding/Landing/Landing.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ventura</title>
        <link rel="shortcut icon" href="/images/fevicon.png" />
      </Head>
      <div className={styles.container}>
        <Layout>
          <Landing />
        </Layout>
      </div>
    </>
  );
}
