import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const {level, currentUser, showUpdateUserModal} = useContext(ChallengeContext);

    function handleChangeUser() {
        showUpdateUserModal(true)
    }

    return (
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${currentUser}.png`} alt={currentUser} />
            <div>
                <strong>{currentUser}</strong>{' '}<a onClick={handleChangeUser}>(trocar)</a>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}