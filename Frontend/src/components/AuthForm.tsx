import { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../stores/authStore/authSlice";
import { AppDispatch, RootState } from "../stores/configureStore";
import { fetchFavorites, fetchPlaylists } from "../stores/userStore/userThunk";

function AuthForm() {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const loginData = { user: user, pass: pass };
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
              placeholder="Förnamn"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Efternamn"
            />
          </>
        )}
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Användarnamn"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Lösenord"
        />
        <button type="submit" className="submitBtn">
          {isRegistering ? "Register" : "Logga in"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggleBtn"
        >
          {isRegistering
            ? "Har du redan ett konto? Logga in"
            : "Är du inte medlem än? Klicka här för att registrera dig!"}
        </button>
      </form>
    </>
  );
}

export default AuthForm;
