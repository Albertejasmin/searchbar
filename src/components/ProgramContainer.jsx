import stylesProgram from "../styles/Program.module.css";

export default function ProgramContainer({ title, events, handleBandSelection, searchResults }) {
  if (events.length > 0) {
    return (
      <section className={stylesProgram.programContainer}>
        <h2>{title}</h2>
        {/* skaber et nyt array - iterer over bandEvent */}
        {events.map((bandEvent) => {
          if (bandEvent.act.includes("break")) {
            // Skip rendering the band event if it includes "break"
            return null;
          }
          // Gemmer den oprindelige 'act'-streng fra 'bandEvent'.
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
              <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent)}>
                <span>{" " + beforeMatch}</span>
                <span className={stylesProgram.highlight}>{match}</span>
                <span>{afterMatch}</span> /
              </p>
            );
          }
        })}
      </section>
    );
  }

  return null;
}
