import "./App.css";
import { useEffect, useState } from "react";
import formula_1 from "./formula_1.json";
import formula_2 from "./formula_2.json";
function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  var [totalVal, setTotalVal] = useState("");
  const [getval, setGetval] = useState("");
  const [formula1, setFormula1] = useState(true);
  const [formula2, setFormula2] = useState(false);

  // const fnClick = () => {
  //   console.log(value.name);
  // };
  const fnOnchange = (val, name) => {
    // switch (name) {
    //   case "input0":
    //     return setValue1(val);
    //   case "input1":
    //     return setValue2(val);

    //   default:
    //     return setValue3(val);
    // }
    var getData = {
      nameIn: name,
      values: val,
    };
    // console.log(getData);
    setGetval([getval, getData]);
  };
  useEffect(() => {
    fnOnchangeStr();
  }, [value1, value2, value3]);

  const fnOnchangeStr = () => {
    var a = formula_1[0].formula;
    var b = formula_1[1].formula;
    var c = formula_1[1].formula;
    var data = [
      {
        formula: a,
        value: value1,
      },
      {
        formula: b,
        value: value2,
      },
      {
        formula: c,
        value: value3,
      },
    ];
    setTotalVal(data);
  };
  const fnOnclick = () => {
    console.log(totalVal);
  };
  return (
    <>
      <div className="mt-4">
        <button
          onClick={() => {
            setFormula1(true);
            setFormula2(false);
            setValue1("");
            setValue2("");
            setValue3("");
          }}
          className="btn btn-primary btn-sm"
        >
          formula-1
        </button>
        {"    "}
        <button
          onClick={() => {
            setFormula1(false);
            setFormula2(true);
            setValue1("");
            setValue2("");
            setValue3("");
          }}
          className="btn btn-primary btn-sm"
        >
          formula-2
        </button>
      </div>
      <div className="table-div">
        {formula1 && (
          <>
            <table>
              <tbody>
                {formula_1 &&
                  formula_1.map((data, index) => (
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
            <button onClick={() => fnOnclick()}>submit</button>
          </>
        )}
        {formula2 && (
          <>
            <table>
              <tbody>
                {formula_2 &&
                  formula_2.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <input type="text" defaultValue={data.formula} />
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
            <button onClick={() => fnOnclick()}>submit</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
