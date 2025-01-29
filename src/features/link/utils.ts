//check if url is valid
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

  return false;
};
