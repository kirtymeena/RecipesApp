import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import CategoryList from "./pages/CategoryList"
import Footer from "./components/Footer"
import Meal from "./pages/Meal"

function Routing() {
  const Layout = () => {
    return (
      <div className="layout">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/:category/list" element={<CategoryList />} />
          <Route path="/:category/:meal/:id" element={<Meal />} />
        </Route>
      </Routes>
    </Router>


  )
}

export default Routing
