import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AdminDashboard, Dashboard, NotFound } from "./pages"
import { Layout } from "./components/templates"
import { decryptData } from "./utils/security"
import { routes } from "./common/routes"
import LoaderProvider from "./context/LoaderProvider"

function App() {
  const myToken = decryptData("userData", "object")
  console.log(myToken)

  return (
    <Router>
      <LoaderProvider>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={myToken?.user?.role === "admin" ? <AdminDashboard /> : <Dashboard />} />
            {routes &&
              routes.map((route, index) => {
                const element = route.navigate ? (
                  myToken !== null && !route.private ? (
                    <Navigate to={`${route.navigate}`} />
                  ) : (
                    <route.component />
                  )
                ) : (
                  <route.component />
                )
                return <Route key={index} path={route.path} element={element} />
              })}
            <Route path="*" element={myToken !== null ? <NotFound /> : <Navigate to={"/"} />} />
          </Routes>
        </Layout>
      </LoaderProvider>
    </Router>
  )
}

export default App
