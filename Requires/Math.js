const axios = require('axios');

const add = async (joe, email) => {
  try {
    const data = {
      name: joe,
      email: email,
    };
    
    const response = await axios.post('http://myviews.atwebpages.com/Node_php/Fetch.php', data);
    return response.data; // Return the data
  } catch (error) {
    console.error('Error:', error.message);
    return null; // Return null in case of an error
  }
};

module.exports = { add };
