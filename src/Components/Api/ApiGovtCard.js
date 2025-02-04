// const BASE_URL = "https://sarkari-genius.onrender.com";
const BASE_URL = "http://localhost:7000";

const APIGovtCards = {
  getCardDetails: (id) => `${BASE_URL}/api/cards/${id}`,
  createCard: `${BASE_URL}/api/cards/create`,
  updateCard: (id) => `${BASE_URL}/api/cards/${id}`,
  deleteCard: (id) => `${BASE_URL}/api/cards/${id}`,
  getAllCards: `${BASE_URL}/api/cards`  ,
};


export default APIGovtCards;
