import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CartRow = ({ product, updateQuantity, removeItem }) => {
  const { image, name, price, quantity, id } = product;

  return (
    <tr>
      <td>
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td>{name}</td>
      <td>${price.toFixed(2)}</td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </td>
      <td>
        <button
          onClick={() => removeItem(id)}
          className="text-red-500 hover:text-red-700"
        >
          <AiOutlineClose size={20} />
        </button>
      </td>
    </tr>
  );
};

export default CartRow;
