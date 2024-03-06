import { useEffect, useState } from "react";
import "./index.css";
import { FiCoffee, FiX } from "react-icons/fi";
import Onboarding from "./views/Onboarding";
import Projects from "./views/Projects";
import Services from "./views/Services";
import Files from "./views/Files";
import MenuItem from "./components/MenuItem";
function App() {
  useEffect(() => {
    async function serverStatus() {
      try {
        const response = await fetch("http://localhost:8282");
        const status = await response.json();
        status.server && setServer(true);
      } catch (error: any) {
        setMessage({ status: "error", msg: `Server error:${error?.message}` });
      }
    }
    serverStatus();
  }, []);

  const [view, setView] = useState("onboarding");
  const [server, setServer] = useState(false);
  const [message, setMessage] = useState({ status: "error", msg: "" });
  return (
    <div className="w-[780px] min-h-[590px] bg-neutral-800 text-neutral-300 pr-2 flex flex-col">
      <div className="flex items-stretch text-md bg-neutral-700 gap-px pb-px">
        <div
          className={`${
            server ? "bg-lime-900" : "bg-red-900"
          } p-3 grid items-center`}
        >
          <FiCoffee />
        </div>
        <div className="bg-neutral-900 p-3 flex-1 h-full">
          GPT SAAS Director
        </div>
        <MenuItem
          label={"Onboarding"}
          value={"onboarding"}
          view={[view, setView]}
        />
        <MenuItem
          label={"Projects"}
          value={"projects"}
          view={[view, setView]}
        />
        <MenuItem
          label={"Services"}
          value={"services"}
          view={[view, setView]}
        />
        <MenuItem label={"Files"} value={"files"} view={[view, setView]} />
      </div>
      {message.msg && (
        <div
          className={`p-2 flex ${
            message.status === "error" ? "bg-red-800" : ""
          }`}
        >
          <div className="flex-1">{message.msg}</div>
          <div
            className="p-2"
            onClick={() => setMessage({ status: "success", msg: "" })}
          >
            <FiX />
          </div>
        </div>
      )}
      {view === "onboarding" && <Onboarding />}
      {view === "projects" && <Projects />}
      {view === "services" && <Services />}
      {view === "files" && <Files />}
    </div>
  );
}

export default App;
