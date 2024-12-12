import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const Foods = ({ orders, setOrders }) => {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food items from the API on component mount
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('/foods');
        setFoodItems(response.data); // Assuming response.data contains the list of food items
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoods();
  }, []);

  const addToOrder = (food) => {
    setOrders([...orders, food]);  // Add selected food to orders
  };

  return (
    <div>
      <h1>Browse Food Items</h1>
      <ul>
        {foodItems.map((food) => (
          <li key={food.id}>
            {food.name} - ₹{food.price}
            <button onClick={() => addToOrder(food)}>Add to Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Foods;
