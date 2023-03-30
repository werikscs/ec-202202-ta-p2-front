import { Routes, Route } from "react-router-dom";
import { AxiosHttpClient } from "../api/http-clients/axios-http-client";
import { Register } from "../pages/register";
import { UserAPIFake } from '../test/fake-api/user-api-fake';

const axiosHttpClient = new AxiosHttpClient();

export const Router = () => {
  const userAPI = new UserAPIFake(axiosHttpClient);
  return (
    <Routes>
      <Route
        path="/"
        element={<Register userAPI={userAPI} />}
      />
    </Routes>
  );
};
