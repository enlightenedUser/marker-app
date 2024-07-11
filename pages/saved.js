import styles from '../src/app/page.module.css';
import Header from "@/components/Header/Header";
import SavedPage from "@/components/SavedPage/SavedPage";
import "../src/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Saved() {
    return (
        <main className={inter.className}>
            <Header/>
            <SavedPage/>
        </main>
    );
}
