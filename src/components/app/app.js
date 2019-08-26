import React from "react";
import './app.css';
import TicketsListContainer from "../../containers/tickets-list-container";
import TicketsListFilter from "../tickets-list-filter";

const App = () => {
  return (
    <main className="page-main">
      <div className="logo-svg"> </div>
      <section className="page-main__aviasales">
        <TicketsListFilter />
        <TicketsListContainer />
      </section>
    </main>
  );
};

export default App;
