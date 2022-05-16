import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gameMachine } from "./gameMachine";
import { useMachine } from "@xstate/react";
import Confetti from "react-confetti";

const Home: NextPage = () => {
  const [state, send] = useMachine(gameMachine);

  const over = state.matches("gameover");

  return (
    <div className={styles.container}>
      <Head>
        <title>mc-pixel memoryGame</title>
        <meta name="description" content="class project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {over ? (
        <>
          <h1>YOU WON! {state.context.points}</h1> <Confetti />
        </>
      ) : (
        <>
          <h1>
            {state.context.time}
            {"  "}
            {state.context.points}
          </h1>
        </>
      )}
    </div>
  );
};

export default Home;
