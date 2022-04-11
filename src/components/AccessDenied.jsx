import React from "react";
import { Link } from "react-router-dom";

function AccessDenied() {
  return (
    <>
      <div className="py-16">
        <div className="text-center">
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Access Denied
          </h1>
          <p className="mt-2 text-base text-gray-500">
            You do not have permission to view this page
          </p>
          <div className="mt-6">
            <Link
              to="/user"
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccessDenied;
