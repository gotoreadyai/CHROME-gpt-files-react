import { useEffect, useState } from "react";
import OnboardCard from "../components/OnboardCard";
import { scenario } from "../scanario";
import Title from "../components/Title";
import DynamicForm from "../dynamicForms/DynamicForm";

function Onboarding() {
  const [projectName, setProjectName] = useState("");
  const [projectCRUD, setProjectCRUD] = useState("");

  useEffect(() => {
    // @ts-ignore TS2304
    chrome.storage.sync.get("input_project_name").then((items: any) => {
      setProjectName(items.input_project_name);
    });
    // @ts-ignore TS2304
    chrome.storage.sync.get("input_project_CRUD").then((items: any) => {
      setProjectCRUD(items.input_project_CRUD);
    });
  });

  return (
    <div className="flex flex-col gap-px bg-neutral-700">
      <div className="flex items-stretch">
        <Title
          title={"Onboarding"}
          description={"Scenario A (copy idea to your GPT)"}
        />
        <div className="flex bg-neutral-800 gap-px h-full items-center">
          <div className="bg-lime-900 px-2 py-1 rounded hover:bg-lime-800">
            A
          </div>
          <div className="bg-lime-900 px-2 py-1 rounded hover:bg-lime-800">
            B
          </div>
          <div className="bg-lime-900 px-2 py-1 rounded hover:bg-lime-800">
            C
          </div>
        </div>
      </div>

      {scenario.mainOnboarding.map((el, i) => (
        <OnboardCard prompt={el} index={i} />
      ))}

      <Title
        title={"Copy CRUD specification"}
        description={"create new project"}
      />
      {/* <div className="bg-neutral-800 p-2 flex flex-col gap-2">
        <input
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
            //@ts-ignore
            chrome.storage.sync.set({ input_project_name: e.target.value });
          }}
          placeholder="Project name"
          className="text-neutral-300 p-2 block w-full bg-neutral-800 border border-neutral-700"
        ></input>
        <textarea
          placeholder="CRUD description (prefer in MARKDOWN)"
          value={projectCRUD}
          onChange={(e) => {
            setProjectCRUD(e.target.value);
            //@ts-ignore
            chrome.storage.sync.set({ input_project_CRUD: e.target.value });
          }}
          rows={8}
          className="p-2 block w-full bg-neutral-800 border border-neutral-700"
        ></textarea>
        <button
          onClick={() => {
            async function setProject() {
              const response = await fetch(
                "http://localhost:8282/create-project",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    projectName: projectName,
                    projectCrud: projectCRUD,
                  }),
                }
              );
              const project = await response.json();
              setProjectName("");
              //@ts-ignoreign
              chrome.storage.sync.set({ input_project_name: "" });
              setProjectCRUD("");
              //@ts-ignoreign
              chrome.storage.sync.set({ input_project_CRUD: "" });
            }
            setProject();
          }}
          className="bg-lime-900 p-4 rounded hover:bg-lime-800 sticky bottom-0"
        >
          Create new projrct
        </button>
      </div> */}

      <DynamicForm
        setDefault={{ projectName: "aaa" }}
        onProcess={(data: any) => {
          console.log(data);
        }}
      />

      <div className="flex-1 bg-neutral-800 p-2 "></div>
    </div>
  );
}
export default Onboarding;
