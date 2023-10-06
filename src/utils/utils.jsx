
import { BsCheckLg } from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai";


function formatDate(datestring) {
  return new Date(datestring).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { formatDate };

export const getOrderConfirm = (confirm) => {
  if (confirm === "confirm")
    return (
      <div className="orderStatus border-t-[1px] border-slate-200 p-4 flex gap-3">
        <BsCheckLg className="text-white text-3xl bg-green-400 rounded-3xl p-1 " />
        <p className="mt-1">ORDER WAS CONFIRMED</p>
      </div>
    );
    else return (
      <div className="orderStatus border-t-[1px] border-slate-200 p-4 flex gap-3">
        <AiFillCloseCircle className="text-white text-3xl bg-green-400 rounded-3xl p-1 " />
        <p className="mt-1">ORDER WAS UNCONFIRMED</p>
      </div>
    )
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
