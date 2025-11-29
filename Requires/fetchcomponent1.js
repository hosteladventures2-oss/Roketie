const axios = require('axios');
const fetchComponent1 = async (req, res) => {
  const data = req.body;
  console.log("Data received from Component1:", data);

  // Sending data to PHP script using a POST request
  try {
  
    const response = await axios.post('http://myviews.atwebpages.com/Node_php/Fetch.php', data);
    console.log ('from php:',response.data) // Return the data
  } catch (error) {
    console.error('Error:', error.message);
    return null; // Return null in case of an error
  }
};

module.exports = fetchComponent1;

  