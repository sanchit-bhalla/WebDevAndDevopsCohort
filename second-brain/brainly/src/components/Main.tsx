import { useEffect } from "react";
import useBrain from "../hooks/useBrain";
import EmptyFilesIcon from "../icons/EmptyFilesIcon";
import ExclamationIcon from "../icons/ExclamationIcon";
import ContentCard from "./ContentCard";

function Main() {
  const { loading, error, brain, refetchBrain } = useBrain();
  const username = brain?.[0]?.user?.username;

  useEffect(() => {
    refetchBrain();
  }, []);

  return (
    <main className="bg-white rounded-l-lg p-4">
      {loading ? (
        <div className="h-8 w-40 bg-slate-200 animate-pulse mb-4"></div>
      ) : (
        <h2 className="text-2xl text-gradient font-semibold mb-4">
          {`${username}'s Brain`}
        </h2>
      )}
      {loading && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {Array.from({ length: 8 }).map((_, ind) => (
            <div
              key={ind}
              className="bg-slate-200 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      )}
      {(error || brain.length === 0) && (
        <div className="flex-col justify-center items-center text-center">
          <div className="flex justify-center mt-14 mb-6">
            {error ? (
              <ExclamationIcon width={100} height={100} color="#0061c4" />
            ) : (
              <EmptyFilesIcon width={155} height={150} />
            )}
          </div>
          <h2 className="ml-4 text-2xl text-gradient  font-sans tracking-tight">
            {error ? error : "No Data Found !"}
          </h2>
        </div>
      )}
      {!loading && !error && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {brain.map((content) => (
            <ContentCard key={content._id} content={content} />
          ))}
        </div>
      )}
      {/* <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/wLGrhL8V038"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe> */}
    </main>
  );
}

export default Main;
