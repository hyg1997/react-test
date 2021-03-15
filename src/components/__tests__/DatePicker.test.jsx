import React from "react";
import { shallow, configure } from "enzyme";
import { DatePicker } from "../form";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("DatePicker", () => {
  it("Renders correctly", () => {
    const wrapper = shallow(<DatePicker label="Date" required />);
    expect(wrapper).toMatchSnapshot();
  });
});
