import { Link } from "react-router-dom";

function Notfound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-[70px] font-semibold text-[#1976d2]">
          404
        </h1>

        <p className="mt-2 text-[14px] text-[#777777]">
          Page not found
        </p>

        <Link
          to="/"
          className="
            mt-6
            inline-flex
            h-[44px]
            items-center
            justify-center
            rounded-[5px]
            bg-[#1976d2]
            px-8
            text-[13px]
            font-medium
            text-white
            hover:bg-[#1565c0]
          "
        >
          GO TO LOGIN
        </Link>
      </div>
    </main>
  );
}

export default Notfound;