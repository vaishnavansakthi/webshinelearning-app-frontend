import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { AdminDashboard, Dashboard, NotFound } from "./pages";
import { Layout } from "./components/templates"; 
import { decryptData } from "./utils/security";
import { routes } from "./common/routes";
import LoaderProvider from "./context/LoaderProvider";
import { Loader } from "./components/atoms";

function App() {
  const myToken = decryptData("userData", "object");
  console.log(myToken);

  return (
    <Router>
      <LoaderProvider>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  myToken && myToken.user && myToken.user.role === "admin" ? (
                    <AdminDashboard />
                  ) : myToken ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
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
                  );
                  return <Route key={index} path={route.path} element={element} />;
                })}
              <Route
                path="*"
                element={
                  myToken !== null ? (
                    <NotFound />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </LoaderProvider>
    </Router>
  );
}

export default App;
