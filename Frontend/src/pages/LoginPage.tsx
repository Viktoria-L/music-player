import { AuthForm } from "../components/AuthForm";

const LoginPage = () => {
  return (
    <>
      <div className="loginpage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Welcome!</h2>
        <p className="tracking-wide mt-2">Login to play your music</p>
        <AuthForm />
      </div>
    </>
  );
};

export default LoginPage;
