const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 " >
      <h1 className="text-9xl font-extrabold text-red-600 mb-6 shadow-lg transform rotate-x-6 skew-y-3">404</h1>
      <p className="text-3xl text-gray-800 mb-6 shadow-md">¡Oh no! La página que buscas no existe.</p>
    </div>
  )
}

export default NotFound;