export const convertToReadableString = (inputString: string): string => {
  /**
   * Converts a string from camel case or pascal case to a readable string.
   *
   * @param inputString The input string to be converted.
   * @returns A readable string.
   */
  return inputString
    .replace(/([A-Z])/g, " $1") // insert a space before every capital letter
    .trim() // remove leading and trailing spaces
    .toLowerCase() // convert to lowercase
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
    .join(" "); // join the words back into a string
};

// Example usage:
// console.log(convertToReadableString("InCountryRemote")); // Output: "In Country Remote"
