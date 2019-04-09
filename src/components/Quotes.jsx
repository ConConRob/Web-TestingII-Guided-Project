import React from "react";

export default function Quotes(props) {
  if (!props.quotes || props.quotes.length === 0) {
    return <div>SAD</div>;
  }
  return (
    <React.Fragment>
      {props.quotes.map(q => (
        <div data-testid="quote" key={q.id}>
          {q.text}
        </div>
      ))}
    </React.Fragment>
  );
}
