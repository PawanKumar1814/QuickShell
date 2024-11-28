import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { fetchTickets } from './services/api';

const App = () => {
  const [tickets, setTickets] = useState([]); // Initialize as an empty array
  const [users, setUsers] = useState([]);    // For potential use later
  const [grouping, setGrouping] = useState('status'); // Default grouping by status
  const [ordering, setOrdering] = useState('priority'); // Default ordering by priority

  useEffect(() => {
    const savedView = JSON.parse(localStorage.getItem('kanbanView')) || {};
    setGrouping(savedView.grouping || 'status');
    setOrdering(savedView.ordering || 'priority');

    fetchTickets()
      .then((data) => {
        setTickets(data.tickets || []); // Extract the `tickets` array
        setUsers(data.users || []);    // Extract the `users` array (optional)
      })
      .catch((error) => console.error('Failed to fetch tickets:', error));
  }, []);

  const saveViewState = (grouping, ordering) => {
    localStorage.setItem('kanbanView', JSON.stringify({ grouping, ordering }));
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    saveViewState(newGrouping, ordering);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
    saveViewState(grouping, newOrdering);
  };

  return (
    <div>
        <KanbanBoard
          tickets={tickets}
          users={users} 
          grouping={grouping}
          ordering={ordering}
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleOrderingChange}
        />
    </div>
  );
};

export default App;
