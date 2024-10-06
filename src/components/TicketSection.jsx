import React, { useContext } from "react";
import { InputLabel, TextField, Select, MenuItem } from "@mui/material";
import styles from "../styles/Form.module.css";
import { formDataContext } from "@/contexts/bookingContext";

export default function TicketsSection() {
  //context call for the child component
  const { formData, dispatch } = useContext(formDataContext);

  return (
    <>
      <h2 className={styles.h2}>Tickets</h2>
      <TextField
        className={styles.inputField}
        type="date"
        helperText="Choose a date"
        value={formData.date}
        required
        onChange={(e) =>
          // dispatch opdaterer det globale obejct og returner en ny opdateret state. global object bliver opdateret med den nye state.
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "UPDATE_FIELD",
            // definere hvilket input felt og værdi
            payload: { field: "date", value: e.target.value },
          })
        }
      />
      <br></br>{" "}
      <InputLabel id="dropdown-label" label="ticket-type" placeholder="Ticket-type" className={styles.dropdownLabel} style={{ position: "relative" }}>
        Choose ticket type
      </InputLabel>
      <Select
        style={{ position: "relative" }}
        className={styles.inputField}
        labelId="ticket-type"
        id="dropdown"
        label="Ticket-Type"
        value={formData.ticketType}
        required
        onBlur={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "SET_TICKET_TYPE",
            payload: { ticketType: e.target.value },
          })
        }
      >
        <MenuItem value="Regular">Regular 799,-</MenuItem>
        <MenuItem value="VIP">VIP 1299,-</MenuItem>
      </Select>
      <br />
      <TextField
        className={styles.ticketNumber}
        type="number"
        label="Number of tickets"
        value={formData.ticketAmount}
        required
        onBlur={(e) =>
          dispatch({
            //dispatch to the global formData obj. with new state value
            action: "SET_TICKET_AMOUNT",
            payload: { ticketAmount: e.target.value },
          })
        }
        inputProps={{ min: 0 }}
      />
    </>
  );
}
