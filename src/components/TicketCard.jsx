import React, { useState } from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, users }) => {
  const [showMore, setShowMore] = useState(false);
  const priorityLabels = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  // Get the user's name from their ID
  const assignedUser = users.find((user) => user.id === ticket.userId)?.name || 'Unassigned';

  return (
    <div className="ticket-card">
      {/* Display CAM identifier */}
      <span className="ticket-id">{ticket.id}</span>
      <h4 className="ticket-title">{ticket.title}</h4>

      {/* Three dots for additional details */}
      <button
        className="three-dots"
        onClick={() => setShowMore(!showMore)}
        aria-label="Show More"
      >
        &#x2022;&#x2022;&#x2022;
      </button>

      {showMore && (
        <div className="more-details">
          <p><strong>Assigned:</strong> {assignedUser}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Priority:</strong> {priorityLabels[ticket.priority]}</p>
        </div>
      )}
    </div>
  );
};

export default TicketCard;
