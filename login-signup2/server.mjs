import express from 'express';
import axios from 'axios';
import cors from 'cors'; // Import CORS for handling cross-origin requests

const app = express();
const port = 5000; // Port for the backend server

app.use(cors()); // Allow cross-origin requests (important for frontend-backend communication)
app.use(express.json()); // Middleware to parse JSON data from the request body

const apiKey = 'AIzaSyBcqVR4zLFbgtsOyfEwAegsclAFDr6liiY'; // Replace with your actual API key

// Endpoint for translating text
app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  // Check if text and targetLanguage are provided
  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and target language are required' });
  }

  try {
    // Call Google Translate API
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        q: text,
        target: targetLanguage,
      }
    );

    // Extract translated text from the response
    const translatedText = response.data.data.translations[0].translatedText;
    res.json({ translatedText }); // Send the translated text back to the client
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

// Starting the server on port 5000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
