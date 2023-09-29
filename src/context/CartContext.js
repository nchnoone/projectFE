import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  // const [isToastify, setIsToastify] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  //save local storage
  useEffect(() => {
    if (localStorage.getItem("cart_list")) {
      const storageLists = JSON.parse(localStorage.getItem("cart_list"))
      setCart(storageLists)
    }
  }, []);

  //cart amount
  useEffect(() => {
    const amount = cart.reduce((a, c) => {
      return a + c.amount
    }, 0)
    setItemsAmount(amount)
  }, [cart]);

  //cart total
  useEffect(() => {
    const total = cart.reduce((a, c) => {
      return a + c.attributes.price * c.amount
    }, 0)
    setTotal(total)
  }, [cart]);

  //add to cart
  const addToCart = (item, id) => {
    const itemID = parseInt(id)
    const newItem = { ...item[0], amount: 1 }
    setCart([...cart, newItem])
    //check if item is already in the cart
    const cartItem = cart.find((item) => {
      return item.id === itemID
    })
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === itemID) {
          setAmount(cartItem.amount + 1)
          return { ...item, amount: cartItem.amount + 1 }
        }
        else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem("cart_list", JSON.stringify(newCart))
    }
    else {
      setCart([...cart, newItem])
      localStorage.setItem("cart_list", JSON.stringify([...cart, newItem]))
    }
    //open the cart sidebar
    // setIsOpen(true)
    addToastify(true)
  }

  //remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    })
    setCart(newCart)
    localStorage.setItem("cart_list", JSON.stringify(newCart))
    removeToastify(true)
  }

  //clear cart
  const clearCart = () => {
    setCart([])
    localStorage.setItem("cart_list", JSON.stringify([]))
    removeToastify(true)
  }

  //handle input
  const handleInput = (e, id) => {
    const value = parseInt(e.target.value);
    //find the item in the cart by id
    const cartItem = cart.find(item => {
      return item.id === id
    })
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          if (isNaN(value)) {
            setAmount(1)
            return { ...item, amount: 1 }
          } else {
            setAmount(value)
            return { ...item, amount: value }
          }
        } else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem("cart_list", JSON.stringify(newCart))

    }
    // setIsOpen(true)
  }

  //handle select
  const handleSelect = (e, id) => {
    const value = parseInt(e.target.value)
    const cartItem = cart.find((item) => {
      return item.id === id
    })
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if (item.id === id) {
          setAmount(value)
          return { ...item, amount: value }
        } else {
          return item
        }
      })
      setCart(newCart)
      localStorage.setItem("cart_list", JSON.stringify(newCart))
    }
  }

  //react toastify
  const addToastify = () => toast.success('Item added to cart.', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const removeToastify = () => toast.warn('Item removed from to cart.', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  // const addToastify = () => toast.success('Look at my styles.', {
  //   style: {
  //     border: '1px solid #713200',
  //     padding: '16px',
  //     color: '#713200',
  //     background: '#f6cd46',
  //   },
  //   iconTheme: {
  //     primary: '#713200',
  //     secondary: '##f6cd46',
  //   },
  // });

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, addToCart, cart, removeFromCart, itemsAmount, handleInput, handleSelect, total, clearCart }}>
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;
