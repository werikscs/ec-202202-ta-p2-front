import { Routes, Route } from "react-router-dom";
import { AxiosHttpClient } from "../api/axiosHttpClient";
import { IUserAPI } from "../api/types";
import { UserAPI } from "../api/userAPI";
import { Register } from "../pages/register";

const axiosHttpClient = new AxiosHttpClient();

export const Router = () => {
  const userAPI = new UserAPI(axiosHttpClient);
  return (
    <Routes>
      <Route
        path="/"
        element={<Register userAPI={userAPI} />}
      />
    </Routes>
  );
};
