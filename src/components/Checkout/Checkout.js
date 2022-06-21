import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProdvicer";
import "./checkout.css";
import { Link } from "react-router-dom";

const Checkout = () => {
  const auth = useAuth();
  const { cart, total } = useCart();

  if (!cart.length)
    return (
      <main className="container">
        <Link className="goToShopping" to="/"> go to shoppung? </Link>
      </main>
    );

  return (
    <main className="container">
      <section className="cartCenter">
        {auth ? (
          <>
            <section className="cartItemList">
              <h3>checkout detial</h3>
              <p>name : {auth.name}</p>
              <p>email : {auth.email}</p>
              <p>phoneNumber: {auth.phoneNumber}</p>
            </section>
            <section className="cartSummeryCheckOut">
              <div className="totalCheckOut">
                {cart &&
                  cart.map((c) => {
                    return (
                      <div>
                        {c.name} * {c.quantity} : {c.quantity * c.offPrice}
                      </div>
                    );
                  })}
                <hr />
                <div>total price : {total}</div>
              </div>
            </section>
          </>
        ) : (
          <p>please login !</p>
        )}
      </section>
    </main>
  );
};

export default Checkout;
