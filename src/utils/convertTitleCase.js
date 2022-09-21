export const titleCase = (str) => {
  let newStr = "";
  const strReplace = replaceSpecialChar(str, "_");

  for (let i = 0; i < strReplace.length; i++) {
    const getChar = strReplace.charAt(i);
    const toUpper = getChar.toUpperCase();

    if (i === 0 || isSpecialChar(strReplace.charAt(i - 1))) {
      newStr += toUpper;
    } else if (
      getChar === toUpper &&
      !isSpecialChar(strReplace.charAt(i - 1)) &&
      !isSpecialChar(getChar)
    ) {
      newStr += "_" + toUpper;
    } else {
      newStr += getChar;
    }
  }

  return replaceSpecialChar(newStr, " ");
};

export const replaceSpecialChar = (str, char) => {
  return str.replace(/[^a-zA-Z ]/g, char);
};

export const isSpecialChar = (str) => {
  return str.match(/^[^a-zA-Z0-9]+$/) ? true : false;
};
