import "./styles/Header.css";
import { FiExternalLink } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="header-main flex flex-wrap justify-evenly">
        <div
        // style={{ border: "1px solid red" }}
        >
          <img src="/assets/mconnekt.png" alt="" className="header-logo mt-3" />
        </div>
        <div
          className="flex flex-wrap justify-evenly sm:space-x-10 xs:space-x-10 md:space-x-10 lg:space-x-10 my-6"
          //   style={{ border: "1px solid skyblue" }}
        >
          <a className="header-link" href="/">
            Home
          </a>
          <a className="header-link" href="/">
            Events
          </a>
          <a className="header-link" href="/">
            Jobs
          </a>
          <a className="header-link" href="/">
            Explore Opportunities
          </a>
          <a href="/" className="header-link">
            Journomed
            <FiExternalLink style={{ marginLeft: "5px" }} />
          </a>
        </div>
        <div
          className="mt-5 flex space-x-3 "
          //   style={{ border: "1px solid yellow" }}
        >
          <div className="mt-3">
            <img src="/assets/bell.png" alt="" className="header-img" />
          </div>
          <div className="text-white headerSession pl-2">
            <p>Logged in as</p>
            <p>{user && user.email}</p>
          </div>
          <div className="">
            <RiArrowDropDownLine
              style={{ fontSize: "3em", color: "#DB716D" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
