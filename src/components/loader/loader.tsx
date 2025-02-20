import React from 'react'
import styles from '../../components/loader/loader.module.scss'
import {ThreeDots} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className={styles.spinnerContainer}>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#646cff"
                radius="9"
                ariaLabel="three-dots-loading"
            />
        </div>
    );

}

export default Loader
