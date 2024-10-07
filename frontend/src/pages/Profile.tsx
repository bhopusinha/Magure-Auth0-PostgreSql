import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-lg font-semibold">Loading ...</div>
    </div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="max-w-xs mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
        <img className="w-full h-48 object-cover" src={user.picture} alt={user.name} />
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
