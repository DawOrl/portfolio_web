import "./type-interlude.css";

export function TypeInterlude() {
  return (
    <section
      id="od-pomyslu-do-strony"
      className="type-interlude"
      aria-labelledby="type-interlude-title"
    >
      <div className="shell">
        <div className="type-interlude-meta">
          <span>OD PIERWSZEJ ROZMOWY DO OSTATNIEGO DETALU</span>
          <span aria-hidden="true">DO / 03—04</span>
        </div>
        <h2 id="type-interlude-title" className="sr-only">
          Pomysł. Forma. Strona.
        </h2>
        <div className="type-composition" aria-hidden="true">
          <div className="type-row type-row-idea">
            <span className="type-index">01</span>
            <span className="type-word">
              POMYSŁ<span className="type-stop">.</span>
            </span>
          </div>
          <div className="type-row type-row-form">
            <span className="type-index">02</span>
            <span className="type-word">
              FORMA<span className="type-stop">.</span>
            </span>
          </div>
          <div className="type-row type-row-site">
            <span className="type-index">03</span>
            <span className="type-word">
              STRONA<span className="type-stop">.</span>
            </span>
          </div>
          <span className="type-registration" />
        </div>
        <div className="type-interlude-foot">
          <span>PRZEMYŚLANE W FORMIE. DOPRACOWANE W KODZIE.</span>
          <a href="#proces">
            Zobacz, jak pracuję <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
