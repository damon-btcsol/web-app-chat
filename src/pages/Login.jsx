import React from "react"
import { Link } from "react-router-dom"

// Files
import useLogin from "../hooks/useLogin"
import Loading from "../components/Loading"

const Login = () => {
  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const { email, password } = Object.fromEntries(formData)

    if (password.length < 6)
      return toast.error("Password must be at last 6 characters.")

    if (!email || !password) return toast.error("Please fill in all fields")

    // Login in using custom hook
    login(email, password)
  }
  return (
    <div className="w-full h-full flex-center flex-col gap-12">
      <h1 className="md:text-5xl text-4xl font-bold tracking-wide">Login</h1>
      <form
        className="min-w-96 flex flex-col gap-6 dark:bg-b-2 bg-w-2 rounded-md p-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your Email."
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password."
          className="input"
        />
        <p>
          Don't have an Account{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:underline transition-all"
          >
            Click hear.
          </Link>
        </p>
        <button className="w-full btn">
          {loading ? <Loading /> : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
