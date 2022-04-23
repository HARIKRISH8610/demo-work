import React from "react";

function Answer(props) {
  return (
    <div>
      <h5>Answer</h5>
      {props.value &&
        props.value.map((val, index) => (
          <div key={index}>
            <p>
              <b>{index + 1}:</b>
              {"  "}
              {val}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Answer;
