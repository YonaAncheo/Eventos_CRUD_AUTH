import { useAuth } from '../context/useAuth.js';
import '../pages/styles.css';

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="centered-container">
      <div className="card">
        <h2>Perfil de Usuario</h2>
        {user ? (
          <>
            <p><b>ID:</b> {user.id}</p>
            <p><b>Nombre de usuario:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
            {user.createdAt && <p><b>Creado:</b> {new Date(user.createdAt).toLocaleString()}</p>}
            {user.updatedAt && <p><b>Actualizado:</b> {new Date(user.updatedAt).toLocaleString()}</p>}
          </>
        ) : (
          <p>No hay información de usuario disponible.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;