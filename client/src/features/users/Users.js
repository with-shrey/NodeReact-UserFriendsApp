import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectPageData, selectUsers,} from './userSlice';
import styles from './User.module.css';
import Pagination from "./Pagination";
import UserListItem from "./UserListItem";

export default function Users(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const users = useSelector(selectUsers);
    const {page, pageSize} = useSelector(selectPageData);
    const dispatch = useDispatch();

    async function getUsers() {
        try {
            setLoading(true);
            setError(null);
            const data = await dispatch(props.fetchUsers());
            const error = data.payload;
            if (data.error) {
                setError(error.response ? error.response.data.message : error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, [dispatch, pageSize, page]);

    const loadingJSX = (
        <div className={styles.container}>
            <div>Loading...</div>
        </div>
    )

    const errorJSX = (
        <div className={styles.container}>
            <div>{error}</div>
            <button
                className={styles.buttonError}
                onClick={() => getUsers()}
            >RETRY
            </button>
        </div>
    )

    const usersJSX = users.map(user => (
        <div key={user.id}>
            <UserListItem user={user}/>
        </div>
    ))

    const noUsersJSX = (
        <div>
            <div>No Users Found</div>
        </div>
    )

    return (
        <div>
            {loading && loadingJSX}
            {error && errorJSX}
            <div>
                {!loading && !error && users.length === 0 && noUsersJSX}
                {usersJSX}
            </div>
            <Pagination/>
        </div>

    );
}
