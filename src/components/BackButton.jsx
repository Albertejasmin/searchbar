import Button from "@mui/material/Button";
import styles from "../styles/Form.module.css";

export default function Back({ onClick, children }) {
  return (
    <Button
      className={styles.form_btn}
      variant="text"
      sx={{
        color: "black",
        padding: 0,
        textDecoration: "underline",
        fontSize: "1.5rem",
        width: 0,
        ":hover": {
          border: "none",
          color: "black",
          textDecoration: "underline",
          borderRadius: 0,
          fontWeight: "bold",
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
