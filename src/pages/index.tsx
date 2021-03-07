import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengeProvider } from '../contexts/ChallengeContext'

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  currentUser: string
}

export default function Home(props: HomeProps) {
  return (
    <ChallengeProvider
      currentUser={props.currentUser}
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <ExperienceBar />
        <Head>
          <title>Início | move.it</title>
        </Head>
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    currentUser
  } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      currentUser: currentUser ? currentUser : ''
    }
  }
}
