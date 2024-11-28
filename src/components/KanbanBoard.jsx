import React from 'react';
import TicketCard from './TicketCard';
import Dropdown from './Dropdown';
import './KanbanBoard.css'; 

const KanbanBoard = ({ tickets, users, grouping, ordering, onGroupingChange, onOrderingChange }) => {
  // Helper functions to group and sort
  const groupBy = (tickets, key) => {
    if (!Array.isArray(tickets)) return {};

    return tickets.reduce((groups, ticket) => {
      const groupKey = ticket[key] || 'No Group';
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets) => {
    return [...tickets].sort((a, b) => {
      if (ordering === 'priority') return b.priority - a.priority;
      if (ordering === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  };

  // Group tickets based on the selected grouping
  const groupedTickets = groupBy(tickets, grouping);

  return (
    <div className="kanban-board">
      <div className="controls">
        <Dropdown
          label="Grouping"
          options={['status', 'userId', 'priority']}
          selected={grouping}
          onChange={onGroupingChange}
        />
        <Dropdown
          label="Ordering"
          options={['priority', 'title']}
          selected={ordering}
          onChange={onOrderingChange}
        />
      </div>
      <div className="board">
        {Object.keys(groupedTickets).map((groupKey) => {
          // Get the user name if grouping by userId
          const groupName =
            grouping === 'userId'
              ? users.find((user) => user.id === groupKey)?.name || 'Unassigned'
              : groupKey;

          return (
            <div key={groupKey} className="column">
              <h3 className="column-header">{groupName}</h3>
              <div className="tickets">
                {sortTickets(groupedTickets[groupKey]).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} users={users} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
