import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  quantity: number;
}

const ShoppingList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/shopping-list')
      .then(response => setProducts(response.data.itemDTOS || []))
      .catch(error => console.error('Error fetching shopping list:', error));
  }, []);

  const increaseQuantity = (id: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(product => 
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      );
      
      const updatedProduct = updatedProducts.find(product => product.id === id);
      if (updatedProduct) {
        axios.patch(`http://localhost:8080/api/shopping-list/${id}?quantity=${updatedProduct.quantity}`)
          .then(() => console.log(`Quantity for product with id: ${id} updated successfully.`))
          .catch(error => console.error('Error updating product quantity:', error));
      }
      return updatedProducts;
    });
  };

  const decreaseQuantity = (id: number) => {
    setProducts((prevProducts) => {
      return prevProducts.reduce((acc: Product[], product) => {
        if (product.id === id) {
          if (product.quantity > 1) {
            const updatedProduct = { ...product, quantity: product.quantity - 1 };
            axios.patch(`http://localhost:8080/api/shopping-list/${id}?quantity=${updatedProduct.quantity}`)
              .then(() => console.log(`Quantity for product with id: ${id} updated successfully.`))
              .catch(error => console.error('Error updating product quantity:', error));
            acc.push(updatedProduct);
          } else {
            axios.delete(`http://localhost:8080/api/shopping-list/${id}`)
              .then(() => console.log(`Product with id: ${id} deleted successfully.`))
              .catch(error => console.error('Error deleting product:', error));
          }
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });
  };
  
  return (
    <div>
      <h2>Lista zakupów</h2>
      <ProductList products={products} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, increaseQuantity, decreaseQuantity }) => {
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
