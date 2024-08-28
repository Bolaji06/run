import "./App.css";
import CSSEditor from "./components/CssEditor";
import HTMLEditor from "./components/HtmlEditor";
import JavaScriptEditor from "./components/JavaScriptEditor";

function App() {
  return (
    <>
      <section className="">
        <div className="grid grid-cols-3">
          <div className="">
            <button className="py-2 px-6 bg-gray-900 text-pink-700 text-sm">
              HTML
            </button>
            <HTMLEditor />
          </div>

          <div className="">
            <button className="py-2 px-6 bg-gray-900 text-blue-500 text-sm">CSS</button>
            <CSSEditor />
          </div>

          <div className="">
            <button className="py-2 px-6 bg-gray-900 text-yellow-400 text-sm">
              JS
            </button>
            <JavaScriptEditor />
          </div>
        </div>

        <div className="w-full bg-slate-200 h-28 overflow-y-auto"></div>
      </section>
    </>
  );
}

export default App;
