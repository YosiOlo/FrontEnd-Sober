import { BsCheckLg } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

function formatDate(datestring) {
  return new Date(datestring).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { formatDate };

export const getIconsDetails = (status) => {
  if (status === "pending")
    return (
      <div className="icon">
        <AiFillCloseCircle className="text-white text-3xl bg-red-500 rounded-3xl p-1 " />
      </div>
    );
  if (status === "delivered")
    return (
      <BsCheckLg className="text-white text-3xl bg-green-400 rounded-3xl p-1 " />
       
    );
};

export const getStatusDetails = (status) => {
  if (status === "pending")
    return (
      <p className="bg-red-400 text-yellow-800 p-1 rounded-md ">
        {" "}
        Arrange Shipment
      </p>
    );
  if (status === "delivered")
    return (
      <p className="bg-yellow-400 text-yellow-800 p-1 rounded-md ">
        {" "}
        Delivered
      </p>
    );
};

function getInitials(name) {
  if (!name) {
    return "";
  }
  const names = name.split(" ");
  return names
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}


export {getInitials};

function formatDate1(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate.replace(/, /, "  ");
}

export { formatDate1 };

export const getOrderConfirm = (confirm) => {
  if (confirm === "confirm")
    return (
      <div className="orderStatus border-t-[1px] border-slate-200 p-4 flex gap-3">
        <BsCheckLg className="text-white text-3xl bg-green-400 rounded-3xl p-1 " />
        <p className="mt-1">ORDER WAS CONFIRMED</p>
      </div>
    );
  else
    return (
      <div className="orderStatus border-t-[1px] border-slate-200 p-4 flex gap-3">
        <AiFillCloseCircle className="text-white text-3xl bg-green-400 rounded-3xl p-1 " />
        <p className="mt-1">ORDER WAS UNCONFIRMED</p>
      </div>
    );
};

export const getPaymentStatus = (PaymentStatus) => {
  if (PaymentStatus === "completed")
    return (
      <div className="card rounded-md bg-green-400 text-center text-xs font-semibold">
        Completed
      </div>
    );
  if (PaymentStatus === "pending")
    return (
      <div className="card rounded-md bg-yellow-400 text-center text-xs font-semibold">
        Pending
      </div>
    );
  else return <div className="badge badge-ghost">{PaymentStatus}</div>;
};

export const getStatus = (Status) => {
  if (Status === "completed")
    return (
      <div className="card rounded-md bg-green-400 text-center text-xs font-semibold">
        {Status}
      </div>
    );
  if (Status === "processing")
    return (
      <div className="card rounded-md bg-blue-400 text-center text-xs font-semibold">
        {Status}
      </div>
    );
  if (Status === "pending")
    return (
      <div className="card rounded-md bg-yellow-400 text-center text-xs font-semibold">
        {Status}
      </div>
    );
};

export const getStatusProducts = (Status) => {
  if (Status === "published")
    return (
      <div className="card rounded-md p-1 bg-[#36c6d3] text-center text-xs font-semibold">
        Published
      </div>
    );
  else {
    return (
      <div className="card rounded-md bg-red-400 text-center text-xs font-semibold">
        Pending
      </div>
    );
  }
};

export const getPaymentMethod = (method) => {
  if (method === "bank_transfer")
    return <p className="text-[12px]">Bank Transfer</p>;
  if (method === "virtual_account")
    return <p className="text-[12px]">Virtual Account</p>;
  else return <p className="text-[12px]">{method}</p>;
};
