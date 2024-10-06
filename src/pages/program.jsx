import stylesProgram from "../styles/Program.module.css";
import { useState } from "react";
import Modal from "@/components/Modal";
import Head from "next/head";
import Link from "next/link";

export default function Program({ scheduleData, bandData }) {
  const [selectedBand, setSelectedBand] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  // callback function that is called when a band event is clicked. It takes the selected bandEvent and day as a parameter.
  const handleBandSelection = (bandEvent, day) => {
    // opretter en variabel og tildeler den en værdi baseret på resultatet filtrering af dataene
    // Hvis længden af det filtrerede array er større end nul, bliver værdien sand
    let stage = scheduleData.Jotunheim[day].filter((act) => act.act === bandEvent.act).length ? "Jotunheim" : false;
    if (!stage) {
      stage = scheduleData.Midgard[day].filter((act) => act.act === bandEvent.act).length ? "Midgard" : false;
    }
    if (!stage) {
      stage = scheduleData.Vanaheim[day].filter((act) => act.act === bandEvent.act).length ? "Vanaheim" : false;
    }

    // søger efter et objekt i bandData-arrayet, hvor name-attributtet er lig med bandEvent.act.
    // find()-metoden returnerer det første objekt, der opfylder betingelsen, ellers undefined
    let bandInfo = bandData.find((band) => band.name === bandEvent.act);
    // setSelectedBand() bliver kaldt med et objekt som argument
    setSelectedBand({
      ...bandEvent,
      day,
      stage,
      bandInfo,
    });
    setShowModal(true);
  };

  const Midmon = scheduleData.Midgard.mon;
  const Midtue = scheduleData.Midgard.tue;
  const Midwed = scheduleData.Midgard.wed;
  const Midthu = scheduleData.Midgard.thu;
  const Midfri = scheduleData.Midgard.fri;
  const Midsat = scheduleData.Midgard.sat;
  const Midsun = scheduleData.Midgard.sun;

  // JOTUNHEIM
  const Jotmon = scheduleData.Jotunheim.mon;
  const Jottue = scheduleData.Jotunheim.tue;
  const Jotwed = scheduleData.Jotunheim.wed;
  const Jotthu = scheduleData.Jotunheim.thu;
  const Jotfri = scheduleData.Jotunheim.fri;
  const Jotsat = scheduleData.Jotunheim.sat;
  const Jotsun = scheduleData.Jotunheim.sun;

  // VANAHEIM
  const Vanmon = scheduleData.Vanaheim.mon;
  const Vantue = scheduleData.Vanaheim.tue;
  const Vanwed = scheduleData.Vanaheim.wed;
  const Vanthu = scheduleData.Vanaheim.thu;
  const Vanfri = scheduleData.Vanaheim.fri;
  const Vansat = scheduleData.Vanaheim.sat;
  const Vansun = scheduleData.Vanaheim.sun;

  return (
    <>
      <Head>
        <title>Program</title>
      </Head>
      <Modal selectedBand={selectedBand} showModal={showModal} handleCloseModal={setShowModal} />
      {/* program site wraped inside a conditional rendering */}
      {/* checks if showModal is false using the logical NOT operator - if true, the content within the parentheses will be rendered. */}
      {!showModal && (
        <section className={stylesProgram.programBackground}>
          <h1 className={stylesProgram.programHeading}>Program</h1>
          <Link className={stylesProgram.link} href="/schedule">
            / Schedule
          </Link>
          <div className={stylesProgram.search}>
            {/* onChange - event-handler, der modtager en anonym funtion/arrow function */}
            <input type="search" id="search" placeholder="Search artitst" onChange={(e) => setSearchResults(e.target.value)} />
          </div>
          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midmon.concat(Jotmon, Vanmon).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Monday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>
          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midtue.concat(Jottue, Vantue).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Tuesday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>

          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midwed.concat(Jotwed, Vanwed).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Wednesday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>

          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midthu.concat(Jotthu, Vanthu).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Thursday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>

          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midfri.concat(Jotfri, Vanfri).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Friday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>

          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midsat.concat(Jotsat, Vansat).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Saturday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>
          <section className={stylesProgram.programContainer}>
            {(() => {
              // includes bruges som et filtreringskriterie for at finde de bandbegivenheder, der matcher søgekriterierne
              const filteredEvents = Midsun.concat(Jotsun, Vansun).filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()));
              //tjekker om filteredEvents er tom eller ej.
              if (filteredEvents.length > 0) {
                return (
                  <>
                    <h2>Sunday</h2>
                    {/* skaber et nyt array - callback funktion der tager bandEvent som argument */}
                    {filteredEvents.map((bandEvent) => {
                      if (bandEvent.act.includes("break")) {
                        // Skip rendering the band event if it includes "break"
                        return null;
                      }

                      // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
                      // Bruges senere til at opdele 'act' i tre dele: 'beforeMatch', 'match' og 'afterMatch'.
                      const act = bandEvent.act;
                      // sætter start indexet af searchResults.
                      const index = act.toLowerCase().indexOf(searchResults.toLowerCase());

                      // tjekker om searchResults findes i "act-strengen", hvis over -1 searchResults fundet.
                      if (index !== -1) {
                        // returnerer fra 0 indtil index
                        const beforeMatch = act.substring(0, index);
                        const match = act.substring(index, index + searchResults.length);
                        // fra index længde til slut
                        const afterMatch = act.substring(index + searchResults.length);

                        return (
                          <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                            <span>{" " + beforeMatch}</span>
                            <span className={stylesProgram.highlight}>{match}</span>
                            <span>{afterMatch}</span> /
                          </p>
                        );
                      }

                      return (
                        <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                          {" " + bandEvent.act} /
                        </p>
                      );
                    })}
                  </>
                );
              }

              return null;
            })()}
          </section>

          {/* FØR SEARCHBAR BLEV IMPLEMENTERET */}
          {/* 
          <section className={stylesProgram.programContainer}>
            <h2>Tuesday</h2>

            {Midtue.concat(Jottue, Vantue)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "tue")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Wednesday</h2>

            {Midwed.concat(Jotwed, Vanwed)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "wed")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Thursday</h2>

            {Midthu.concat(Jotthu, Vanthu)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "thu")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Friday</h2>
            {Midfri.concat(Jotfri, Vanfri)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "fri")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Saturday</h2>

            {Midsat.concat(Jotsat, Vansat)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "sat")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Sunday</h2>

            {Midsun.concat(Jotsun, Vansun)
              .filter((bandEvent) => bandEvent.act.toLowerCase().includes(searchResults.toLowerCase()))
              .map((bandEvent) => {
                if (bandEvent.act.includes("break")) {
                  // Skip rendering the band event if it includes "break"
                  return null;
                }
                return (
                  <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "sun")}>
                    <span>{" " + bandEvent.act}</span> /
                  </p>
                );
              })} */}
          {/* </section> */}
        </section>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const apiEndpoints = ["https://nova-enchanted-confidence.glitch.me/bands", "https://nova-enchanted-confidence.glitch.me/schedule"];
  // mapper igennem hver array alt efter hvilket endpoint det er og fetcher
  const apiRequest = apiEndpoints.map((endpoint) => fetch(endpoint));
  // Promise.all venter på alle apiRequest er kørt igennem før den går videre.
  const [bandRes, scheduleRes] = await Promise.all(apiRequest);

  const bandData = await bandRes.json();
  const scheduleData = await scheduleRes.json();

  return {
    props: {
      bandData,
      scheduleData,
      isProgram: true,
    },
  };
}
