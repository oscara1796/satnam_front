import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'
import styles from './ContactAdminList.module.css';

const ContactAdminList = ({ isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Assuming you'll calculate or receive this from the API
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    fetchMessages(currentPage); // Fetch messages when the component mounts or currentPage changes
  }, [currentPage]);

  const fetchMessages = async (page) => {
    try {
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/contact/?page=${page}`, {
        headers: headers,
      });
      console.log(response.data);
      setMessages(response.data.results);
      setNextPageUrl(response.data.next); // Update with actual API response
      setPrevPageUrl(response.data.previous); // Update with actual API response
      // Calculate total pages if you have total items count and items per page
      // setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error (show error message)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    // Update this condition based on your totalPages or nextPageUrl logic
    setCurrentPage(currentPage + 1);
  };

  if (!isLoggedIn || (state.user && !state.user.is_staff)) {
    return <Navigate to='/log-in' />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mensajes</h2>
      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.messageItem}>
            <div className={styles.messageInfo}>
              {message.name} - {message.email}
            </div>
            <button onClick={() => handleView(message.id)} className={styles.viewButton}>View</button>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={!prevPageUrl} className={styles.navButton}>Previous</button>
        <button onClick={handleNextPage} disabled={!nextPageUrl} className={styles.navButton}>Next</button>
      </div>
    </div>
  );
};

export default ContactAdminList;
