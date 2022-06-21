import Layout from "../Layout/Layout";
import * as data from "../data";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { useCart, useCartActions } from "../Providers/CartProdvicer";
import { checkInCart } from "../utils/checkInCart";
import { toast } from "react-toastify";
const HomePage = () => {
  const { cart } = useCart();

  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    toast.success(`${product.name} added to cart !`);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <main className="container">
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product" key={product.id}>
                <div className="black">
                  <div className="prouductImg">
                    <img src={product.image} alt={product.name}></img>
                  </div>
                  <div className="productDesc">
                    <p>{product.name}</p>
                    <span> $ {product.price}</span>
                  </div>
                </div>
                <div className="white">
                  <div className="like">
                    <IoMdHeart />
                    <MdOutlineSaveAlt />
                    <MdShare />
                  </div>
                  <button
                    onClick={() => addProductHandler(product)}
                    className="btn primary"
                  >
                    {checkInCart(cart, product) ? "In cart" : "Add to Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
