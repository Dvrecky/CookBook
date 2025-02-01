import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Jabłka', quantity: 1 },
    { id: 2, name: 'Banany', quantity: 1 },
    { id: 3, name: 'Chleb', quantity: 1 },
  ]);

   useEffect(() => {
    axios.get('http://localhost:8080/api/shopping-list')
      .then(response => setProducts(response.data.itemDTOS))
      .catch(error => console.error('Error fetching shopping list:', error));
  }, []);

  const increaseQuantity = (id) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    );

    // Wysyłanie żądania PATCH z quantity jako parametrem
    const updatedProduct = updatedProducts.find(product => product.id === id);
    axios.patch(`http://localhost:8080/api/shopping-list/${id}?quantity=${updatedProduct.quantity}`)
      .then(() => {
        setProducts(updatedProducts);
        console.log(`Quantity for product with id: ${id} updated successfully.`);
      })
      .catch(error => {
        console.error('Error updating product quantity:', error);
      });
  };

  const decreaseQuantity = (id) => {
    setProducts(prevProducts => 
      prevProducts.flatMap(product => {
        if (product.id === id) {
          if (product.quantity > 1) {
            // Jeśli quantity > 1, wykonaj PATCH
            const updatedProduct = { ...product, quantity: product.quantity - 1 };
  
            // Wysyłanie żądania PATCH z quantity jako parametrem
            axios.patch(`http://localhost:8080/api/shopping-list/${id}?quantity=${updatedProduct.quantity}`)
              .then(() => {
                setProducts(prevProducts => 
                  prevProducts.map(p => p.id === id ? updatedProduct : p)
                );
                console.log(`Quantity for product with id: ${id} updated successfully.`);
              })
              .catch(error => {
                console.error('Error updating product quantity:', error);
              });
            
            return [updatedProduct];  // Zaktualizuj produkt w stanie
          } else {
            // Jeśli quantity === 1, wykonaj DELETE
            axios.delete(`http://localhost:8080/api/shopping-list/${id}`)
              .then(() => {
                // Usuń produkt po udanym usunięciu
                setProducts(prevProducts => 
                  prevProducts.filter(p => p.id !== id)
                );
                console.log(`Product with id: ${id} deleted successfully.`);
              })
              .catch(error => {
                console.error('Error deleting product:', error);
              });
    
            return [];  // Usuń produkt z listy
          }
        } else {
          return [product];  // Pozostaw inne produkty bez zmian
        }
      })
    );
  };
  
  

  return (
    <div>
      <h2>Lista zakupów</h2>
      <ProductList products={products} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    </div>
  );
};

const ProductList = ({ products, increaseQuantity, decreaseQuantity }) => {

  if (products.length === 0) {
    return <p>Lista zakupów jest pusta.</p>;
  }
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{product.name} - {product.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;