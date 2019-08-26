import React from "react";
import "./tickets-list-item.css";

const TicketsListItem = ({ ticket }) => {

  let ticketPriceToString = String(ticket.price);
  let transformTicketPrice = ticketPriceToString.split("");
  transformTicketPrice.splice(-3, 0, " ");
  let ticketPrice = transformTicketPrice.join("");

  return (
    
    <div className="ticket-item-wrapper"> 
      <div className="ticket-item-header">
        <p className="ticket-item-price">{ticketPrice} Р</p>
        <img
          className="ticket-item-logo"
          src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="Company-logo"
        />
      </div>

      <ul>
        {ticket.segments.map((segment, idx) => {
          const ticketDurationInHours = Math.floor(segment.duration / 60);
          const ticketDurationInMinutes =
            segment.duration - ticketDurationInHours * 60;
          const ticketDuration = `${ticketDurationInHours}ч ${ticketDurationInMinutes}м`;
          const ticketTransfers =
            segment.stops.length > 1
              ? `${segment.stops.length} пересадки`
              : segment.stops.length > 0
              ? `${segment.stops.length} пересадка`
              : `${segment.stops.length} пересадок`;
          const departureTime = new Date(segment.date);
          const arrivalTime = new Date(segment.date);
          arrivalTime.setSeconds(departureTime.getSeconds() + segment.duration);

          return (
            <li key={idx}>
              <div className="ticket-item-content">
                <div className="ticket-item-route">
                  <p className="ticket-item-route-title">
                    {segment.origin} – {segment.destination}
                  </p>
                  <p className="ticket-item-route-text">
                    {`${("0" + departureTime.getHours()).slice(-2)}:${(
                      "0" + departureTime.getMinutes()
                    ).slice(-2)}`}{" "}
                    –{" "}
                    {`${("0" + arrivalTime.getHours()).slice(-2)}:${(
                      "0" + arrivalTime.getMinutes()
                    ).slice(-2)}`}
                  </p>
                </div>
                <div className="ticket-item-route">
                  <p className="ticket-item-route-title">В пути</p>
                  <p className="ticket-item-route-text">{ticketDuration}</p>
                </div>
                <div className="ticket-item-route">
                  <p className="ticket-item-route-title">{ticketTransfers}</p>
                  <p className="ticket-item-route-text">
                    {segment.stops.join(", ")}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TicketsListItem;
