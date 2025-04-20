import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const payloadBase64 = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const userId = decodedPayload?.sub;

        const res = await fetch(`https://patas-pirque.onrender.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener el usuario");

        const user = await res.json();
        setUserName(user.name);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-boldtext-2xl text-primary cursor-pointer">Bienvenido, {userName}!</h1>
    </div>
  );
};

export default Dashboard;
