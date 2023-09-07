import axios from "axios";

const API_BASE_URL = "/translate";

const translateText = async (text) => {
  try {
    const response = await axios.post(API_BASE_URL, { text });
    return response.data.translation;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { translateText };
