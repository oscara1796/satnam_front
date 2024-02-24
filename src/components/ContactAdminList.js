import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'
import styles from './ContactAdminList.module.css';
import { showErrorNotification } from '../services/notificationService'
<<<<<<< HEAD
=======
import { toast } from 'react-toastify'
>>>>>>> d557dcb (adding hability to delete comments)

const ContactAdminList = ({ isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Assuming you'll calculate or receive this from the API
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [state, setState] = useContext(UserContext);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [getMessages, setGetMessages] = useState(false);


  useEffect(() => {
    fetchMessages(currentPage); // Fetch messages when the component mounts or currentPage changes
  }, [currentPage, getMessages]);

  const fetchMessages = async (page) => {
    try {
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/contact/?page=${page}`, {
        headers: headers,
      }, {timeout: 5000});
      console.log(response.data);
      setMessages(response.data.results);
      setNextPageUrl(response.data.next); // Update with actual API response
      setPrevPageUrl(response.data.previous); // Update with actual API response
      // Calculate total pages if you have total items count and items per page
      // setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      showErrorNotification(error)
      console.error('Error fetching messages:', error);
      // Handle error (show error message)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleView = (messageId) => {
    const message = messages.find((m) => m.id === messageId);
    setSelectedMessage(message);
    setIsModalVisible(true); // Open the modal
  };

  const handleNextPage = () => {
    // Update this condition based on your totalPages or nextPageUrl logic
    setCurrentPage(currentPage + 1);
  };

  const handleDeleteMessage = async (messageId) => {
    // Implement message deletion logic here
    console.log("Deleting message with id:", messageId);
    try {
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/contact/${messageId}`, {
        headers: headers,
      }, {timeout: 5000});
      console.log(response.data);
      toast.success("Mensaje eliminado exitosamente")
      setGetMessages(!getMessages);
    } catch (error) {
      showErrorNotification(error)
      console.error('Error fetching messages:', error);
      // Handle error (show error message)
    }
    // After deletion, close the modal and refresh messages or remove the message from state
    setIsModalVisible(false);
    // Optionally, refresh the messages list or remove the message from the local state
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  if (!isLoggedIn || (state.user && !state.user.is_staff)) {
    return <Navigate to='/log-in' />;
  }

  return (
    <>
    
      <div className={styles.container}>
        <h2 className={styles.title}>Mensajes</h2>
        <ul className={styles.messageList}>
          {messages.map((message) => (
            <li key={message.id} className={styles.messageItem}>
              <div className={styles.messageInfo}>
                {message.id}-{message.name} - {message.email}
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
      {isModalVisible && selectedMessage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Message Details</h3>
            <p>Name: {selectedMessage.name}</p>
            <p>Email: {selectedMessage.email}</p>
            <p>Message: {selectedMessage.message}</p>
            <button className="btn btn-primary " onClick={handleCloseModal} >Close</button>
            <button className="btn btn-danger mx-3"  onClick={() => handleDeleteMessage(selectedMessage.id)} >Delete</button>
          </div>
        </div>
      )}

    </>
    );
};

export default ContactAdminList;
