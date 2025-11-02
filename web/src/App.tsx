import { Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { DefaultLayout } from "./layouts/DefaultLayout"
import { ExamplePage } from "./pages/ExamplePage"

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/example-page" element={<ExamplePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
