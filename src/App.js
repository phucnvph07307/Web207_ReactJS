import React, { useEffect, useState } from "react";
import Routers from "./routers";
import axios from "axios";
import Swal from "sweetalert2";
import Category_API from "./api/categoryApi";
import Product_API from "./api/productApi";
import { useHistory } from "react-router-dom";
function App() {
  let history = useHistory();
  const [products, setProducts] = useState([]);
  const [products_client, setProductsClient] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllProductsClient();
  }, []);

  useEffect(() => {
    let shoppingCartItems = [];
    if (localStorage["shopping-cart-items"] != null) {
      shoppingCartItems = JSON.parse(
        localStorage["shopping-cart-items"].toString()
      );
    }
    setCart(shoppingCartItems);
    getTotal(shoppingCartItems);
  }, []);

  const getAllCategories = async () => {
    try {
      const { data } = await Category_API.getAll();
      setCategories(data);
    } catch (error) {
      console.log("failed to request API CATEGORY: ", error);
    }
  };
  const getAllProducts = async () => {
    try {
      const { data } = await Product_API.getAll();
      setProducts(data);
    } catch (error) {
      console.log("failed to request API PRODUCT: ", error);
    }
  };
  const getAllProductsClient = async () => {
    try {
      const { data } = await Product_API.getAllProductsClient();
      setProductsClient(data);
    } catch (error) {
      console.log("failed to request API PRODUCT: ", error);
    }
  };
  const getTotal = (array = []) => {
    const res = array.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
    setTotal(res);
  };
  const onHandleRemove = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/product/${id}`).then((res) => {
      console.log(res);
      const newProducts = [...products];
      newProducts.forEach((element, index) => {
        if (element.id == id) newProducts.splice(index, 1);
      });
      console.log(newProducts);
      setProducts(newProducts);
    });
  };

  const onHandleCreateProduct = (item) => {
    setProducts([...products, item]);
  };

  const onHandleUpdateProduct = (id, value_edit) => {
    value_edit.id = id;
    const newProducts = [...products];
    newProducts.forEach((element, index) => {
      if (element.id == id) newProducts.splice(index, 1);
    });
    setProducts([...newProducts, value_edit]);
  };

  const onHandleAddCart = async (id, quantity = 1) => {
    const check = cart.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = products.find((product) => product.id == id);
      data.quantity = quantity;
      const newCart = [...cart, data];
      setCart(newCart);
      localStorage["shopping-cart-items"] = JSON.stringify(newCart);
      getTotal(newCart);
    } else {
      cart.forEach((element) => {
        if (element.id == id) {
          element.quantity++;
        }
      });
      localStorage["shopping-cart-items"] = JSON.stringify(cart);
      getTotal(cart);
    }
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    }).fire({
      icon: "success",
      title: "Add to Cart successfully",
    });
  };
  const onHandleRedution = (id) => {
    cart.forEach((item) => {
      if (item.id == id) {
        if (item.quantity == 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    });
    setCart([...cart]);
    localStorage["shopping-cart-items"] = JSON.stringify(cart);
    getTotal(cart);
  };

  const onHandleIncrease = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity++;
      }
    });
    setCart([...cart]);
    localStorage["shopping-cart-items"] = JSON.stringify(cart);
    getTotal(cart);
  };
  const onHandlRemoveItemCart = (id) => {
    cart.forEach((item, index) => {
      if (item.id === id) {
        cart.splice(index, 1);
      }
    });
    setCart([...cart]);
    localStorage["shopping-cart-items"] = JSON.stringify(cart);
    getTotal(cart);
  };
  const onHandleClearCart = () => {
    setCart([]);
    localStorage["shopping-cart-items"] = JSON.stringify([]);
  };
  const onHandleRemoveCategory = async (id) => {
    try {
      const response = await Category_API.remove(id);
      if (!response.data && response.status < 300) {
        const newCategories = [...categories];
        newCategories.forEach((element, index) => {
          if (element.id == id) newCategories.splice(index, 1);
        });
        console.log(newCategories);
        setCategories(newCategories);
      }
    } catch (error) {
      console.log("failed to request API REMOVE CATEGORY: ", error);
    }
  };
  const onHandleCreateCategory = (params) => {
    setCategories([...categories, params]);
  };

  return (
    <div className="App">
      <Routers
        products={products}
        products_client={products_client}
        categories={categories}
        onRemove={onHandleRemove}
        onCreateProduct={onHandleCreateProduct}
        onUpdateProduct={onHandleUpdateProduct}
        onAddCart={onHandleAddCart}
        cart={cart}
        redution={onHandleRedution}
        increase={onHandleIncrease}
        removeItemCart={onHandlRemoveItemCart}
        total={total}
        clearCart={onHandleClearCart}
        getTotal={getTotal}
        onRemoveCategory={onHandleRemoveCategory}
        onCreateCategory={onHandleCreateCategory}
      />
    </div>
  );
}
export default App;
