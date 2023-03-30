import { Routes, Route } from "react-router-dom";
import { UserAPI } from "../api/user-api";
import { Register } from "../pages/register";
import { InMemoryAdapter } from "../test/http-clients/inmemory-adapter";

export const Router = () => {
  const httpClient = new InMemoryAdapter();
  const userAPI = new UserAPI(httpClient);
  return (
    <Routes>
      <Route
        path="/"
        element={<Register userAPI={userAPI} />}
      />
    </Routes>
  );
};
