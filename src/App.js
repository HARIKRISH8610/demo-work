import "./App.css";
import { useEffect, useState } from "react";
import formula_1 from "./formula_1.json";
import formula_2 from "./formula_2.json";
import Answer from "./Answer";

function App() {
  const [getval, setGetval] = useState("");
  const [formula, setFormula] = useState("");
  const [answer, setAnswer] = useState(false);
  const [calcVal, setCalcVal] = useState("");
  const [count, setCount] = useState([0, true]);

  useEffect(() => {
    if (count[1] == true) {
      setFormula(formula_1);
    } else {
      setFormula(formula_2);
    }
  }, [count]);

  const fnOnchange = (val, name) => {
    if (getval == "") {
      var getData = {
        nameIn: name,
        values: val,
      };
      setGetval([getData]);
    } else {
      var find = [];
      for (let i = 0; i < getval.length; i++) {
        if (getval[i].nameIn == name) {
          find.push(...find, true);
        } else {
          find.push(...find, false);
        }
      }
      var Present = find.includes(true);
      if (Present == false) {
        var getData = {
          nameIn: name,
          values: val,
        };
        setGetval([...getval, getData]);
      } else {
        for (let i = 0; i < getval.length; i++) {
          if (getval[i].nameIn == name) {
            var getData = {
              nameIn: name,
              values: val,
            };
            var replacedate = getval;
            replacedate.splice(i, 1, getData);
            setGetval([...replacedate]);
          }
        }
      }
    }
  };

  const fnOnclick = () => {
    setAnswer(true);
    var newdatas = [];
    for (let i = 0; i < getval.length; i++) {
      var datas = [formula[i].formula, getval[i].values];
      newdatas.push({ datas });
    }
    var Calcval = [];
    for (let i = 0; i < newdatas.length; i++) {
      var findIn = [...newdatas[i].datas[0]];
      var index = findIn.indexOf("x");
      findIn.splice(index, 1, newdatas[i].datas[1]);
      var joined = findIn.join("");
      var calculation = eval(joined);
      Calcval.push(calculation);
    }
    setCalcVal(Calcval);
  };
  return (
    <div className="ms-4">
      <div className="mt-4">
        <button
          onClick={() => {
            setFormula("");
            setGetval("");
            setCalcVal("");
            setCount([count[0] + 1, true]);
            setAnswer(false);
          }}
          className="btn btn-primary btn-sm"
        >
          formula-1
        </button>
        {"    "}
        <button
          onClick={() => {
            setAnswer(false);
            setFormula("");
            setGetval("");
            setCalcVal("");
            setCount([count[0] + 1, false]);
          }}
          className="btn btn-primary btn-sm"
        >
          formula-2
        </button>
      </div>
      <div className="mt-3 table-div">
        {formula && (
          <>
            <table>
              <tbody>
                {formula &&
                  formula.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name={"Constinput" + [index]}
                          defaultValue={data.formula}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) => {
                            fnOnchange(e.target.value, e.target.name);
                          }}
                          name={"input" + [index]}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="btn mt-4 btn-success btn-sm"
              onClick={() => fnOnclick()}
            >
              submit
            </button>
          </>
        )}
      </div>
      {answer && <Answer value={calcVal} />}
    </div>
  );
}

export default App;
