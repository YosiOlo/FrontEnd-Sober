import React from 'react';

function Breadcrumb({ items }) {
  return (
    <div className="hidden md:block">
      <div className="bg-slate-100 px-1 py-2 responsive">
        <div className="bg-slate-200 m-2 bread-crumb">
          <ol className="inline-flex p-0 list-none">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <a href={item.url} className="hover:text-blue-600">{item.label}</a>
                {index < items.length - 1 && <span className="mx-2">&#9656;</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;


// import React from 'react';
// import { Link } from 'react-router-dom';

// function Breadcrumb({ items }) {
//   return (

//     <div className="responsive md:block hidden">
//       <div className="bread-crumb m-1 bg-slate-500">
//         <nav className='p-4'>
//           <ol className="list-none p-0 inline-flex">
//             {items.map((item, index) => (


//               <li key={index} className="flex items-center">
//                 <Link href={item.url} className="hover:text-blue-600">
//                   {item.label}
//                 </Link>
//                 {index < items.length - 1 && (
//                   <span className="mx-2">&#9656;</span>
//                 )}
//               </li>




//             ))}
//           </ol>
//         </nav>
//       </div>
//     </div>


//   );
// }

// export default Breadcrumb;

