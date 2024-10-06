import React, { useState, useContext } from "react";
import { FormControl, Card, CardContent } from "@mui/material";
import MyButton from "@/components/MyButton.jsx";
import styles from "../styles/Form.module.css";
import OtherOptionsSection from "./OtherOptions";
import AvailableSpotsSection from "./AvailableSpots";
import TicketsSection from "./TicketSection";
import { formDataContext } from "@/contexts/bookingContext";

export default function MainTicket({ spotData, currentStepSetter }) {
  // bruges til åben lukke function af info boks
  // kunne have været lavet som component så den kunne bruges flere steder
  const [open, setOpen] = useState(false);

  //context call on the parent
  const { formData, dispatch } = useContext(formDataContext);

  const handleInfoClick = () => {
    setOpen(!open);
  };

  // vi får adgang til api'en, vores end-point -
  function reserveSpot(e) {
    e.preventDefault();
    fetch("https://nova-enchanted-confidence.glitch.me/reserve-spot", {
      // put = vi sender noget til endpointet som vi senere kan hente med get
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      // den data vi sender med
      body: JSON.stringify({
        area: formData.formData.area,
        amount: formData.formData.ticketAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        /* sætter formDatas id til at være det id vi får i response så det kan sende med videre */
        // for et id til vores data et id, som tilføjes til de globale object.
        formData.formData.id = data.id;
        handleNextFormComponent();
      });
    console.log(formData, formData.id);
  }

  function handleNextFormComponent() {
    dispatch({ action: "NEXT" });
    dispatch({ action: "CREATE_ATTENDEE_STRUCTURE" });
    currentStepSetter(1); //change current step
  }

  return (
    <>
      <h1 className={styles.h1}>Ticket details</h1>
      <div>
        <form className={styles.form} onSubmit={reserveSpot}>
          <FormControl variant="filled">
            <Card>
              <CardContent className={styles.formWrapper}>
                <TicketsSection />
                <AvailableSpotsSection areaData={spotData} />
                <OtherOptionsSection open={open} handleInfoClick={handleInfoClick} />
              </CardContent>
              <div className={styles.btn_container}>
                <MyButton type="submit">Next</MyButton>
              </div>
            </Card>
          </FormControl>
        </form>
      </div>
    </>
  );
}
