import withProtectedRoute from "../../hoc/ProductedRoute"



const AdminDashboard = () => {
  return (
    <>
      <h1 className="dark:text-white text-center text-3xl">Admin Dashboard</h1>
    </>
  )
}

export default withProtectedRoute(AdminDashboard)
