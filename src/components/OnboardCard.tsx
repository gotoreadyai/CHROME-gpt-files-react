import { FiCopy } from "react-icons/fi";

function OnboardCard({ prompt, index }: any) {
  return (
    <div className="flex gap-px items-stretch">
      <div className="text-md bg-neutral-800 grid items-center px-6 leading-loose">
        {index}
      </div>
      <div className="text-neutral-400 font-mono flex-1 bg-neutral-800 p-4 text-sm">{prompt}</div>
      <div className="bg-neutral-800 text-sm grid items-center px-6">
        <FiCopy />
      </div>
    </div>
  );
}

export default OnboardCard;
