import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Bests } from "./routes/Bests";
import { Projects } from "./routes/Projects";
import { Pictures } from "./routes/Pictures";
import { ProjectPage } from "./routes/ProjectPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path=":productId" element={<ProjectPage />} />
          <Route path="bests" element={<Bests />} />
          <Route path="pictures" element={<Pictures />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
