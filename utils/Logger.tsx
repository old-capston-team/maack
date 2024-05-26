let onLogChange = null;

const setOnLogChange = (callback) => {
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
