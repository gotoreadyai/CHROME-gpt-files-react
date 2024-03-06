import { useEffect, useState } from "react";
import Title from "../components/Title";
import { scenario } from "../scanario";
import { FiChevronLeft, FiFile } from "react-icons/fi";
import DynamicForm from "../dynamicForms/DynamicForm";

function Project({ currentProjectName }: any) {
  useEffect(() => {
    console.log("change", currentProjectName);
  }, [currentProjectName]);
  const [selectedFile, setSelectedFile] = useState("");
  return (
    <div className="flex-1 flex flex-col gap-px">
      <>
        {selectedFile ? (
          <>
            <div className="flex gap-px">
              <div className="grid items-center text-xl p-4 bg-neutral-800">
                <FiChevronLeft />
              </div>
              <Title title={selectedFile} description="Selected file:" />
            </div>

            {/* <div className="bg-neutral-800 p-2 flex flex-col gap-2">
              <textarea
                placeholder="CRUD description (prefer in MARKDOWN)"
                rows={18}
                className="p-2 block w-full bg-neutral-800 border border-neutral-700"
              ></textarea>
              <button
                onClick={() => {}}
                className="bg-lime-900 p-4 rounded hover:bg-lime-800 sticky bottom-0"
              >
                Create new projrct
              </button>
            </div> */}
            <DynamicForm
              onProcess={(data: any) => {
                console.log(data);
              }}
            />
          </>
        ) : (
          <>
            <div>
              <Title
                title={currentProjectName}
                description="Current project:"
              />
            </div>
            {scenario.project.map((el, i) => (
              <div
                onClick={() => {
                  setSelectedFile(el.file);
                }}
                className="bg-neutral-800 cursor-pointer p-4 flex flex-col gap-1 hover:bg-neutral-900"
              >
                <div className="text-sm font-bold flex gap-1 items-center">
                  <span>
                    <FiFile />
                  </span>
                  <h2>{el.file}</h2>
                </div>
                <p>{el.description}</p>
              </div>
            ))}
          </>
        )}
      </>

      <div className="flex-1 bg-neutral-800"></div>
    </div>
  );
}

export default Project;
