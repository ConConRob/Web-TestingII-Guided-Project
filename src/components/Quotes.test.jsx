import React from "react";
import * as rt from "react-testing-library";
import Quotes from "./Quotes";

afterEach(rt.cleanup);
/*
  capture a collection easily
  -attach data-testid attributes all over the palce
  -wrapper.getAllByTestId
*/

const quotes = [
  { id: "1", text: "something" },
  { id: "2", text: "something" },
  { id: "3", text: "something" },
];

describe("Quotes", () => {
  it("It returns a sad message array if empty", () => {
    const wrap = rt.render(<Quotes quotes={[]} />);
    expect(wrap.getByText(/sad/i));
  });
  it("It returns a sad message if no array prop", () => {
    const wrap = rt.render(<Quotes />);
    expect(wrap.getByText(/sad/i));
  });
  it("Puts to the dom the right number of quotes", () => {
    const wrap = rt.render(<Quotes quotes={quotes} />);
    const quotesArray = wrap.getAllByTestId("quote");
    expect(quotesArray).toHaveLength(quotes.length);
  });
});
