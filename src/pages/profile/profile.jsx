import ProfileNavigation from "../../components/profile-navigation/profile-navigation.jsx";
import {Outlet} from "react-router-dom";
import styles from "./profile.module.scss";

function Profile() {
    return (
        <section className={styles.main}>
            <div className={styles.container}>
                <ProfileNavigation/>
            </div>
            <Outlet/>
        </section>
    );
}

export default Profile;