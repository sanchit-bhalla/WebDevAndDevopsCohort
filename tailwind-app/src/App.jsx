import { useState } from "react";
// import { CalendarSearch } from "lucide-react";

function App() {
  const [birthdate, setBirthdate] = useState("");
  return (
    <div className="h-screen bg-blue-900 text-white flex  flex-col items-center py-32 gap-10">
      <div className="flex text-2xl font-bold items-center">
        {/* <CalendarSearch color="cyan" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calendar-search stroke-cyan-300 fill-none"
        >
          <path d="M16 2v4" />
          <path d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25" />
          <path d="m22 22-1.875-1.875" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <circle cx="18" cy="18" r="3" />
        </svg>
        <span className="ml-1 text-cyan-300">Webinar</span>.gg
      </div>

      <h2 className="font-bold text-2xl">Verify Your age</h2>

      <div className="flex flex-col items-center">
        <p className="text-sm text-slate-300 mb-1">
          Please confirm your birth year. Data will not be saved
        </p>

        <input
          type="text"
          className="bg-slate-300 p-2 rounded-lg min-w-56 text-slate-900 outline-none"
          placeholder="Your birth year"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <button
          className={`my-6 ${
            birthdate ? "bg-cyan-300 text-white" : "bg-[#b0adad] text-slate-500"
          }  p-2 rounded-lg min-w-56 `}
          onClick={() => {
            setBirthdate("");
          }}
          disabled={birthdate.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;
