import styles from "../page.module.css";
import Header from "@/components/Header/Header";
import SavedPage from "@/components/SavedPage/SavedPage";

export default function Page() {
    return (
        <main className={styles.main}>
            <Header/>
            <SavedPage/>
        </main>
    );
}
