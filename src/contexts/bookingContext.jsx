import { createContext, useReducer } from "react";

export const formDataContext = createContext();

export const UpdateFormContext = createContext();

//useReducer to manage complex states in ticketContext
//global object expanded with inspiration  from https://github.com/Robert-d-s/foofest-app/blob/tereattendees/src/components/BookingForm.js

// oprettet initalteState, global object, som gemmer al den data som brugeren indtaster vi skal bruge
// Laver et Global object, for at vi kan bruge det på alle sider.
// formData en property der indeholder ET object af vores data

const initialState = {
  formData: {
    date: "",
    ticketType: "",
    ticketAmount: 0,
    area: "",
    // array af objecter, som gør at vi kan huske antal af personer og deres specifikke data
    attendees: [
      {
        fullname: "",
        email: "",
        phone: "",
      },
    ],
    green: false,
    tent: false,

    tents2: 0,
    tents3: 0,
    id: "",

    ticketPrice: 0,
  },
};

//purpose of reducers returns the next state
// Bruger reducer for at bryde vores "opdateringer" af state ned
// kigger efter 2 parametere action og state -  reducer reducerer så vi tager små bidder af hele det samlede initialState
function reducer(state, action) {
  console.log(action);
  // switch kigger efter parametre
  switch (action.action) {
    case "UPDATE_FIELD":
      // ... gør at vi splitter alle vores states,
      return {
        ...state,
        formData: {
          ...state.formData,
          // Sætnigen læser feltet og opdaterer værdien dynamisk
          // payload er den data som der er givet til vores action
          [action.payload.field]: action.payload.value,
        },
      };
    case "SET_TICKET_TYPE":
      //here extract the prop from payload
      const { ticketType } = action.payload;
      //modify payload based on choice and then insert into global state, chatgpt helped
      const ticketPrice = calculateTicketPrice(ticketType, state.formData.ticketAmount, state.formData.green, state.formData.tent, state.formData.tents2, state.formData.tents3);
      return {
        ...state,
        formData: {
          ...state.formData,
          ticketType: ticketType,
          ticketPrice: ticketPrice,
        },
      };

    case "SET_TICKET_AMOUNT":
      const { ticketAmount } = action.payload;

      const updatedPriceTicketAmount = calculateTicketPrice(state.formData.ticketType, ticketAmount, state.formData.green, state.formData.tent, action.payload.tents2Amount, action.payload.tents3Amount);
      return {
        ...state,
        formData: {
          ...state.formData,
          ticketAmount: parseInt(ticketAmount),
          ticketPrice: updatedPriceTicketAmount,
        },
      };
      return {};

    //Incase of green option
    case "GREEN":
      //here extract the prop from payload
      const { isChecked } = action.payload;
      //modify payload based on choice and then insert into global state, chatgpt helped
      const updatedticketwithGreen = calculateTicketPrice(state.formData.ticketType, state.formData.ticketAmount, isChecked, state.formData.tent, action.payload.tents2Amount, action.payload.tents3Amount);
      return {
        ...state,
        formData: {
          ...state.formData,
          green: isChecked,
          ticketPrice: updatedticketwithGreen,
        },
      };
    //Incase of tent set up
    case "TENT_SETUP":
      const { isTentChecked } = action.payload;
      return {
        ...state,
        formData: {
          ...state.formData,
          tent: isTentChecked,
        },
      };
    case "UPDATE_TICKET_PRICE":
      let updatedTicketPriceWithTent = 0;

      if (state.formData.tent) {
        // Define the cost of each tent (adjust according to your requirements)
        const tent2Cost = 10;
        const tent3Cost = 20;

        // Calculate the updated ticket price based on tent costs
        updatedTicketPriceWithTent = state.formData.ticketPrice + state.formData.tents2 * tent2Cost + state.formData.tents3 * tent3Cost;
      } else {
        updatedTicketPriceWithTent = ticketPrice;
      }

      return {
        ...state,
        formData: {
          ...state.formData,
          ticketPrice: updatedTicketPriceWithTent,
        },
      };

    case "SET_TENTS2_AMOUNT":
      const { tents2Amount } = action.payload;
      const updatedPriceWithTent2 = calculateTicketPrice(
        state.formData.ticketType,
        state.formData.ticketAmount,
        state.formData.green,
        state.formData.tent,
        parseInt(tents2Amount),

        state.formData.tents3
      );
      return {
        ...state,
        formData: {
          ...state.formData,
          tents2: parseInt(tents2Amount),
          ticketPrice: updatedPriceWithTent2,
        },
      };

    case "SET_TENTS3_AMOUNT":
      const { tents3Amount } = action.payload;
      // calculateTicketPrice modtager/parser argumenter der definere hvilken data der skal tages højde for.
      const updatedPriceWithTent3 = calculateTicketPrice(state.formData.ticketType, state.formData.ticketAmount, state.formData.green, state.formData.tent, state.formData.tents2, parseInt(tents3Amount));
      return {
        ...state,
        formData: {
          ...state.formData,
          tents3: parseInt(tents3Amount),
          ticketPrice: updatedPriceWithTent3,
        },
      };

    case "UPDATE_ATTENDEE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          //map through the existing atteendees[]

          attendees: state.formData.attendees.map((attendee, index) => {
            if (index === action.payload.index) {
              //and make sure each value is on the correct attendee index
              return {
                ...attendee,
                [action.payload.field]: action.payload.value,
              };
            }
            return attendee;
          }),
        },
      };
    case "CREATE_ATTENDEE_STRUCTURE":
      let attendees = [];
      //run through ticketAmount to get correct personal Info tabs loaded
      // for loop - obejct skubbes ud med propperties
      // i en variable der bruges til at løbe igennem loopet.
      for (let i = 0; i < state.formData.ticketAmount; i++) {
        attendees.push({ fullname: "", email: "", phone: "" });
      }
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: attendees,
        },
      };

    case "ADD_ATTENDEE":
      return {
        ...state,
        formData: {
          ...state.formData,
          attendees: [...state.formData.attendees, { fullname: "", email: "", phone: "" }],
        },
      };

    case "NEXT":
      return {
        ...state,

        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    /* tilbage */
    case "PREVIOUS":
      return {
        ...state,

        formData: {
          ...state.formData,
          ...action.payload,
        },
      };

    case "SUBMIT":
      return {
        ...state,
        formData: {
          ...state.formData,
        },
      };
    default:
      return state;
  }
}

// modtager en masse parametre. De er afhængige/sat på baggrund af rækkefølgen af argumenterne.
function calculateTicketPrice(ticketType, ticketAmount, isGreenChecked, isTentChecked, tents2Amount, tents3Amount) {
  let basePrice = 0;
  if (ticketType === "Regular") {
    basePrice = 799;
  } else {
    // Add other ticket types'
    basePrice = 1299;
  }

  let totalPrice = basePrice * ticketAmount;
  //if checkboxes is ticked
  if (isGreenChecked) {
    totalPrice += 249;
  }

  if (isTentChecked) {
    totalPrice += tents2Amount * 299 + tents3Amount * 399;
  }
  return totalPrice;
}

export const FormDataProvider = ({ children }) => {
  const [formData, dispatch] = useReducer(reducer, initialState);

  console.log(formData);
  return <formDataContext.Provider value={{ formData, dispatch }}>{children}</formDataContext.Provider>;
};
