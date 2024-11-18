import toast from "react-hot-toast"
import React, { useState } from "react"
import { Link } from "react-router-dom"

// Files
import Loading from "../components/Loading"
import useRegister from "../hooks/useRegister"

const Register = () => {
  const [img, setImg] = useState("/uploadImage.png")

  const { loading, register } = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData(e.target)

      const { avatar, fullName, email, password, confPassword } =
        Object.fromEntries(formData)

      if (password.length < 6 || confPassword.length < 6)
        return toast.error("Password must be at last 6 characters.")

      if (!avatar || !fullName || !email || !password || !confPassword)
        return toast.error("Please fill in all fields")

      if (password !== confPassword)
        return toast.error("Password do not match.")

      // Registering using custom hook
      register(avatar, fullName, email, password)
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  return (
    <div className="w-full h-full flex-center flex-col gap-12">
      <h1 className="md:text-5xl text-4xl font-bold tracking-wide">Register</h1>
      <form
        className="min-w-96 flex flex-col gap-6 dark:bg-b-2 bg-w-2 rounded-md p-3"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex-center">
          <label className="size-28 rounded-full overflow-hidden bg-w-3 flex-center relative border-[3px] dark:border-b-3 border-w-3 cursor-pointer">
            <img
              src={img}
              alt="Profile Pic"
              className="object-cover h-full w-full"
            />
            <input
              type="file"
              name="avatar"
              required
              className="hidden"
              onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            />
          </label>
        </div>
        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name."
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your Email."
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password."
          className="input"
          required
        />
        <input
          type="password"
          name="confPassword"
          placeholder="Re-Enter your Password."
          className="input"
          required
        />
        <p>
          Already have an Account{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline transition-all"
          >
            Click hear.
          </Link>
        </p>
        <button
          className="w-full btn"
          disabled={loading}
        >
          {loading ? <Loading /> : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register
