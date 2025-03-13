import BrainIcon from "../icons/BrainIcon";

function Logo() {
  return (
    <div className="flex items-center gap-1  ">
      <BrainIcon width={40} height={40} />

      <h2 className="text-4xl text-gradient font-semibold font-sans tracking-tight -mt-1.5">
        Brainly
      </h2>
    </div>
  );
}

export default Logo;
