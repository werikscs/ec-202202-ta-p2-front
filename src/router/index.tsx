import { Routes, Route } from "react-router-dom";
import { AxiosHttpClient } from "../api/http-clients/axios-http-client";
import { IUserAPI } from "../api/types/types";
import { UserAPI } from "../api/user-api";
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
