import { ChangeEvent, useContext, useState } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/UpdateUserModal.module.css'
import axios from 'axios'

export function UpdateUserModal() {
  const { currentUser, updateUser, showUpdateUserModal } = useContext(
    ChallengeContext
  )
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  async function handleUpdateUser() {
    const instance = axios.create({
      baseURL: 'https://api.github.com/users/'
    })

    try {
      const {data} = await instance.get(username)
      updateUser(data.login)
      showUpdateUserModal(false)
    } catch(err) {
      setError('Usuário não encontrado')
    }
  }

  function handleCloseModal() {
    showUpdateUserModal(false)
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <strong>Digite o nome de usuário do github:</strong>
        <input type='text' value={username} onChange={onChangeUsername} />
        <button
          type='button'
          className={styles.button}
          onClick={handleUpdateUser}>
          Entrar
        </button>
        <p>
          {error}
        </p>
        <button
          type='button'
          className={styles.close}
          onClick={handleCloseModal}>
          <img src='/icons/close.svg' alt='Fechar modal' />
        </button>
      </div>
    </div>
  )
}
