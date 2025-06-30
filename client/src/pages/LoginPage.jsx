import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/useAuth.js';

function LoginPage() {
  
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signin, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (isAuthenticated) navigate('/events');
    }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit( (values) => {
    signin(values);
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" { ...register('email', {required:true})}
        placeholder='email'  />
        {
          errors.email && <span>Este campo es obligatorio</span>
        }
        <input type="password" { ...register('password', {required:true})}
        placeholder='password'  />
        {
          errors.password && <span>Este campo es obligatorio</span>
        }
        <button type='submit'>Login</button>
      </form>
      <p>No tiene una cuenta aun? <Link to="/register">Registrarse</Link></p>
    </div>
  )
}

export default LoginPage;