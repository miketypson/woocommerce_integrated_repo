'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDebug() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log(`Debugging product data for ID: ${id}`);
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        
        const data = await response.json();
        console.log('Full product data:', data);
        setProductData(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Product Data Debugger</h1>
      
      <div className="bg-gray-100 p-4 rounded overflow-auto">
        <pre className="text-xs">{JSON.stringify(productData, null, 2)}</pre>
      </div>
    </div>
  );
}
