import { BrowserRouter, Routes, Route } from "react-router";
import PreviewPage from "./pages/PreviewPage.jsx";



function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<PreviewPage videoPath={"moving-centroid.mp4"} />} />
          <Route path="failure" element={<PreviewPage videoPath={"null"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
