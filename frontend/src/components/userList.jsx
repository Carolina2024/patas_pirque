import { useUsers } from "../hook/useUser";

const UserList = () => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="list-disc pl-5 text-lg mx-10">
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
