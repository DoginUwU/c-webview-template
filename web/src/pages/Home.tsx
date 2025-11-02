import { Link } from "react-router"

export const Home = () => {
  const handlePing = async () => {
    try {
      const response = await window.ping("Hello from frontend")
      console.log("Response from backend:", response, response.message)
    } catch (error) {
      console.error("Error calling ping:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Home Page</h1>
      <Link to="/example-page">Go to Example Page</Link>
      <button className="mt-4 bg-blue-600 text-white" onClick={handlePing}>Send Ping</button>
    </div>
  )
}
