import React from "react";
import * as rtl from "react-testing-library";

import Container from "./Container";

afterEach(rtl.cleanup);

// const quotes = [
//   { id: "1", text: "something" },
//   { id: "2", text: "something" },
//   { id: "3", text: "something" },
// ];

jest.mock("axios", () => {
  return {
    get: () => {
      return Promise.resolve({
        data: [
          { id: "1", text: "something" },
          { id: "2", text: "something2" },
          { id: "3", text: "something3" },
        ],
      });
    },
  };
});

// 1- we need stuff from the library but the wrapper as well
// 2- remember about cleaning up after each test
// 3- prefer requalr expressions to raw text
// 4- wrapper exposes diffrent methods that look alike!
//  - get will crash and burn fast if no match is found
//  - query will return false null if no match
// -find will wait and only fail after 5s (works with async await)
describe("Container", () => {
  // actual tests
  it('outputs "Hello, World!"', () => {
    const wrapper = rtl.render(<Container />);
    // console.log(wrapper.debug());
    expect(wrapper.getByText(/world/i));
  });
  it('Does not output "loading...', () => {
    const wrapper = rtl.render(<Container />);
    // console.log(wrapper.debug());
    expect(wrapper.queryByText(/loading/i)).toBeFalsy();
  });
  it("Renders quotes tests", async () => {
    const wrapper = rtl.render(<Container />);
    expect(wrapper.queryByText(/something/i)).toBeFalsy();
    rtl.fireEvent.click(wrapper.getByText(/get those/i));
    await wrapper.findByText(/something/i);
    expect(wrapper.getByText(/something/i));
    expect(wrapper.getByText(/something2/i));
    expect(wrapper.getByText(/something3/i));
  });
});
