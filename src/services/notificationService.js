import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'; // Ensure DOMPurify is installed and imported

const extractErrorMessage = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const errorElement = doc.querySelector('pre.exception_value');
  return errorElement ? errorElement.textContent : null;
};

export const showErrorNotification = (error) => {
  let defaultMessage = 'Un error inesperado ocurrió, por favor intente más tarde.';
  let message = ""
  if (error.response) {
    message = error.response.data.message || error.response.data;

    if (message) {
      if (typeof message === 'object') {
        // Iterate over structured errors
        for (const key in message) {
          if (Object.prototype.hasOwnProperty.call(message, key)) {
            message[key].forEach((errMessage) => {
              toast.error(`${key}: ${errMessage}`);
            });
          }
        }
        return; // Exit after handling structured errors
      } else {
        // Check and process if message is a string potentially containing HTML
        if (typeof message === 'string' && /<\/?[a-z][\s\S]*>/i.test(message)) {
          const extractedMessage = extractErrorMessage(message);
          message = extractedMessage || DOMPurify.sanitize(message); // Use extracted or sanitized message
        }
        defaultMessage = message;
      }
    } else if (error.response.status) {
      defaultMessage = `El servidor respondió con un error ${error.response.status}.`;
    }
  } else if (error.request) {
    defaultMessage = 'El servidor no está respondiendo. Por favor, verifique su conexión a internet o intente más tarde.';
  } else if (error.code === 'ECONNABORTED') {
    defaultMessage = 'La solicitud al servidor tomó demasiado tiempo en responder y fue abortada. Por favor, intente nuevamente.';
  } else if (error.message) {
    // Check for HTML content in generic error message
    if (/<\/?[a-z][\s\S]*>/i.test(error.message)) {
      const extractedMessage = extractErrorMessage(error.message);
      message = extractedMessage || DOMPurify.sanitize(error.message); 
    } else {
      defaultMessage = error.message;
    }
  }

  console.log('ERROR', defaultMessage); // Log the error
  toast.error(defaultMessage); // Display the error as a toast
};
