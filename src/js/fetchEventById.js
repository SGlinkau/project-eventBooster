//Import library to HTTP request
import axios from 'axios';
const axios = require('axios');

//Function for HTTP requests - used axios library,
export const fetchEventById = async (eventsId) => {
  const API_KEY = 'A5eAX0q8IljtAC67wdXuGh2kSb6ZRaVP';
 
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events/${eventsId}.json?apikey=${API_KEY}`
    );
    const responseData = response.data;
    return responseData;  
};

