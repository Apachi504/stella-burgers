import React, {FC} from 'react'
import styles from './feed-info.module.scss'

export const FeedInfo: FC = () => {
    return (
        <main className={styles.container}>
            <section className={styles.order__status}>
                <div className={styles.order__feeds}>
                    <h3 className={`${styles.order__title} mb-6`}>Готовы:</h3>
                    <div className={styles.order__number_status}>
                        {/*нужно чтобы было максимум 10 заказов*/}
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                        <p className={`${styles.order__number_done} ${styles.order__number}`}>68489679</p>
                    </div>
                </div>
                <div className={styles.order__feeds}>
                    <h3 className={`${styles.order__title} mb-6`}>В работе:</h3>
                    <div className={styles.order__number_status}>
                        <div className={styles.order__number_status}>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                            <p className={`${styles.order__number_inwork} ${styles.order__number}`}>12312412</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.order__all}>
                <p className={`${styles.order__title} mb-1`}>Выполнено за все время:</p>
                <p className={styles.order__all__number}>22500</p>
            </section>
            <section className={styles.order__today}>
                <p className={`${styles.order__title} mb-1`}>Выполнено за сегодня:</p>
                <p className={styles.order__all__number}>138</p>
            </section>
        </main>
    )
}
