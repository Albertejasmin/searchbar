import { useContext, useState } from "react";
import MainTicket from "../components/MainTicket";
import { formDataContext } from "@/contexts/bookingContext";
import PersonalInfo from "@/components/PersonalInfo";
import FormPay from "@/components/FormPay";
import Confirmation from "@/components/Confirmation";
import Link from "next/link";
import NavigationBooking from "@/components/NavigationBooking";
import Head from "next/head";

export async function getServerSideProps() {
  const api = "https://nova-enchanted-confidence.glitch.me/available-spots";
  const res = await fetch(api);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

// data er hentet som sendes med ned her
export default function BookingDisplay({ data }) {
  //provide the context to the component
  // sender context med, så dens børn kan bruge den, som parent skal den kende til context
  const { formState, dispatch } = useContext(formDataContext);
  // currentStep, state der bruges i switch til at holde styr på hvor vi er i flowet
  // sætter currentState til 0, så der til at starte returneres default.
  const [currentStep, setCurrentStep] = useState(0);
  // switch case fungerer lidt som if statement, kigger efter hvilken state vi er på
  switch (currentStep) {
    case 1:
      return <PersonalInfo currentStepSetter={setCurrentStep} />;
    case 2:
      return <FormPay currentStepSetter={setCurrentStep} />;
    case 3:
      return <Confirmation />;
    default:
      return (
        <>
          <Head>
            <title>Booking</title>
          </Head>
          <NavigationBooking />
          {/* samler context i formData */}
          <MainTicket currentStepSetter={setCurrentStep} formData={{ formState, dispatch }} spotData={data} />
        </>
      );
  }
}
