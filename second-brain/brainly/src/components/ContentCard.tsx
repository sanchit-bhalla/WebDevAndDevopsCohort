import React, { useState } from "react";
import { BrainContent } from "../../types/types";
import Button from "./Button";
import YoutubeIcon from "../icons/YoutubeIcon";
import TwitterIcon from "../icons/TwitterIcon";
import { ShareIcon } from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { formatDate } from "../utils/utilities";
import Modal from "./Modal";
import DeleteContent from "./DeleteContent";

interface ContentCardProps {
  content: BrainContent;
}

const IconColor = "oklch(0.446 0.043 257.281)";

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const creationDate = formatDate(content.createdAt);
  const renderIcon = () => {
    if (content.type === "youtube")
      return <YoutubeIcon width={30} height={30} color={IconColor} />;
    else if (content.type === "tweet")
      return <TwitterIcon width={30} height={30} color={IconColor} />;
    else return null;
  };

  const renderContent = () => {
    if (content.type === "youtube") {
      return (
        <iframe
          width="100%"
          //   height="315"
          src={content.link}
          title={content.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          //   className="w-full h-64 md:h-80"
          className="w-full"
        ></iframe>
      );
    } else if (content.type === "tweet") {
      return (
        <blockquote className="twitter-tweet">
          <a href={content.link}></a>
        </blockquote>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="bg-whites rounded-lg p-4 mb-4 border border-slate-200">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span>{renderIcon()}</span>
          <h3 className="text-xl font-semibold">{content.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <ShareIcon size="md" color={IconColor} />
          </div>
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <DeleteIcon width={20} height={20} color={IconColor} />
          </div>
        </div>
      </div>
      {renderContent()}
      {content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {content.tags.map((tag) => (
            <Button
              key={tag}
              title={`# ${tag}`}
              size="sm"
              variant="secondary"
            />
          ))}
        </div>
      )}
      <p className="text-md  mt-4">
        Added on <span className="text-slate-600">{creationDate}</span>
      </p>

      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <DeleteContent content={content} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default ContentCard;
