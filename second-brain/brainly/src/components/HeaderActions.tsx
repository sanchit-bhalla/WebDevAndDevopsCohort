import { useState } from "react";
import ShareBrain from "./ShareBrain";
import Button from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";
import AddContent from "./AddContent";
import UserIcon from "../icons/UserIcon";

function HeaderActions() {
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();
  const { loading, error, data } = useFetch<{ isPublished: boolean }>({
    url: "api/v1/brain/status",
  });

  const closeModal = () => setShowModal(false);

  const toggleUserDetails = () => {
    setShowUserDetails((prevState) => !prevState);
  };
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {loading ? (
          <div className="h-10 w-40 bg-slate-200 animate-pulse"></div>
        ) : !error ? (
          <ShareBrain />
        ) : null}
        <Button
          title="Add Content"
          size="md"
          variant="primary"
          startIcon={<PlusIcon size="md" />}
          onClick={() => setShowModal(true)}
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
          {data?.isPublished && (
            <div className="py-2 cursor-pointer border-b border-b-slate-200">
              Unpublish Brain
            </div>
          )}
          <div className="py-2 text-purple-600 cursor-pointer" onClick={logout}>
            Logout
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <AddContent closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default HeaderActions;
