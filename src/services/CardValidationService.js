import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from '@fortawesome/free-brands-svg-icons'

// Validate cvc of card
export const isValidCVC = (cvc) => {
  // Regular expression to match a valid CVC (3 or 4 digits)
  const cvcRegex = /^\d{3,4}$/
  return cvcRegex.test(cvc)
}

export function isValidMonth(input) {
  // Regular expression to match a valid month (01 to 12)
  const value = input
  const month = parseInt(value, 10)

  if (month >= 1 && month <= 12) {
    return value // Return the valid month
  } else {
    return '' // Return an empty string if it's not a valid month
  }
}

export function isCreditCardValid(cardNumber) {
  // Remove any non-digit characters
  cardNumber = cardNumber.replace(/\D/g, '')

  // Check if the card number is empty or doesn't consist of 13 to 19 digits
  if (!/^\d{13,19}$/.test(cardNumber)) {
    return false
  }

  // Use the Luhn algorithm to validate the credit card number
  let sum = 0
  let doubleUp = false
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i))
    if (doubleUp) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    doubleUp = !doubleUp
  }

  return sum % 10 === 0
}

// format credit card number into fours and validate credit number
export function card_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g)
  var match = (matches && matches[0]) || ''
  var parts = []

  for (var i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}

// Add optional years for the expiration card from todays date up to 10 years

export function AddExpirationYears(years_array, years_to_add) {
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < years_to_add; i++) {
    years_array.push(currentYear + i)
  }
}

export const getCardBrandIcon = (brand) => {
  switch (brand) {
    case 'visa':
      return faCcVisa
    case 'mastercard':
      return faCcMastercard
    case 'amex':
      return faCcAmex
    case 'discover':
      return faCcDiscover
    default:
      return null // Or a default icon
  }
}
