import React from "react";
import {Link} from "react-router-dom";
import styles from './User.module.css';

export default function UserListItem({user}) {
    return (
        <div className={styles.userItem}>
            <div className={styles.imgContainer}>
                {user.avatar && <img src={user.avatar} alt="Avatar"/>}
            </div>
            <div className={styles.userDetails}>
                <h3>{user.first_name} {user.last_name}</h3>
                <div>
                    <Link to={`/${user.id}/friends`}>
                        <button className={styles.button}>Friends</button>
                    </Link>
                    <Link to={`/${user.id}/friend-of-friends`}>
                        <button className={styles.button}>Friend Of Friends</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}