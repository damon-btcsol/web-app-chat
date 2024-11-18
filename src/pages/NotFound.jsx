import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="flex w-full items-center justify-center flex-col p-16 gap-11">
      <h1 className=" text-9xl font-bold text-w-3">404</h1>
      <h4 className="text-2xl text-b-3">Sorry! Page not found</h4>
      <p className=" w-1/3 text-b-3 text-center text-lg">
        Oops! It seem like the page you're trying to access doesn't exist. If
        you believe there's an issue, feel free to report it, and we'll look
        into it.
      </p>
      <Link
        to="/"
        className="btn"
      >
        Go to Home
      </Link>
    </section>
  )
}

export default NotFound
