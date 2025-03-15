import { useEffect, useState } from "react";
import ShareBrain from "./ShareBrain";
import Button from "./Button";
import { PlusIcon } from "../icons/PlusIcon";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";
import AddContent from "./AddContent";
import UserIcon from "../icons/UserIcon";
import UserDetails from "./UserDetails";
import { HeaderProps } from "../../types/types";

interface Status {
  data: {
    isPublished: boolean;
  };
  message: string;
  statusCode: number;
}

function HeaderActions({ loggedInUserHeader }: HeaderProps) {
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [published, setPublished] = useState(false);

  const { loading, error, data } = useFetch<Status>({
    url: "api/v1/brain/status",
  });
  const isPublished = data?.data?.isPublished;

  const closeModal = () => setShowModal(false);

  const toggleUserDetails = () => {
    setShowUserDetails((prevState) => !prevState);
  };

  // For the first time / Intially when user opens the homepage
  useEffect(() => {
    if (typeof isPublished === "boolean") setPublished(isPublished);
  }, [isPublished]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {loggedInUserHeader && (
          <>
            {loading ? (
              <div className="h-10 w-40 bg-slate-200 animate-pulse"></div>
            ) : !error ? (
              <ShareBrain published={published} setPublished={setPublished} />
            ) : null}
            <Button
              title="Add Content"
              size="md"
              variant="primary"
              startIcon={<PlusIcon size="md" />}
              onClick={() => setShowModal(true)}
            />
          </>
        )}

        <button
          onClick={toggleUserDetails}
          className="rounded-full p-2 bg-purple-300 text-purple-600 cursor-pointer hover:bg-[#e0deff] "
        >
          <UserIcon size="lg" />
        </button>
      </div>
      {showUserDetails && (
        <UserDetails published={published} setPublished={setPublished} />
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <AddContent closeModal={closeModal} />
      </Modal>
    </>
  );
}

export default HeaderActions;
