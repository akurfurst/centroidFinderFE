import { BrowserRouter, Routes, Route } from "react-router";
import PreviewPage from "./pages/PreviewPage.jsx";
import Videos from "./pages/Videos.jsx";



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="videos/:videoPath" element={<PreviewPage />} />
          <Route path="videos" element={<Videos />} />
          <Route path="failure" element={<PreviewPage videoPath={"null"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
