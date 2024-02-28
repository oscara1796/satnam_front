import { toast } from 'react-toastify'

export const showErrorNotification = (error) => {
  // Default error message

  console.log('entro aqui')
  let defaultMessage =
    'Un error inesperado ocurrió, por favor intente más tarde.'

  if (error.response) {
    // Check if the errors are in a specific structure
    if (error.response.data.message || error.response.data) {
      defaultMessage = error.response.data.message

      if (!defaultMessage) {
        defaultMessage = error.response.data // Fallback to 'data' if 'message' is not present
      }

      if (typeof defaultMessage === 'object') {
        for (const key in defaultMessage) {
          if (defaultMessage.hasOwnProperty(key)) {
            const fieldErrors = defaultMessage[key]
            // Assuming each field could have multiple errors
            fieldErrors.forEach((errMessage) => {
              // Display a toast for each error message
              toast.error(`${key}: ${errMessage}`)
            })
          }
        }
        return
      }
      // Iterate over each field in the errors object
    } else if (error.response.status) {
      // Generic message based on status code if no specific messages are available
      defaultMessage = `El servidor respondió con un error ${error.response.status}.`
    }
  } else if (error.request) {
    defaultMessage =
      'El servidor no está respondiendo. Por favor, verifique su conexión a internet o intente más tarde.'
  } else if (error.code === 'ECONNABORTED') {
    defaultMessage =
      'La solicitud al servidor tomó demasiado tiempo en responder y fue abortada. Por favor, intente nuevamente.'
  } else if (error.message) {
    defaultMessage = error.message
  }

  console.log('ERROR', defaultMessage)
  // Displaying the default toast notification if no structured errors were found
  toast.error(defaultMessage)
}
