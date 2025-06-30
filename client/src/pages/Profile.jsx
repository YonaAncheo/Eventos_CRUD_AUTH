import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  if (!user) return <h2>No has iniciado sesión</h2>;
  return (
    <div>
      <h2>Perfil de usuario</h2>
      <p><b>ID:</b> {user.id}</p>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Creado:</b> {user.createdAt}</p>
      <p><b>Actualizado:</b> {user.updatedAt}</p>
    </div>
  );
};

export default Profile;
