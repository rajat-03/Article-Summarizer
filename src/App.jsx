import "./App.css";
import Demo2 from "./components/Demo2";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className="app">
        <Hero />
        <Demo2 />
      </div>
    </main>
  );
};

export default App;
