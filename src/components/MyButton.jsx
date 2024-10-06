import Button from "@mui/material/Button";
import styles from "../styles/Form.module.css";

export default function MyButton({ onClick, children }) {
  return (
    /* MUIs måde at style knappen på */
    <Button
      type="submit"
      className={styles.form_btn}
      variant="contained"
      sx={{
        borderRadius: 0,
        backgroundColor: "transparent",
        border: "2px solid black",
        boxShadow: "none",
        color: "black",
        ":hover": {
          bgcolor: "white",
          border: "3px solid black",
          color: "black",
          borderRadius: 0,
          boxShadow: "none",
        },
      }}
      onClick={onClick}
    >
      {/* children gør at den indeholder tekst på knappen */}
      {children}
    </Button>
  );
}
