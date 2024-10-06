import styles from "@/styles/Home.module.css";

export default function LandingStages() {
  return (
    <section className={styles.stageSection}>
      <h2>THE STAGES</h2>
      <div>
        <h3>Midgard</h3>
        <p>
          Welcome to Midgard, the pulsating realm of Norse mythology transformed
          into a mind-bending techno stage for the ultimate dance experience!
        </p>
        <h3>Vanaheim</h3>
        <p>
          Let the techno gods take you on a journey through Vanaheim, where
          ancient legends harmonize with the pulsating energy of the dance
          floor.
        </p>
        <h3>Jotunheim</h3>
        <p>
          The frost giants dance amidst thunderous bass, their colossal frames
          pulsating in synchrony with the hypnotic melodies. Laser beams pierce
          through the misty air, creating a symphony of light that reflects off
          the metallic glaciers beneath your feet.
        </p>
      </div>
    </section>
  );
}
