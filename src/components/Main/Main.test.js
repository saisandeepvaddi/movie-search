import React from "react";
import Main from "./index";
import InputBox from "../InputBox";
import { shallow } from "enzyme";
// import renderer from "react-test-renderer";
import * as api from "../../api";

const nextTick = async () =>
  new Promise(resolve => {
    setTimeout(resolve, 0);
  });

describe("Main Component", () => {
  beforeEach(() => jest.resetAllMocks());
  it("change in inputbox should call api here", async () => {
    jest.spyOn(api, "getMovieDetails").mockImplementation(() => {
      return Promise.resolve("movies");
    });
    const inputMock = jest.fn();
    const wrapper = shallow(<Main />);
    expect(wrapper.find(InputBox)).toHaveLength(1);

    wrapper.onInputChange = inputMock;
    const input = shallow(<InputBox onInputChange={inputMock} />);
    input.find(".movie-input").simulate("change", {
      target: {
        value: "avatar"
      }
    });

    expect(wrapper.onInputChange).toHaveBeenCalledWith("avatar");
    await expect(api.getMovieDetails("dummy")).resolves.toBe("movies");
  });
});
