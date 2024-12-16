import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuth } from "./context/AuthProvider";
import Left from "./home/left/Left";
import Right from "./home/right/Right";

function App() {
  const { authUser } = useAuth();
  console.log(authUser, "authUser");
  return (
    // <div className="flex bg-slate-900 text-white h-screen">
    //   <Left />
    //   <Right />
    // </div>
    // <Signup />
    // <Login />
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex bg-slate-900 text-white h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to={"/login"} />
          )
        }
      />
      <Route
        path="login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />
      <Route
        path="signup"
        element={authUser ? <Navigate to={"/"} /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
