/**
 * Checks if a string represents a boolean value and returns the corresponding boolean.
 * @param {string} string - The string to check.
 * @param {boolean} defaultValue - The default value to return if the string does not represent a boolean.
 * @returns {boolean} - The boolean value corresponding to the string, or the defaultValue if the string is not a valid boolean representation.
 */
export const checkBooleanString = (string, defaultValue) => {
  if (string === 'on' || string === 'true' || string === '1') {
    return true
  } else if (string === 'off' || string === 'false' || string === '0') {
    return false
  } else {
    return defaultValue
  }
}

/**
 * Checks if a string can be parsed into an integer and returns the parsed value.
 * If the string cannot be parsed, it returns the defaultValue.
 *
 * @param {string} string - The string to be parsed.
 * @param {number} defaultValue - The default value to be returned if the string cannot be parsed.
 * @returns {number} - The parsed integer value or the defaultValue.
 */
export const checkIntegerString = (string, defaultValue) => {
  const parsed = parseInt(string)
  if (isNaN(parsed)) {
    return defaultValue
  } else {
    return parsed
  }
}

/**
 * Parses a string into a floating-point number and returns the result.
 * If the string cannot be parsed, it returns the defaultValue.
 *
 * @param {string} string - The string to be parsed.
 * @param {number} defaultValue - The value to be returned if the string cannot be parsed.
 * @returns {number} The parsed floating-point number or the defaultValue.
 */
export const checkFloatString = (string, defaultValue) => {
  const parsed = parseFloat(string)
  if (isNaN(parsed)) {
    return defaultValue
  } else {
    return parsed
  }
}

export const base64ToDataUrl = (base64) => {
  return `data:image/png;base64,${base64}`
}
