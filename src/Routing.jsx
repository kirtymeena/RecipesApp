import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import CategoryList from "./pages/CategoryList"


function Routing() {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/:category/list" element={<CategoryList />} />
        </Route>
      </Routes>
    </Router>


  )
}

export default Routing
