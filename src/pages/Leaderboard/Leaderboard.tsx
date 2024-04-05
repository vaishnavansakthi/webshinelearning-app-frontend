import { useEffect, useState } from "react"
import Table from "../../components/moleclues/Table/Table"
import withProtectedRoute from "../../hoc/ProductedRoute"
import { getAllLeaerboardData } from "../../services/userLeaderboard.services"

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any>([])

  const leaderboardColumns = [
    { label: "Username", field: "user" },
    { label: "Suggestion", field: "suggestion" },
    { label: "Points", field: "points" },
  ]

  useEffect(() => {
    getAllLeaerboardData()
      .then((res: any) => {
        setLeaderboardData(res)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className="mt-10">
        <Table columns={leaderboardColumns} data={leaderboardData}>
          <section className="relative container overflow-x-auto m-auto flex items-center justify-around">
            <div className="flex items-center justify-around flex-wrap max-sm:justify-center p-6">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">Leaderboard</h2>

                  <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                    {leaderboardData.length}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Here your efforts will be appreciated as points
                </p>
              </div>
            </div>
          </section>
        </Table>
      </div>
    </>
  )
}

export default withProtectedRoute(Leaderboard)
