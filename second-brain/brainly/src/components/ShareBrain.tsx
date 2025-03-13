import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import Button from "./Button";
import useAxios from "../hooks/useAxios";
import { copyToClipboard } from "../utils/utilities";
import { useNotification } from "../hooks/useNotification";
import { BACKEND_HOST } from "../constants";

function ShareBrain() {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const axios = useAxios();
  const { addNotification } = useNotification();

  const getSharableLink = async () => {
    if (link) {
      copyToClipboard(link);
      addNotification("Link Copied to clipboad", 2000, 300, "success");
      return;
    }

    try {
      setLoading(true);

      const response = await axios({
        url: `${BACKEND_HOST}/api/v1/brain/share`,
        method: "POST",
        data: {
          share: true,
        },
        withCredentials: true, // Ensure credentials are sent with the request
      });

      const newLink = `http://localhost:5173/user/${response?.data?.data?.hash}`;
      setLink(newLink);
      copyToClipboard(newLink);
      addNotification("Link Copied to clipboad", 2000, 300, "success");
    } catch (err) {
      console.log(err);
      addNotification("Link Not Copied", 2000, 300, "fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      title="Share Brain"
      size="md"
      variant="secondary"
      startIcon={!loading ? <ShareIcon size="md" /> : null}
      loading={loading}
      onClick={getSharableLink}
    />
  );
}

export default ShareBrain;
