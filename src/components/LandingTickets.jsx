import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function LandingTickets() {
  return (
    <section>
      <Link className={styles.ticketSection} href="/booking_display">
        <img src="/ticket_vip.svg" alt="" />
        <img src="/ticket_regular.svg" alt="" />
      </Link>
    </section>
  );
}
