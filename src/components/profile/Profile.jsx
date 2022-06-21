import { useAuth } from "../../Providers/AuthProvider";

const Profile = () => {
  const auth = useAuth();

  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>profile</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>phoneNumber: {auth.phoneNumber}</p>
            </section>
          </>
        ) : (
          <p className="notLoginP">please login !</p>
        )}
      </section>
    </main>
  );
};

export default Profile;
