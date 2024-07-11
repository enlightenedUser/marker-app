import styles from '../src/app/page.module.css';
import Header from "@/components/Header/Header";
import App from "@/components/App/App";
import "../src/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
    return (
        <main className={inter.className}>
            <Header/>
            <App/>
        </main>
    );
}
