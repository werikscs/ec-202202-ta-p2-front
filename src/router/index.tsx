import { Routes, Route } from "react-router-dom";
import { UserAPI } from "../api/user-api";
import { Register } from "../pages/register";
import { FakeHttpClient } from "../test/fake-http-client";
import { AxiosHttpClient } from "../api/axios-http-client";
import { AuthAPI } from "../api/auth-api";

export const Router = () => {
  const httpClient = new AxiosHttpClient();
  const authAPI = new AuthAPI(httpClient, "/auth");
  const userAPI = new UserAPI(httpClient, "/user");
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <Register
            authAPI={authAPI}
            userAPI={userAPI}
          />
        }
      />
    </Routes>
  );
};
