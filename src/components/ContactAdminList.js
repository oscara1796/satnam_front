import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'

const ContactAdminList = ({isLoggedIn}) => {
  const [messages, setMessages] = useState([]);
  const [state, setState] = useContext(UserContext)

  useEffect(() => {
    const fetchMessages = async () => {
      try {

        const token = getAccessToken()
        const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/contact/`, {
          headers: headers,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        // Handle error (show error message)
      }
    };

    fetchMessages();
  }, []);

  const handleView = (messageId) => {
    // Handle viewing message logic here
    console.log('View message:', messageId);
  };

  const handleDownload = () => {
    // Handle downloading message logic here
    console.log('Download messages ');
  };

  if (!isLoggedIn || (state.user && !state.user.is_staff)) {
    return <Navigate to='/log-in' />
  }

  return (
    <div>
      <h2>Mensajes</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.subject} - {message.sender}
            <button onClick={() => handleView(message.id)}>View</button>
            
          </li>
        ))}
      </ul>

      <button onClick={() => handleDownload()}>Download</button>
    </div>
  );
};

export default ContactAdminList;
