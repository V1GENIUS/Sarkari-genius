import React, { useState , useEffect } from 'react';
 import axios from 'axios';
import './CreateJobPopup.css';
import APIGovtCards from "../Api/ApiGovtCard.js";

// function CreateCard({ cardData,isVisible, onClose,isEditMode ,cardId }) {

//   const [cardDetails, setCardDetails] = useState({
//     cardName: '',
//     linksName: [{linkName: '', linkURL: '' }],
    
//   });

//   const [message, setMessage] = useState({ type: '', text: '' });

  
  
//   useEffect(() => {
//     if (isEditMode && cardData) {
//       setCardDetails(cardData);
//     }
//   }, [cardData, isEditMode]);

  
//   const handleChange = (e, field, index) => {
//     const { name, value } = e.target;
//     const updatedDetails = { ...cardDetails };

//      if (field === 'ageLimit') {
//       updatedDetails.ageLimit[name] = value;
//     } else if (field === 'Qualification') {
//       updatedDetails.Qualification[name] = value;
//     } else {
//       updatedDetails[field] = value;
//     }

//     setCardDetails(updatedDetails);
//   };

//   const addRow = (field) => {
//     const updatedDetails = { ...cardDetails };
//     const newRow = {
//       linkName: { linkName: '', linkURL: '' }
    
//     };

//     updatedDetails[field].push(newRow[field]);
//     setCardDetails(updatedDetails);
//   };



//   const removeRow = (field, index) => {
//     setCardDetails((prev) => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditMode) {
//         await axios.put(APIGovtCards.getCardDetails, cardDetails, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         setMessage({ type: 'success', text: 'Card successfully updated!' });
//       } else {
      
//         await axios.post(APIGovtCards.createCard, cardDetails, {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         setMessage({ type: 'success', text: 'Card successfully created!' });
//       }

//       setTimeout(() => onClose(), 1000);
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
//       setMessage({
//         type: 'error',
//         text: error.response ? error.response.data.message : 'Error processing card details.',
//       });
//     }
//   };

//   if (!isVisible) return null;

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container">
//         <button className="close-button" onClick={onClose}>
//           &times;
//         </button>
//          <form onSubmit={handleSubmit} className="popup-form">
//         <h1>{isEditMode ? 'Edit Card Post' : 'Create Card Post'}</h1>
      

//           <div className="form-group">
//             <label>Card Name</label>
//             <input
//               type="text"
//               value={cardDetails.cardName}
//               onChange={(e) => handleChange(e, 'cardName')}
//               placeholder="Enter card name"
//               required
//             />
//           </div>

      

//           <h2>Important Links</h2>
// {Array.isArray(cardDetails.linksName) &&
//   cardDetails.linksName.map((link, index) => (
//     <div key={index} className="form-row">
//       <input
//         name="linkName"
//         type="text"
//         placeholder="Link Name"
//         value={link.linkName}
//         onChange={(e) => handleChange(e, 'linksName', index)}
//       />
//       <input
//         name="text"
//         type="text"
//         placeholder="Paste the Link"
//         value={link.linkURL}
//         onChange={(e) => handleChange(e, 'linksName', index)}
//       />
//       <button
//         type="button"
//         onClick={() => removeRow('linksName', index)}
//         className="remove-button"
//       >
//         Remove
//       </button>
//     </div>
//   ))}
// <button type="button" onClick={() => addRow()} className="add-button">
//   Add Links
// </button>

        
//           <button type="submit" className="submit-button">
//             {isEditMode ? 'Update Card Post' : 'Submit Card Post'}
          
//           </button>
//           {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

//           {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
//         </form> 

//             </div>
//     </div>

    
//   );
// }
function CreateCard({ cardData, isVisible, onClose, isEditMode, cardId }) {
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    linksName: [{ linkName: '', linkURL: '' }],
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (isEditMode && cardData) {
      setCardDetails(cardData);
    }
  }, [cardData, isEditMode]);

  const handleChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedDetails = { ...cardDetails };

    if (field === 'linksName') {
      const updatedLinks = [...updatedDetails.linksName];
      updatedLinks[index][name] = value;
      updatedDetails.linksName = updatedLinks;
    } else {
      updatedDetails[field] = value;
    }

    setCardDetails(updatedDetails);
  };

  const addRow = () => {
    setCardDetails((prev) => ({
      ...prev,
      linksName: [...prev.linksName, { linkName: '', linkURL: '' }],
    }));
  };

  const removeRow = (field, index) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validateLinks = () => {
    return cardDetails.linksName.every(
      (link) => link.linkName.trim() !== '' && link.linkURL.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLinks()) {
      setMessage({ type: 'error', text: 'Please fill all links correctly.' });
      return;
    }
    try {
      if (isEditMode) {
        await axios.put(`${APIGovtCards.getCardDetails}`, cardDetails, {
          headers: { 'Content-Type': 'application/json' },
        });
        setMessage({ type: 'success', text: 'Card successfully updated!' });
      } else {
        await axios.post(APIGovtCards.createCard, cardDetails, {
          headers: { 'Content-Type': 'application/json' },
        });
        setMessage({ type: 'success', text: 'Card successfully created!' });
        
      }

      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setMessage({
        type: 'error',
        text: error.response ? error.response.data.message : 'Error processing card details.',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="popup-form">
          <h1>{isEditMode ? 'Edit Card Post' : 'Create Card Post'}</h1>

          <div className="form-group">
            <label>Card Name</label>
            <input
              type="text"
              value={cardDetails.cardName}
              onChange={(e) => handleChange(e, 'cardName')}
              placeholder="Enter card name"
              required
            />
          </div>

          <h2>Important Links</h2>
          {Array.isArray(cardDetails.linksName) &&
            cardDetails.linksName.map((link, index) => (
              <div key={index} className="form-row">
                <input
                  name="linkName"
                  type="text"
                  placeholder="Link Name"
                  value={link.linkName}
                  onChange={(e) => handleChange(e, 'linksName', index)}
                />
                <input
                  name="linkURL"
                  type="text"
                  placeholder="Paste the Link"
                  value={link.linkURL}
                  onChange={(e) => handleChange(e, 'linksName', index)}
                />
                <button
                  type="button"
                  onClick={() => removeRow('linksName', index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          <button type="button" onClick={addRow} className="add-button">
            Add Links
          </button>

          <button type="submit" className="submit-button">
            {isEditMode ? 'Update Card Post' : 'Submit Card Post'}
          </button>
          {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
