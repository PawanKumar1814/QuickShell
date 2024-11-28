export const fetchTickets = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the full API response
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return { tickets: [], users: [] }; // Return empty fallback data
  }
};
