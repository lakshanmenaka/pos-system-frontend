import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import toast from "react-hot-toast";

import posImage from "../assets/pos.jpg";

import { useLogin } from "../Hooks/useLogin";
import { loginSchema } from "../validators/auth.schema";
import { getApiErrorMessage } from "../utils/apiError";

function Login() {
  const navigate = useNavigate();

  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, loading } = useLogin();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        formRef.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

  
    setEmailError("");
    setPasswordError("");

    const validation = loginSchema.safeParse({
      email,
      password,
    });

   
    if (!validation.success) {
      const errors =
        validation.error.flatten().fieldErrors;

      setEmailError(errors.email?.[0] || "");
      setPasswordError(errors.password?.[0] || "");

      return;
    }

    try {
      await login(validation.data);

      
      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (err) {
     
      toast.error(
        getApiErrorMessage(err, "Login failed")
      );
    }
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen w-full bg-white overflow-hidden"
    >
      <div className="flex min-h-screen w-full flex-col md:flex-row">
       
        <section
          ref={imageRef}
          className="
            relative
            h-[360px]
            w-full
            shrink-0
            bg-cover
            bg-center
            bg-no-repeat
            md:h-screen
            md:w-1/2
          "
          style={{
            backgroundImage: `url(${posImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/65" />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-[58px] font-semibold leading-none tracking-wide text-[#0878df] md:text-[72px]">
              POSZ.
            </h1>

            <p className="mt-5 max-w-[430px] text-[13px] font-light leading-6 text-white/75 md:text-[14px]">
              Manage your business with a simple,
              <br />
              powerful and modern POS system.
            </p>
          </div>
        </section>

        
        <section
          ref={formRef}
          className="
            flex
            min-h-[calc(100vh-360px)]
            w-full
            items-center
            justify-center
            bg-white
            px-6
            py-12
            sm:px-10
            md:min-h-screen
            md:w-1/2
            md:px-16
            lg:px-[100px]
          "
        >
          <div className="w-full max-w-[390px]">
           
            <div className="mb-10">
              <h2 className="text-[27px] text-center font-semibold tracking-[-0.5px] text-[#171717]">
                Welcome Back
              </h2>

              <p className="mt-[2px] text-[12px] text-center font-light text-[#777777]">
                Sign in to continue to your account.
              </p>
            </div>

            
            <form onSubmit={handleSubmit}>
             
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[13px] font-medium text-[#333333]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Enter your email"
                  required
                  className="
                    h-[46px]
                    w-full
                    rounded-[5px]
                    border
                    border-[#dddddd]
                    bg-white
                    px-4
                    text-[13px]
                    text-[#222222]
                    outline-none
                    transition
                    placeholder:text-[#aaaaaa]
                    focus:border-[#1976d2]
                    focus:ring-1
                    focus:ring-[#1976d2]
                  "
                />

                {emailError && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              
              <div className="mb-7">
                <label
                  htmlFor="password"
                  className="mb-2 block text-[13px] font-medium text-[#333333]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    required
                    className="
                      h-[46px]
                      w-full
                      rounded-[5px]
                      border
                      border-[#dddddd]
                      bg-white
                      px-4
                      pr-12
                      text-[13px]
                      text-[#222222]
                      outline-none
                      transition
                      placeholder:text-[#aaaaaa]
                      focus:border-[#1976d2]
                      focus:ring-1
                      focus:ring-[#1976d2]
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-[46px]
                      w-[46px]
                      items-center
                      justify-center
                      text-[#888888]
                      transition
                      hover:text-[#1976d2]
                    "
                  >
                    {showPassword ? (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5.2 0 9.2 4 10 8-.3 1.5-1 2.8-2 4" />
                        <path d="M6.6 6.6C4.6 8 3.3 9.8 2 12c.8 4 4.8 8 10 8 1.8 0 3.4-.5 4.8-1.3" />
                      </svg>
                    ) : (
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />

                        <circle
                          cx="12"
                          cy="12"
                          r="2.8"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              
              <button
                type="submit"
                disabled={loading}
                className="
                  h-[46px]
                  w-full
                  rounded-[5px]
                  bg-[#1976d2]
                  text-[13px]
                  font-medium
                  tracking-[0.3px]
                  text-white
                  transition
                  cursor-pointer
                  duration-200
                  hover:bg-[#1565c0]
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>

            
            <p className="mt-4 text-center text-[12px] text-[#777777]">
              Don't Have An Account?{" "}

              <Link
                to="/register"
                className="font-medium text-[#1976d2] cursor-pointer hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;