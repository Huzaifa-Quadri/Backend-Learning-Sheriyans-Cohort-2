import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.api";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async function (email, password) {
    try {
      setLoading(true);
      const response = await login(email, password);
      setUser(response.user);
      setLoading(false);
      return response.user;
    } catch (error) {
      setLoading(false);
      console.error("Error in login in hook layer", error);
    }
  };

  const handleRegister = async function (name, email, password) {
    try {
      setLoading(true);
      const response = await register(name, email, password);
      setUser(response.user);
      setLoading(false);
      return response.user;
    } catch (error) {
      setLoading(false);
      console.error("Error in register in hook layer", error);
    }
  };

  const handleGetMe = async function () {
    try {
      setLoading(true);
      const response = await getMe();
      setUser(response.user);
      setLoading(false);
      return response.user;
    } catch (error) {
      setLoading(false);
      console.error("Error in getMe in hook layer", error);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
  };
};

export default useAuth;
