import { useUsers } from "../hook/useUser";

const UserList = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
