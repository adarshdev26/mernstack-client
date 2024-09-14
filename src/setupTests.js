// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


{cart.length === 0 ? (
    <p>Your order is empty.</p>
  ) : (
    <ul>
      {cart.map((item, index) => (
        <li key={index}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  )}

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart([...cart, selectedProduct]);
    }
    handleClose();
  };