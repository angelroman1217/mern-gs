import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/employees");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 text-white p-2" key={i} role="alert">{error}</div>
        ))}
        <h1 className="text-3xl font-bold my-2">Registro</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />

          {errors.username && <p className="text-red-500">Username es requerido</p>}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />

          {errors.email && <p className="text-red-500">Email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />

          {errors.password && <p className="text-red-500">Password es requerido</p>}


          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white my-2 py-2 px-4 rounded">Registrar</button>
        </form>

        <p className="flex gap-x-2 justify-between">¿Ya tienes Cuenta? <Link to="/login" className="text-sky-500">Entrar</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;