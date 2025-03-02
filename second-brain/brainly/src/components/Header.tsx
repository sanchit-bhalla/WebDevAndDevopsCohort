import { useState } from "react";
import BrainIcon from "../icons/BrainIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import UserIcon from "../icons/UserIcon";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const { user, isAuthenticated } = useAuth();

  const toggleUserDetails = () => {
    setShowUserDetails((prevState) => !prevState);
  };
  return (
    <nav className=" row-span-1 col-span-full p-4">
      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-1">
          <BrainIcon width={40} height={40} />
          <h2 className="text-2xl font-bold text-purple-600 font-sans">
            Brainly
          </h2>
        </div>
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-4">
              <Button
                title="Share Brain"
                size="md"
                variant="secondary"
                startIcon={<ShareIcon size="md" />}
              />
              <Button
                title="Add Content"
                size="md"
                variant="primary"
                startIcon={<PlusIcon size="md" />}
              />

              <button
                onClick={toggleUserDetails}
                className="rounded-full p-2 bg-purple-300 text-purple-600 cursor-pointer hover:bg-[#e0deff] "
              >
                <UserIcon size="lg" />
              </button>
            </div>
            {showUserDetails && (
              <div className="absolute  right-0 top-14 bg-white px-4 py-2 rounded-md min-w-[150px]">
                <div className=" py-2 border-b border-b-slate-200">
                  Welcome {user?.username || "Guest"} !
                </div>
                <div className="py-2 text-purple-600">Logout</div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Header;
