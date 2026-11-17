import { BrowserRouter, Routes, Route } from "react-router";
import PreviewPage from "./pages/PreviewPage.jsx";
//import toBinaryImage from './BinaryImage/toBinaryImage'

function App() {
  //toBinaryImage("moving-centroid.mp4", 0xFDA301, 162);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<PreviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
