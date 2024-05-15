import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginPayload } from "../../../types/PayloadInterface";
import { userLoginValidationSchema } from "../../../utils/validation";
import { userLogin } from "../../../features/axios/api/user/userAuthentication";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { loginSuccess } from "../../../features/redux/slices/user/userLoginAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuthComponent from "./GoogleAuthComponent";

export default function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.userAuth.isLoggedIn
  );
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: "top-right" })
      : toast.success(msg, { position: "top-right" });

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess());
    }
    if (isLoggedIn === true) {
      navigate("/user/home");
    }
  }, [navigate]);

  const submitHandler = async (formData: LoginPayload) => {
    userLogin(formData)
      .then((response) => {
        const token = response.token;
        dispatch(setToken(token));
        dispatch(loginSuccess());

        notify("Login success", "success");
        setTimeout(() => {
          navigate("/user/home");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div className="flex justify-start h-screen bg-[#24170b]">
      <div className="ml-32 flex justify-center items-center">
        <img
          src="https://scontent.fhan11-1.fna.fbcdn.net/v/t39.30808-6/441323021_2106290529733240_8805987863811406058_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6v66yz-GiLsQ7kNvgFsAy8A&_nc_ht=scontent.fhan11-1.fna&oh=00_AYBmmDvhqUZLhFp_JowInfRYHAGEELTV9bNmB6nI_2O8dA&oe=6643AE51"
          alt="Img"
          className="w-[500px]"
        />
      </div>
      <div className="flex justify-center items-center w-3/5 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="w-96 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="text  "
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm" htmlFor="email">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-24 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 flex justify-center items-center mx-auto"
            >
              Login
            </button>
          </form>
          <span className="mr-2 flex justify-center">or</span>
          <div className="flex items-center justify-center mt-2">
            <GoogleAuthComponent />
          </div>

          <div className="mt-4 text-center">
            <Link to={"/user/register"}>
              <span className="text-gray-500">
                Don't have an account?{" "}
                <p className="text-purple-600 underline">Sign up</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
