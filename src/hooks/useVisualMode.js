const { useState } = require("react");

const useVisualMode = function (inital) {
  const [history, setHistory] = useState([inital]);

  const transition = function (newMode) {
    setHistory(prevState => {
      return [...prevState,newMode]
    });
  };

  const back = function () {

    setHistory(prevState => {
      const newHistory = [...prevState];
      newHistory.pop();

      return newHistory;
    });
  };
  const mode = history.slice(-1)[0];
  return { mode, transition, back };
};

export default useVisualMode;