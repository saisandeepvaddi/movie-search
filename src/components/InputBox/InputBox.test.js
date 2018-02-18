import React from "react";
import InputBox from "./index";
import Main from "../Main";
import { shallow } from "enzyme";
import * as api from "../../api";

const simulateChangeOnInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: {
      value: newValue
    }
  });
  return wrapper.find(inputSelector);
};

describe("InputBox", () => {
  beforeEach(() => jest.resetAllMocks());

  it("should call onInputChange upon input", () => {
    const onChangeMock = jest.fn();
    const inputBoxWrapper = shallow(<InputBox onInputChange={onChangeMock} />);

    const movieInput = simulateChangeOnInput(
      inputBoxWrapper,
      ".movie-input",
      "titanic"
    );
    expect(onChangeMock).toHaveBeenCalledWith("titanic");
  });
});
