import { useOnlineStatus } from "../custom-hooks/useOnlineStatus";

const NetworkStatus = () => {
  const isOnline = useOnlineStatus();

  return <div>{isOnline ? "✅ Online" : "❌ Disconnected"}</div>;
};

export default NetworkStatus;
