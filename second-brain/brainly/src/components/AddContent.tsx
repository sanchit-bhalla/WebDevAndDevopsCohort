import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { extractEmbeddId } from "../utils/utilities";
import useAxios from "../hooks/useAxios";
import useBrain from "../hooks/useBrain";
import { BACKEND_HOST } from "../constants";
import { useNotification } from "../hooks/useNotification";

const AddContent: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { addNotification } = useNotification();
  const axios = useAxios();
  const { refetchBrain } = useBrain();
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const addContent = async () => {
    const { title, link, type } = formData;
    let embeddUrl;
    if (type === "youtube") {
      const embeddId = extractEmbeddId(link);

      if (!embeddId) {
        setFormData((prev) => ({ ...prev, link: "" }));
        setErrMsg("Please provide correct Youtube url");
        return;
      }
      embeddUrl = `https://www.youtube.com/embed/${embeddId}`;
    } else if (type === "tweet") {
      if (link?.startsWith("https://x.com/")) embeddUrl = link;
      else {
        setFormData((prev) => ({ ...prev, link: "" }));
        setErrMsg("Please provide correct twitter post url");
        return;
      }
    }

    try {
      setLoading(true);

      await axios({
        url: `${BACKEND_HOST}/api/v1/content`,
        method: "POST",
        data: {
          link: embeddUrl,
          type,
          title,
          tags: [],
        },
        withCredentials: true,
      });

      addNotification("Content Added successfully.", 2000, 300, "success");

      refetchBrain();

      closeModal();
    } catch (err) {
      console.log(err);
      addNotification("Content Not Added.", 2000, 300, "fail");
      setErrMsg("Some error occured while adding new content!");
    }
  };
  const handleClear = () => {
    setFormData({
      title: "",
      link: "",
      type: "",
    });
    setErrMsg("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { title, link, type } = formData;
  const isAddButtonDisabled =
    title.trim()?.length === 0 ||
    link.trim()?.length === 0 ||
    type.trim().length === 0;
  return (
    <div>
      <h2 className="text-xl mb-4">Add Content</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => handleChange(e, "link")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => handleChange(e, "type")}
            className="block w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
          >
            <option value="">Select Type</option>
            <option value="youtube">YouTube</option>
            <option value="tweet">Tweet</option>
          </select>
        </div>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <div className="mt-4 flex gap-4">
          <Button
            title="Add"
            size="md"
            variant="primary"
            loading={!errMsg && loading}
            disabled={isAddButtonDisabled}
            onClick={addContent}
          />
          <Button
            title="Clear"
            size="md"
            variant="secondary"
            onClick={handleClear}
          />
        </div>
      </form>
    </div>
  );
};

export default AddContent;
