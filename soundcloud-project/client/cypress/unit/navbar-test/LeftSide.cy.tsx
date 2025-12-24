import { testNavbarButtons } from "./testButtonsHelper";
import { RightNavbarButtons } from "../../../src/components/navbar/navbar-components/navbar-buttons/RightNavbarButtons";

describe("Navbar rendered", () => {


    it("Navbar right side of buttons in navbar exsits ", () => {
      testNavbarButtons(RightNavbarButtons);
  
    });
});
