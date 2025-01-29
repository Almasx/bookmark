//check if url is valid
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
};
