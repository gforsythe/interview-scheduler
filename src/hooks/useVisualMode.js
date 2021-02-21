const { useState } = require("react");
//"EMPTY"
const useVisualMode = function (intial) {
  //the stack is the call stack IE- Magic the gathering
  //history is the array of the modes
  //the end of the array is the most recent slide
  const [history, setHistory] = useState([intial]);
  //modes are like slide show
  const [mode, setMode] = useState(intial);


  const transition = function (mode, replace = false) {
    const pop = replace ? history.slice(0, -1) : history;

    setMode(mode);

    setHistory([...pop, mode]);



  };

  const back = function () {

    if (history.length <= 1) {
      return;
    }
    const pop = history.slice(0, -1);
    setHistory([...pop]);
    setMode(pop.slice(-1)[0]);
  };

  return { mode, transition, back };
};

export default useVisualMode;