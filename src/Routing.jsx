import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import CategoryList from "./pages/CategoryList"
import Footer from "./components/Footer"
import Meal from "./pages/Meal"
import Auth from "./auth/Auth"
import { useSelector } from "react-redux"
import { useEffect } from "react"


function Routing() {

  const showForm = useSelector(state => {
    if (state.auth !== undefined)
      return state.auth.showAuthForm
  })


  useEffect(() => {
    console.log("form", showForm)
  })
  const Layout = () => {
    return (
      <div className="layout">
        <Navbar />
        <div className={`${showForm ? "overlay-active" : ""}`}>
          {
            showForm &&
            <Auth />
          }
          <Outlet />
        </div>
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
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>


  )
}

export default Routing
