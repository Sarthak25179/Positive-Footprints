import { convertTimestamp } from '../../../utils/timestampConverter';
import styles from './Comments.module.css';

import React from 'react'

export const Comments = ({ id, comment, currentUserId }) => {
    const created = convertTimestamp(comment.createdAt);

    return (
        <li>
            <div className={styles["owner-info"]}>
                <span className={styles["owner"]}>{comment.ownerEmail}</span>
            </div>
            <div className={styles["comment-content"]}>
                <div className={styles["comment"]}>
                    <p>
                        {comment.content}
                    </p>
                    <div className={styles["right-side"]}>
                        {(comment.ownerId === currentUserId) &&
                            <div className={styles["buttons"]}>
                                <button className={styles["edit-btn"]}>Edit</button>
                                <button className={styles["delete-btn"]}>Delete</button>
                            </div>
                        }
                        <span className={styles["timestamp"]}>{created}</span>
                    </div>
                </div>
            </div >
        </li >
    )
}
