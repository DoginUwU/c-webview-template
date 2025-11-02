import { Link } from "react-router"

export const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/example-page">Go to Example Page</Link>
    </div>
  )
}
