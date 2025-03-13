import { useAuth } from "../hooks/useAuth";
import Logo from "./Logo";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className=" row-span-1 col-span-full p-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center relative">
        <Logo />
        {isAuthenticated ? <HeaderActions /> : null}
      </div>
    </nav>
  );
};

export default Header;
