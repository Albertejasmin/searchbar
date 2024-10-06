import {
  FormControl,
  Card,
  CardContent,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import styles from "../styles/Form.module.css";
import { formDataContext } from "../contexts/bookingContext";
import { useContext, useState } from "react";
import MyButton from "./MyButton";
export default function FormTab({ setNextStep }) {
  //destructure context
  const { formData, dispatch } = useContext(formDataContext);

  //destructure attendees array from formData
  const { attendees } = formData.formData;
  console.log(formData);
  console.log(attendees, formData.formData.attendees);

  //State variable to track validation errors
  const [inputErrors, setInputErrors] = useState({
    fullnameErrors: [],
    emailErrors: [],
    phoneErrors: [],
  });
  //handle input changes for personal info:
  function handlePIChanges(index, field, value) {
    dispatch({
      action: "UPDATE_ATTENDEE_FIELD",
      payload: {
        index,
        field,
        value,
      },
    });
  }
  // form validation,
  function validateForm() {
    let isFormValid = true;
    //track form Errors across each attendee

    //chatgpt helped
    //check for each attendee in the array of objects whether or not these props has been filled and validate

    //refactor validation
    const newInputErrors = formData.formData.attendees.map((attendee) => {
      //make state variables to store error
      let errorFullname = false;
      let errorEmail = false;
      let errorPhone = false;

      //check input field if not filled, set whole form to invalid
      if (!attendee.fullname || !attendee.email || !attendee.phone) {
        isFormValid = false;
      }
      if (!attendee.fullname) {
        errorFullname = true;
        isFormValid = false;
      }
      if (!attendee.email) {
        errorEmail = true;
        isFormValid = false;
      }
      if (!attendee.phone) {
        errorPhone = true;
        isFormValid = false;
      }
      //return if error state is true for any and each individual field
      return {
        errorFullname,
        errorEmail,
        errorPhone,
      };
    });

    //push the errors to the array
    // The fullnameErrors, emailErrors, and phoneErrors states hold the respective errors for each attendee.
    setInputErrors({
      fullnameErrors: newInputErrors.map((errors) => errors.errorFullname),
      emailErrors: newInputErrors.map((errors) => errors.errorEmail),
      phoneErrors: newInputErrors.map((errors) => errors.errorPhone),
    });

    if (isFormValid) {
      //change to the next component in booking flow if form is valid, invoking setCurrentStep, but passed as setNextStep prop.
      setNextStep(2);
    }
    //update state var with new errors
  }
  return (
    <>
      {attendees.map((attendee, index) => (
        <Accordion>
          <AccordionSummary className={styles.overviewText}>
            Person {index + 1}
          </AccordionSummary>
          <AccordionDetails>
            <form>
              <FormControl className={styles.formControl} variant="filled">
                <Card>
                  <CardContent>
                    <p> Information</p> <br />
                    <>
                      <TextField
                        key={index}
                        name="fullname"
                        id="fullname"
                        label="Full name"
                        placeholder={"fx: John Doe"}
                        required
                        value={attendee.fullname}
                        onChange={(e) =>
                          handlePIChanges(index, "fullname", e.target.value)
                        }
                        error={inputErrors.fullnameErrors[index]} //set error prop based on emailErros array on that index
                        helperText={
                          inputErrors.fullnameErrors[index] &&
                          "Full Name is required"
                        }
                        style={{ marginBottom: "1rem" }}
                      />

                      <br></br>
                      <TextField
                        name="email"
                        id="email"
                        label="Email"
                        placeholder={"fx: JohnDoe@gmail.com"}
                        required
                        value={attendee.email}
                        onChange={(e) =>
                          handlePIChanges(index, "email", e.target.value)
                        }
                        error={inputErrors.emailErrors[index]} //set error prop based on emailErros array on that index
                        helperText={
                          inputErrors.emailErrors[index] && "Email is required"
                        }
                        style={{ marginBottom: "1rem" }}
                      />
                      <br></br>
                      <TextField
                        name="phone"
                        type="tel"
                        id="phone"
                        label="Phone"
                        inputProps={{ maxLength: 11, minLength: 8 }}
                        pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                        placeholder={"fx: 11111111"}
                        required
                        value={attendee.phone}
                        onChange={(e) =>
                          handlePIChanges(index, "phone", e.target.value)
                        }
                        error={inputErrors.phoneErrors[index]}
                        helperText={
                          inputErrors.phoneErrors[index] &&
                          "Phone number is required"
                        }
                      />
                    </>
                  </CardContent>
                </Card>
              </FormControl>
            </form>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* button to trigger form validation */}
      <div className={styles.btn_container}>
        <MyButton onClick={validateForm}>Next</MyButton>
      </div>
    </>
  );
}
