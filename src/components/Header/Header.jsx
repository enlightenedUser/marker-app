import React from 'react';
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <a href='/' className={styles.link}>Marker app</a>
            <a href='/saved' className={styles.link}>Saved data</a>
        </div>
    );
};

export default Header;