let onLogChange = null;

const setOnLogChange = (callback: (prevState: undefined) => undefined) => {
  onLogChange = callback;
};

const log = (message: String) => {
  if (onLogChange) {
    onLogChange(message);
  }
};

export default {
  setOnLogChange,
  log,
};
