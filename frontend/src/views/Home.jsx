import UserList from "../componentes/userList";

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-primary font-primary m-10">
        Patas Pirque ¡Ayúdanos a darles un hogar!
      </h1>
      <div>
        <h2 className="text-xl font-bold text-tertiary font-primary mx-10 my-6">
          Listado de Usuarios Activos:
        </h2>
        <UserList />
      </div>
    </>
  );
}

export default Home;
