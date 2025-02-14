import { Link, useLocation } from "react-router-dom";
import { Logo } from "../assets";
import { navLinks } from "../data/navigation";
import Icon from "./Icon";

const Navbar = () => {
  const { pathname } = useLocation();

  const getLinkClass = (isActive: boolean) => {
    const baseClasses =
      "text-[15px] md:text-[18px] transition-colors duration-300";
    const activeClass = isActive ? "text-white" : "text-grey hover:text-white";

    return `${baseClasses} ${activeClass}`;
  };

  return (
    <header className="border-primary-border font-jeju chromebook:w-[calc(100vw-150px)] fixed top-2.5 left-[50%] z-20 flex h-[121px] w-[calc(100vw-55px)] translate-x-[-50%] flex-col items-center justify-between rounded-3xl border bg-[#05252C66] px-4 py-3 backdrop-blur-xs md:top-6 md:h-[78px] md:flex-row xl:w-[1200px]">
      <div className="flex h-full w-full items-center justify-between">
        <Link to="/">
          <img className="h-9 w-[92px] object-contain" src={Logo} alt="logo" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={getLinkClass(isActive)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button className="header-btn group uppercase">
          My Tickets{" "}
          <Icon
            icon="right-arrow"
            size={16}
            className="ml-2 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-45"
          />{" "}
        </button>
      </div>
      <nav className="mt-5 flex flex-wrap items-center gap-8 md:hidden">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={getLinkClass(isActive)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
