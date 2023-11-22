import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate1 } from '../../../../utils/utils';
import { getOrdersById } from '../../../../utils/ApiConfig';

const HistoryShipping = () => {
  const [order, setOrders] = useState([]); 
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const data = await getOrdersById(id);
        setOrders(data.order_histories); 
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrderById(); 
  }, [id]);

  return (
    <div className="history-shipping bg-white p-4 rounded-lg shadow-md">
      <div className="timeline space-y-4">
        {order.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
              {index + 1}
            </div>
            <div className="ml-4">
              <div className="font-bold">{step.description}</div>
              <div className="text-gray-500">{formatDate1(step.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryShipping;
