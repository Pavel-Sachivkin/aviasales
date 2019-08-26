import React from "react";
import TicketsListItem from "../tickets-list-item";
import TicketsListSortSettings from "../tickets-list-sort-settings";
import "./tickets-list.css";

const TicketsList = ({ tickets }) =>  {
    return (
      <ul className="ticket-list">
        <TicketsListSortSettings />
        {tickets.map((ticket, idx) => {
          return (
            <li key={idx}>
              <TicketsListItem ticket={ticket} />
            </li>
          );
        })}
      </ul>
    );
}



export default TicketsList;
