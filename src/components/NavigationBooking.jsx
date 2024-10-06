import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { AppBar, Toolbar } from "@mui/material";

/* Desktop navigation */
export default function NavigationBooking() {
  return (
    <>
      <AppBar sx={{ bgcolor: "transparent", boxShadow: "none" }} position="static" className={styles.navMenu}>
        <Toolbar className={styles.navContainer}>
          <Link className={styles.logo} href="./">
            FOO <br /> FESTIVAL
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
