import { useEffect, useState } from "react";
import Project from "./Project";
import Title from "../components/Title";

function Projects() {
  useEffect(() => {
    async function logProjects() {
      const response = await fetch("http://localhost:8282/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const projects = await response.json();
      setProjectsList(projects.projects);
    }
    logProjects();
    //@ts-ignore
    chrome.storage.sync.get("current_project_name").then((items: any) => {
      setCurrentProjectName(items.current_project_name);
    });
  }, []);
  const [projectsList, setProjectsList] = useState([]);
  const [currentProjectName, setCurrentProjectName] = useState("");
  return (
    <div className="flex gap-px bg-neutral-700 items-stretch flex-1">
      <div className="flex flex-col gap-px w-1/4">
        <div>
          <Title title="Projects" description="choose one of" />
        </div>
        {projectsList.map((el, i) => (
          <div
            onClick={() => {
              setCurrentProjectName(el);
              //@ts-ignore
              chrome.storage.sync.set({ current_project_name: el });
            }}
            className={`${
              currentProjectName === el
                ? "bg-lime-900"
                : "bg-neutral-800 hover:bg-neutral-900"
            } p-2 px-4  cursor-pointer`}
            key={i}
          >
            {el}
          </div>
        ))}
        <div className="flex-1 bg-neutral-800"></div>
      </div>
      <Project currentProjectName={currentProjectName} />
    </div>
  );
}

export default Projects;
