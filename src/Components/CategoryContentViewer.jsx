import HeaderViewer from './HeaderViewer';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


function getTermClass(index) {
  const cycle = Math.floor(index / 3) % 2; 
  return cycle === 0 ? 'term-down' : 'term-up';
}



export default function CategoryContentViewer({ currentCategory = { terms: [] }, setCurrentCategory, setCategories }) {
   const navigate = useNavigate();
   const location = useLocation();
 
   const [category, setCategory] = useState({ ...currentCategory, terms: currentCategory?.terms || [] });
 
   
   const { title, description } = location.state || {};

   
   useEffect(() => {
      // عند الضغط على الفئة يجب التأكد من أن البنود الخاصة بها موجودة
      setCategory(currentCategory);
    }, [currentCategory]);

    useEffect(() => {
      const storedCategory = JSON.parse(localStorage.getItem(title));  // تأكد من استرجاع الفئة بناءً على title
      if (storedCategory) {
        setCategory(storedCategory);
        setCurrentCategory(storedCategory);
      }
    }, [title]); 
    

    function handleTermClick(term) {
      navigate('/termcontentviewer', {
        state: {
          termTitle: term.title,
          termContent: term.content,
          termDescription: term.description,
          attachments: term.attachments || []
        }
      });
    }

   
   return (
     <>
       
 
        <HeaderViewer/>
        
       <div className="back-home">
         <Link to="/homeViewer"><i className="fa-solid fa-house text-3xl cursor-pointer text-header" /></Link>
       </div>
       <section>
 
         <div className="category-content relative">
           <div className="mt-10 px-10">
             <h1 className="text-5xl font-bold max-sm:text-4xl">عنوان الفئة:</h1>
             <h1 className="text-2xl h-auto mt-4 title-category">{title}</h1>
           </div>
           <div className="mt-10 px-10">
             <h1 className="text-5xl font-bold max-sm:text-4xl">وصف الفئة:</h1>
             <h1 className="text-2xl h-auto mt-4 descrebtion-categoy">{description}</h1>
           </div>
           <div className="mt-10 px-10">
             <h1 className="text-5xl font-bold max-sm:text-4xl">البنود:</h1>
           </div>
 
           <div className='flex justify-center mt-10'>
           </div>
 
           
           {category.terms.length === 0 ? (
             <div className="text-center mt-20 mb-20 text-3xl text-black font-bold">
               لا توجد بنود
             </div>
           ) : (
             <>
               <div className="terms mt-10 mb-10 space-y-10">
                 {Array.from({ length: Math.ceil((category.terms || []).length / 3) }).map((_, rowIndex) => {
                   const rowItems = category.terms.slice(rowIndex * 3, rowIndex * 3 + 3);
 
                   const rowClassName =
                     rowItems.length === 1
                       ? "flex justify-center"
                       : rowItems.length === 2
                       ? "flex justify-around"
                       : "grid grid-cols-3 justify-items-center";
 
                   return (
                     <div key={rowIndex} className={rowClassName}>
                       {rowItems.map((term, index) => {
                         const termClass = getTermClass(rowIndex * 3 + index);
                         const isTermUp = termClass.includes('term-up');
                         const isTermDown = termClass.includes('term-down');
 
                         return (
                           <div
                             key={index}
                             className={`${termClass} mt-20 w-60 h-60 cursor-pointer relative`}
                             onClick={() => handleTermClick(term)}
                             style={{
                               backgroundColor: term.color || "#000",
                             }}
                           >
                             {isTermDown && (
                               <>
                                 <div className="flex justify-between header-term">

                                   <div className="number-term w-8 h-8 py-2 text-center text-white bg-black opacity-70">
                                     {rowIndex * 3 + index + 1}
                                   </div>
                                 </div>
                                 <h2 className="text-center text-white mt-6 h-44 text-xl px-2 term-title">
                                   {term.title}
                                 </h2>
                               </>
                             )}
 
                             {isTermUp && (
                               <>
                                 <h2 className="text-center text-white mt-6 h-44 text-xl px-2 term-title">
                                   {term.title}
                                 </h2>
                                 <div className="flex justify-between header-term">

                                   <div className="number-term w-8 h-8 py-2 mt-2 text-center text-white bg-black opacity-70">
                                     {rowIndex * 3 + index + 1}
                                   </div>
                                 </div>
                               </>
                             )}
 
                             
                             <div
                               className="term-border"
                               style={{
                                 position: "absolute",
                                 top: isTermDown ? "100%" : "-50%",
                                 width: 0,
                                 height: 0,
                                 borderLeft: "120px solid transparent",
                                 borderRight: "120px solid transparent",
                                 borderTop: isTermDown ? `120px solid ${term.color}` : "none",
                                 borderBottom: isTermUp ? `120px solid ${term.color}` : "none",
                                 opacity: 0.8,
                               }}
                             />
                           </div>
                         );
                       })}
                     </div>
                   );
                 })}
               </div>
 
               {/* Mobile Version */}
               <div className="terms-mobile mt-10 mb-10 space-y-10  flex flex-row justify-center sm:hidden">
   {category.terms.map((term, index) => {
     // تحديد إذا كان العنصر فردي أو زوجي
     const isTermDown = index % 2 === 0; // إذا كان العدد فردي سيكون isTermDown
     const isTermUp = index % 2 !== 0;  // إذا كان العدد زوجي سيكون isTermUp
 
     return (
       <div key={index} className={`${isTermDown ? 'term-down' : 'term-up'} w-60 h-60 cursor-pointer relative `}
         onClick={() => handleTermClick(term)}
         style={{
           backgroundColor: term.color || "#000",
         }}>
         
         {/* إذا كان فردي، يظهر isTermDown */}
         {isTermDown && (
           <>
             <div className="flex justify-between header-term">

               <div className="number-term w-8 h-8 py-2 text-center text-white bg-black opacity-70">
                 {index + 1}
               </div>
             </div>
             <h2 className="text-center text-white mt-6 h-44 text-xl px-2 term-title">
               {term.title}
             </h2>
           </>
         )}
 
         {/* إذا كان زوجي، يظهر isTermUp */}
         {isTermUp && (
           <>
             <h2 className="text-center text-white mt-6 h-44 text-xl px-2 term-title">
               {term.title}
             </h2>
             <div className="flex justify-between header-term">

               <div className="number-term w-8 h-8 py-2 mt-2 text-center text-white bg-black opacity-70">
                 {index + 1}
               </div>
             </div>
           </>
         )}
 
         {/* إضافة تأثير مثلث على حسب اللون */}
         <div
           className="term-border"
           style={{
             position: "absolute",
             top: isTermDown ? "100%" : "-50%",
             width: 0,
             height: 0,
             borderLeft: "120px solid transparent",
             borderRight: "120px solid transparent",
             borderTop: isTermDown ? `120px solid ${term.color}` : "none",
             borderBottom: isTermUp ? `120px solid ${term.color}` : "none",
             opacity: 0.8,
           }}
         />
       </div>
     );
   })}
 </div>
 
             </>
           )}
         </div>
       </section>
     </>
   );
 }
 
 
