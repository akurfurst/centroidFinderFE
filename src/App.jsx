import { BrowserRouter, Routes, Route } from "react-router";
import PreviewPage from "./pages/PreviewPage.jsx";

function App() {

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
