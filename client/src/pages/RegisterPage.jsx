import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function RegisterPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/events');
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    const result = await signup(values);
    if (!result.success) setErrorMsg(result.message);
    else setErrorMsg('');
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        {errorMsg && <div style={{color:'red', marginBottom:10}}>{errorMsg}</div>}
        <input type="text" { ...register('username', {required:true})}
        placeholder='Username' />
        {
          errors.username && <span>Este campo es obligatorio</span>
        }
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
        <button type='submit'>Registrar</button>
      </form>
      <p>Ya estás registrado? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default RegisterPage