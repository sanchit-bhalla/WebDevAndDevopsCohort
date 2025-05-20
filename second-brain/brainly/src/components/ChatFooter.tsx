import Button from "./Button";
import SendIcon from "../icons/SendIcon";

interface ChatFooterProps {
  handleAskQuery: () => Promise<void>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}
const ChatFooter: React.FC<ChatFooterProps> = ({
  loading,
  query,
  setQuery,
  handleAskQuery,
}) => {
  return (
    <div className="fixed bottom-0 w-full pt-4 pb-8 bg-slate-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center gap-4 ">
        <div className="relative group flex-grow w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#8ec5fc] to-[#e0c3fc] rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <textarea
            rows={1}
            className="relative resize-none p-4 w-full bg-white  rounded-2xl shadow-2xl h-auto focus:outline-none focus:border-purple-600"
            placeholder="Query Brain"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* <span
              role="textbox"
              className="inline-block relative p-4 w-full bg-white  rounded-2xl shadow-2xl h-auto"
              contentEditable
            ></span> */}
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            title="Send"
            size="md"
            startIcon={loading ? null : <SendIcon />}
            onClick={handleAskQuery}
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
