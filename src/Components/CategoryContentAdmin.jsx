
import Header from './Header';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

// دالة لتحديد نوع البند بناءً على الفهرس
function getTermClass(index) {
  const cycle = Math.floor(index / 3) % 2; // تحديد الدورة كل 3 بنود
  return cycle === 0 ? 'term-down' : 'term-up';
}


export default function CategoryContentAdmin({ currentCategory = { terms: [] }, setCurrentCategory, setCategories }) {
  const navigate = useNavigate();
  const location = useLocation();

  // حالة الفئة
  const [category, setCategory] = useState({ ...currentCategory, terms: currentCategory?.terms || [] });

  const { termTitle, termContent, termDescription } = location.state || {};

  // تحميل الفئة من التخزين المحلي عند التغيير
  useEffect(() => {
    const storedCategory = JSON.parse(localStorage.getItem(currentCategory.title));
    if (storedCategory) {
      setCategory(storedCategory); // تعيين الفئة مع البنود المخزنة
      setCurrentCategory(storedCategory);
    }
  }, [currentCategory.title]);

  // إضافة بند جديد إذا تم تمريره من صفحة أخرى
  useEffect(() => {
    if (termTitle && termContent && termDescription) {
      const newTerm = { title: termTitle, content: termContent, description: termDescription };

      // تحقق من عدم وجود البند مسبقًا
      if (!category.terms.some(term => term.title === newTerm.title)) {
        const updatedCategory = { ...category, terms: [...category.terms, newTerm] };
        setCategory(updatedCategory);
        setCurrentCategory(updatedCategory);
        setCategories(prev => prev.map(cat => (cat.title === updatedCategory.title ? updatedCategory : cat)));
      }
    }
  }, [termTitle, termContent, termDescription]);

  // تحديث حالة الفئة عند تغيير الفئة الحالية
  useEffect(() => {
    setCategory(prev => ({ ...currentCategory, terms: currentCategory?.terms || prev.terms }));
  }, [currentCategory]);

  // التنقل لعرض تفاصيل البند
  function handleTermClick(term) {
    navigate('/termcontent', {
      state: {
        termTitle: term.title,
        termContent: term.content,
        termDescription: term.description,
        attachments: term.attachments || []
      }
    });
  }

  // تعديل البند
  function handleEditTerm(event, term) {
    event.stopPropagation();  
    navigate('/addterm', {
      state: {
        isEdit: true,
        termTitle: term.title,
        termContent: term.content,
        termDescription: term.description,
        attachments: term.attachments || [],
        termColor: term.color || "#ffffff"
      }
    });
  }

  // حذف البند
  function deleteTerm(event, termIndex) {
    event.stopPropagation();

    Swal.fire({
      title: "تنبيه",
      text: "سوف يتم حذف جميع المرفقات الخاصة في البند عند حذفها",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
      cancelButtonText: "تراجع",
    }).then((result) => {
      if (result.isConfirmed) {
        // حذف البند بناءً على الفهرس
        const updatedTerms = category.terms.filter((_, index) => index !== termIndex);
        const updatedCategory = { ...category, terms: updatedTerms };

        // تحديث الحالة
        setCategory(updatedCategory);
        setCurrentCategory(updatedCategory);

        // تحديث التخزين المحلي
        localStorage.setItem(updatedCategory.title, JSON.stringify(updatedCategory));

        Swal.fire({
          title: "تم حذف البند بنجاح",
          icon: "success",
        });
      }
    });
  }

  return (
    <>

      <Header />

      <div className="back-home">
        <Link to="/homeadmin">
          <i className="fa-solid fa-house text-3xl cursor-pointer text-header" />
        </Link>
      </div>

      <section>
        <div className="category-content relative">
          {/* عرض عنوان الفئة */}
          <div className="mt-10 px-10">
            <h1 className="text-5xl font-bold max-sm:text-4xl">عنوان الفئة:</h1>
            <h1 className="text-2xl h-auto mt-4 title-category">{category.title}</h1>
          </div>

          {/* عرض وصف الفئة */}
          <div className="mt-10 px-10">
            <h1 className="text-5xl font-bold max-sm:text-4xl">وصف الفئة:</h1>
            <h1 className="text-2xl h-auto mt-4 descrebtion-categoy">{category.description}</h1>
          </div>

          {/* عرض البنود */}
          <div className="mt-10 px-10">
            <h1 className="text-5xl font-bold max-sm:text-4xl">البنود:</h1>
          </div>

          {/* زر إضافة بند جديد */}
          <div className='flex justify-center mt-10'>
            <button className='btn-add w-40 h-16 bg-header text-white text-3xl rounded-lg hover:opacity-90 transition-opacity'>
              <Link to='/addterm'>اضافة بند</Link>
            </button>
          </div>

          {/* عرض البنود */}
          <div className="terms mt-10 mb-10 space-y-10">
            {category.terms.length === 0 ? (
              <div className="text-center mt-20 mb-20 text-3xl text-black font-bold">لا توجد بنود</div>
            ) : (
              // ترتيب البنود في صفوف
              Array.from({ length: Math.ceil(category.terms.length / 3) }).map((_, rowIndex) => {
                const rowItems = category.terms.slice(rowIndex * 3, rowIndex * 3 + 3);

                const rowClassName =
                  rowItems.length === 1
                    ? "flex justify-center"
                    : rowItems.length === 2
                    ? "flex justify-around"
                    : "grid grid-cols-3 justify-items-center";

                return (
                  <div key={rowIndex} className={`${rowClassName} w-full`}>
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
                                <div className="icon-term text-white mt-2 mr-2">
                                  <i
                                    onClick={(event) => deleteTerm(event, rowIndex * 3 + index)}
                                    className="fa-solid fa-trash cursor-pointer ml-4"
                                  />
                                  <i
                                    onClick={(event) => handleEditTerm(event, term)}
                                    className="fa-solid fa-pen-to-square cursor-pointer"
                                  />
                                </div>
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
                                <div className="icon-term text-white mt-2 mr-2">
                                  <i
                                    onClick={(event) => deleteTerm(event, rowIndex * 3 + index)}
                                    className="fa-solid fa-trash cursor-pointer ml-4"
                                  />
                                  <i
                                    onClick={(event) => handleEditTerm(event, term)}
                                    className="fa-solid fa-pen-to-square cursor-pointer"
                                  />
                                </div>
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
                              top: isTermDown ? `100%` : "-50%",
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
              })
            )}
          </div>

          {/* نسخة الجوال من البنود */}
          <div className="terms-mobile mt-10 mb-10 space-y-10 flex flex-row justify-center sm:hidden">
            {category.terms.map((term, index) => {
              const isTermDown = index % 2 === 0; // إذا كان العدد فردي سيكون isTermDown
              const isTermUp = index % 2 !== 0; // إذا كان العدد زوجي سيكون isTermUp

              return (
                <div
                  key={index}
                  className={`${isTermDown ? 'term-down' : 'term-up'} w-60 h-60 cursor-pointer relative`}
                  onClick={() => handleTermClick(term)}
                  style={{
                    backgroundColor: term.color || "#000",
                  }}
                >
                  {isTermDown && (
                    <>
                      <div className="flex justify-between header-term">
                        <div className="icon-term text-white mt-2 mr-2">
                          <i
                            onClick={(event) => deleteTerm(event, index)}
                            className="fa-solid fa-trash cursor-pointer ml-4"
                          />
                          <i
                            onClick={(event) => handleEditTerm(event, term)}
                            className="fa-solid fa-pen-to-square cursor-pointer"
                          />
                        </div>
                        <div className="number-term w-8 h-8 py-2 text-center text-white bg-black opacity-70">
                          {index + 1}
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
                        <div className="icon-term text-white mt-2 mr-2">
                          <i
                            onClick={(event) => deleteTerm(event, index)}
                            className="fa-solid fa-trash cursor-pointer ml-4"
                          />
                          <i
                            onClick={(event) => handleEditTerm(event, term)}
                            className="fa-solid fa-pen-to-square cursor-pointer"
                          />
                        </div>
                        <div className="number-term w-8 h-8 py-2 mt-2 text-center text-white bg-black opacity-70">
                          {index + 1}
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
        </div>
      </section>
    </>
  );
}
