import { useUser } from '../../api/userUser'
import LogInRequired from '../../pages/login/LogInRequired'

function RequireAuth({ children }) {
  const { data: user, isLoading, isError, refetch } = useUser()

  if (isLoading) {
    return <p className="p-8 text-center text-gray-500">Checking your session…</p>
  }

  // Server unreachable / 5xx: don't claim the user is logged out
  if (isError) {
    return (
      <div className="space-y-3 p-8 text-center">
        <p className="text-gray-500">We couldn't verify your session.</p>
        <button type="button" onClick={() => refetch()}>Try again</button>
      </div>
    )
  }

  if (!user) return <LogInRequired />

  return children
}

export default RequireAuth