import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth.js';


function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, user } = useAuth();

  console.log(user);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values);
      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
      console.log('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" { ...register('username', {required:true})}
        placeholder='Username' />
        <input type="email" { ...register('email', {required:true})}
        placeholder='email'  />
        <input type="password" { ...register('password', {required:true})}
        placeholder='password'  />
        <button type='submit'>Registrar</button>
      </form>
    </div>
  )
}

export default RegisterPage