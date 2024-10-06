import styles from "@/styles/Modal.module.css";
import Head from "next/head";

export default function Modal({ selectedBand, handleCloseModal, showModal }) {
  // Checks if either selectedBand is null or showModal is false using the logical OR operator ||.
  // if true, the modal will not be displayed -> component returns null to prevent rendering anything.
  if (!selectedBand || !showModal) {
    return null;
  }
  // seperate variabler fra selectedBand
  const { act, start, end, bandInfo, stage, day, cancelled } = selectedBand;
  console.log(selectedBand);

  // Check if the logo includes "http"
  const logoSrc = bandInfo.logo.includes("http") ? bandInfo.logo : `https://nova-enchanted-confidence.glitch.me/logos/${bandInfo.logo}`;

  function getFullDayName(day) {
    const dayMap = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };
    return dayMap[day];
  }

  return (
    <>
      <Head>
        <title>Artist info</title>
      </Head>
      <section className={styles.ModalSection}>
        {/* Button to close the modal */}
        <button className={styles.ModalButton} onClick={() => handleCloseModal(false)}>
          Back to program
        </button>
        <img className={styles.ModalImg} src={logoSrc} alt="Logo" />
        {/* Ternary hvis band er cancelled(true), "cancelled" tilføjes. Span giver udstreget styling  */}
        <h1 className={styles.ModalArtistName}>
          {cancelled ? <span className={styles.CancelledName}>{act}</span> : <span>{act}</span>}
          {cancelled ? " CANCELLED" : ""}
        </h1>
      </section>
      <section className={styles.ModalInfo}>
        <article className={styles.ModalConcertInfo}>
          <p>
            <span>STAGE</span> <br />
            {stage}
          </p>
          <p>
            <span>DATE</span> <br />
            {getFullDayName(day)}
          </p>
          <p>
            <span>TIME </span> <br />
            {start} - {end}
          </p>
        </article>
        <article className={styles.ModalBio}>
          <p>
            <span>ABOUT </span>
            <br /> {bandInfo.bio}
          </p>
        </article>
      </section>
    </>
  );
}
