import React from "react";
import styles from './User.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectPageData, setPage, setPageSize} from "./userSlice";

export default function Pagination() {
    const dispatch = useDispatch();
    const {page, pageSize, hideNext} = useSelector(selectPageData);

    const changePageSize = (size) => dispatch(setPageSize(size))

    const pageSizesJSX = [10, 20, 30].map(size => {
        const selected = (size === pageSize) ? 'selected' : 'false';
        return (
            <option value={size}>{size}</option>
        )
    })
    const handlePageSizeChange = (event) => {
        changePageSize(event.target.value)
    }

    const handleChangePage = (page) => () => dispatch(setPage(page))
    return (
        <div className={styles.pagination}>
            <div className={styles.pageChange}>
                {page > 1 &&
                <button className={styles.button} onClick={handleChangePage(page - 1)}>{"<< Prev"}</button>}
                <span>{page}</span>
                {!hideNext &&
                <button className={styles.button} onClick={handleChangePage(page + 1)}>{" Next >>"}</button>}
            </div>
            Page Size: {"  "}
            <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizesJSX}
            </select>
        </div>
    )
}