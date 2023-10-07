import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { putOrderReturns } from "../../../../utils/ApiConfig";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function OrderStatus({ orderId }) {
  const [status, setStatus] = useState(null);
  const { id } = useParams();

  const handleUpdateData = () => {
    const updatedData = {
      status: status,
    };
    useEffect(() => {
      const fetchOrderData = async () => {
        const authToken = getAuthToken();
        try {
          const response = await axios.get(
            `https://kuro.asrofur.me/sober/api/transaction/vendor/details/${id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setStatus([response.data.data.status]);
          console.log("Order Data:", response.data.data.code);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchOrderData();
    }, [id]);

    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJlbWFpbCI6InNvYmVyb2ZmaWNpYWxAZ21haWwuY29tIiwiaWF0IjoxNjk2NTgzMjI4LCJleHAiOjE2OTY2Njk2Mjh9.EaFcAfO7uxNDVpJ19oV0XDOd1o-L4SHKq3EoM6aHBn4";

    putOrderReturns(id, updatedData, bearerToken)
      .then((response) => {
        console.log("Order status updated successfully:", response);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order status has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update order status",
        });
        console.error("Error updating order status:", error);
      });
  };

  return (
    <div className="card bg-white rounded-md shadow-lg w-[700px] mt-6 p-4 break-words">
      <p className="font-semibold">Change return order status</p>

      <div>
            <label className="block font-medium">Payment Method</label>
            <select
              className="border rounded px-3 py-2 w-full bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="canceled">Canceled</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
            </select>
          </div>

      <div className="update flex justify-end mt-5">
        <button className="bg-[#4d97c1] w-[70px] h-[30px] rounded-lg" onClick={handleUpdateData}>Update</button>
      </div>
    </div>
  );
}

export default OrderStatus;
