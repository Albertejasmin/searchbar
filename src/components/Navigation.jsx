import Link from "next/link";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "@/styles/Home.module.css";

/* Desktop navigation */
export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
        position="sticky"
        className={styles.navMenu}
      >
        <Toolbar className={styles.navContainer}>
          <Link className={styles.logo} href="./">
            FOO <br /> FESTIVAL
          </Link>
          <div className={styles.flexBox}>
            {/*Box hider navmenuen i mobil sx er en mediaQuiery */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn1} href="/booking_display">
                BUY TICKET
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link className={styles.navStyleBtn2} href="/program">
                PROGRAM
              </Link>
            </Box>
          </div>
          {/* Dette gør at burgermenuen forsvinder igen når skærmen bliver større */}
          {/* Burger menu */}
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton className={styles.burgerIcon}>
              {/* Burger ikon */}
              <MenuIcon onClick={() => setOpen(true)} />
            </IconButton>
          </Box>
        </Toolbar>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <IconButton className={styles.backIcon}>
            {/* Luk knap */}
            <ChevronRightIcon onClick={() => setOpen(false)} />
          </IconButton>
          <Divider></Divider>
          {/* Her indsættes vores menuelementer i liste elementer for mellemrum */}
          <List>
            <ListItem>
              {/* Her indsættes vores menuelementer */}
              <Link className={styles.navStyleBtn2} href="/booking_display">
                BUY TICKET
              </Link>
            </ListItem>
            <ListItem>
              <Link className={styles.navStyleBtn2} href="/program">
                PROGRAM
              </Link>
            </ListItem>
          </List>
        </SwipeableDrawer>
      </AppBar>
    </>
  );
}
