import { AuthContext } from "../auth.context";
import { register, login, logout, getMe } from "../services/auth.api";
import { useContext, useEffect } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    try {
      setLoading(true);
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (er) {
      console.error(
        "Error in Registering User: ",
        er.response?.data?.message || er.message,
      );
      throw er;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ username, password }) {
    try {
      setLoading(true);
      const data = await login({ username, password });
      setUser(data.user);
    } catch (er) {
      console.error(
        "Error in Signing In User: ",
        er.response?.data?.message || er.message,
      );
      throw er;
    } finally {
      setLoading(false);
    }
  }

  async function handlegetMe() {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch (er) {
      console.error(
        "Error in Getting User: ",
        er.response?.data?.message || er.message,
      );
      throw er;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setLoading(true);
      const data = await logout();
      setUser(null);
    } catch (er) {
      console.error(
        "Error in Logging out: ",
        er.response?.data?.message || er.message,
      );
      throw er;
    } finally {
      setLoading(false);
    }
  }

  //? Re - hydrate the user on refreshing the page
  //** since logging in will leave token and getme will use that token to get/re-login user to prevent user from loging in again and again
  useEffect(() => {
    handlegetMe();
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handlegetMe,
  };
};

export default useAuth;
