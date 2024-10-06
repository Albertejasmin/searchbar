import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <a href="#">By Ticket</a>
        </li>
        <li>
          <a href="#">Program</a>
        </li>
      </ul>
    </div>
  );
}
