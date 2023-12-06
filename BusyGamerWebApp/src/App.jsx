import Header from "./Components/Header";
import Latest from "./Components/Latest";

function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-full items-center bg-app-main text-white font-sans">
      <Header />
      <Latest />
    </div>
  );
}

export default App;