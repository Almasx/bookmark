//check if url is valid
export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

// Custom events for link management
export const EVENTS = {
  ADD_DEMO_LINK: "add-demo-link",
} as const;

export const addDemoLink = () => {
  const event = new CustomEvent(EVENTS.ADD_DEMO_LINK);
  window.dispatchEvent(event);
};
