interface ButtonProps {
  text: string;
  onClick: () => void;
}
export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
