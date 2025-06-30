import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <form onSubmit={ handleSubmit(async (values) => {
        console.log(values);
        const res = await registerRequest(values);
        console.log(res);
      })}>
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