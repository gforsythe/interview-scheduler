const { useState } = require("react");
                                //"EMPTY"
const useVisualMode = function (inital) {
  //the stack is the call stack IE- Magic the gathering
  //history is the array of the modes
  //the end of the array is the most recent slide
  const [history, setHistory] = useState([inital]);
  //modes are like slide show
  const mode = history.slice(-1)[0];
  
  const transition = function (mode, replace = false) {

    setHistory(prevState => {
      if (replace === true) {
        return [...prevState.slice(0,-1), mode];
      }
      return [...prevState, mode];
    });

  };

  const back = function () {

    setHistory(prevState => {
      const newHistory = [...prevState];
      if (newHistory.length <= 1) {
        return newHistory;
      }
      newHistory.pop();

      return newHistory;
    });
  };
  
  return { mode, transition, back };
};

export default useVisualMode;