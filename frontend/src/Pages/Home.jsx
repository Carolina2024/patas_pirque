import UserList from "../components/UserList";

function Home() {
  return (
    <>
    <h1 className='text-3xl font-bold text-primary font-primary m-10'>Welcome to Patas Pirque</h1>
    <h2 className="text-3xl font-bold text-black font-primary m-10">Adopción de mascotas</h2>

    <div>
      <h2 className="text-xl font-bold text-black font-primary mx-10 my-6">Listado de API:</h2>
      <UserList />


    </div>
  </>
  );
}

export default Home;
