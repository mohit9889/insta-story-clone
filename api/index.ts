const API_BASE_URL = process.env.API_BASE_URL;

export const fetchFeed = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/feed`);

    if (!res.ok) {
      // Throw an error if response is not OK
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data.feed;
  } catch (error) {
    // Handle errors
    console.error("Error fetching feed:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
