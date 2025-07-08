import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // console.log(inputs);
    try {
      const res = await axios.post("http://localhost:5000/api/login", inputs);
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log("giris yapildi");

      const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload

      dispatch(login(payload)); // Admin bilgisi Redux’a yazılıyor

      navigate("/dashboard");
    } catch (error) {
      console.error("login hatasi", error.message);
      setError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // JWT çözümle
        dispatch(login(payload)); // tekrar redux’a yükle
      } catch (err) {
        console.error("token parse hatası", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Giriş Yap</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form
            className="px-5 py-7 flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            {error && <div className="text-sm">{error}</div>}
            <TextField
              label="Kullanıcı Adı"
              size="small"
              variant="outlined"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
            />

            <TextField
              label="Şifre"
              size="small"
              variant="outlined"
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
              sx={{
                width: "100%",
              }}
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block cursor-pointer"
            >
              <span className="inline-block mr-2">Giriş Yap</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
