import "./header.css";
import { useState } from "react";
import HeaderLeft from "./headerLeft";
import Navbar from "./navbar";
import HeaderRight from "./headerRight";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  let location = useLocation().pathname;

  return (
    <header
      className={
        "absolute top-0 left-0 h-20 py-0 w-full flex z-[99] border-b shadow-sm border-white" +
        (location !== "/" ? " bg-gradient-to-r from-[#380036] to-[#0CBABA] backdrop-blur-[120px]" : ' bg-transparent')
      }
    >
      <div className="container mx-auto flex items-center justify-between h-full px-[30px] ">
        <HeaderLeft toggle={toggle} setToggle={setToggle} />
        <Navbar location={location} toggle={toggle} setToggle={setToggle} />
        <HeaderRight />
      </div>
    </header>
  );
};

export default Header;
