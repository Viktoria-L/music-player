import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../stores/authStore/authThunk";
import { AppDispatch } from "../stores/configureStore";
import { fetchFavorites, fetchPlaylists } from "../stores/userStore/userThunk";

function AuthForm() {
  const dispatch: AppDispatch = useDispatch();

  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(login({ user, pass }));
    dispatch(fetchFavorites());
    dispatch(fetchPlaylists());
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register({ firstname, lastname, user, pass }));
  };

  return (
    <>
      <form
        className="userForm flex flex-col w-80 gap-3 mt-5"
        onSubmit={isRegistering ? handleRegister : handleLogin}
      >
        {isRegistering && (
          <>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Firstname"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Lastname"
            />
          </>
        )}
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="submitBtn">
          {isRegistering ? "Register" : "Log in"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggleBtn"
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "Not a member yet? Click here to register!"}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
