import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function LandingArtists({ bandData }) {
  return (
    <>
      <section className={styles.landingArtistGrid}>
        <article className={styles.landingBand1}>
          <img src={`https://nova-enchanted-confidence.glitch.me/logos/` + bandData[3].logo} alt="Logo" />
        </article>
        <div className={styles.landingBand1}>
          <h3>
            {bandData[3].name} <br /> / <br /> at Midgard <br /> / <br /> 04:00 - 06:00
          </h3>
        </div>
        <article className={styles.landingBand2}>
          <img src={`https://nova-enchanted-confidence.glitch.me/logos/` + bandData[2].logo} alt="Logo" />
        </article>
        <div className={styles.landingBand2}>
          <h3>
            {bandData[2].name} <br /> / <br /> at Midgard <br /> / <br /> 00:00 - 02:00
          </h3>
        </div>
        <article className={styles.landingBand3}>
          <img src={`https://nova-enchanted-confidence.glitch.me/logos/` + bandData[6].logo} alt="Logo" />
        </article>
        <div className={styles.landingBand3}>
          <h3>
            {bandData[6].name} <br /> / <br /> at Vanaheim <br /> / <br /> 04:00 - 06:00
          </h3>
        </div>
      </section>
      <Link className={styles.link2} href="/schedule">
        See schedule
      </Link>
    </>
  );
}
