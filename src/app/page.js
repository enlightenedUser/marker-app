import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import App from "@/components/App/App";

export default function Home() {
    return (
        <main className={styles.main}>
            <Header/>
            <App/>
        </main>
    );
}
