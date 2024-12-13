import Footer from './Footer'
import HeaderViewer from './HeaderViewer'
import SectionPhotos from  './SectionPhotos'
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function getCategoryClass(index) {
  const classIndex = (index % 10) + 1; 
  return `add${classIndex}`;
}

export default function HomeViewer({ categories, setCategories, setCurrentCategory }) {
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  function handleCategoryClick(category) {
    // عند النقر على الفئة، نمرر البنود الخاصة بها فقط
    navigate('/categorytitle', {
      state: {
        title: category.title,
        description: category.description,
        terms: category.terms,  // إرسال البنود المرتبطة بالفئة
      },
    });
  }
  

  return (
    <>

    <HeaderViewer />
    <SectionPhotos />

    <section className="mb-10 mt-10">
         <div className="add-category mt-4 flex justify-between">
            <div className="right-category mt-8" style={{ width: '35%' }}>
              {categories.map((category, index) => (
                index % 2 === 0 && (
                  <div key={index}
                  onClick={() => handleCategoryClick(category)}                      
                       className={`add-right w-72 h-20 ${getCategoryClass(index)} mt-2 rounded-3xl mr-12 relative text-white text-center text-lg p-2 max-lg:text-base`}
                        style={{ backgroundColor: category.color || '#A3BB10',"--dynamic-color": category.color || '#A3BB10'}}>

                    <Link to='/categorytitle' state={{ title: category.title, description: category.description }}>
                      {category.title}
                    </Link>

                  </div>
                )
              ))}
            </div>
  
            <div className="center-category grid grid-cols-1 justify-items-center mb-20">
              <div style={{ width: '70%' }} className="mt-20 mb-4">
                <h1 className="text-3xl text-center">تقرير نماذج التعلم الالكتروني الكامل عن بعد والمدمج 2024</h1>
              </div>
              <div style={{ marginTop: '-4rem' }}>
                <img src="/src/images/packge-box.png" alt="" />
              </div>
            </div>
  
            <div className="left-category mt-8" style={{ width: '35%', marginLeft: '-5%' }}>
              {categories.map((category, index) => (
                index % 2 !== 0 && (
                  <div key={index}

                       className={`add-left w-72 h-20 ${getCategoryClass(index)} mt-2 mr-16 rounded-3xl relative text-white text-center text-lg p-2 max-lg:text-base`}
                       style={{ backgroundColor: category.color || '#A3BB10',"--dynamic-color": category.color || '#A3BB10' }}>

                    <Link to='/categorytitle' state={{ title: category.title, description: category.description }}>
                      {category.title}
                    </Link>

                  </div>
                )
              ))}
            </div>
          </div>

          <div className="add-category-mobile hidden mt-10 justify-between">
          <div className="text-center px-4 mb-20">
            <h1 className="text-3xl text-center">تقرير نماذج التعلم الالكتروني الكامل عن بعد والمدمج 2024</h1>
          </div>

          <div className='grid grid-cols-1'>
            {categories.map((category, index) => (
              index >= 0 && (
                <div key={index}
                     onClick={() => handleCategoryClick(category)}
                     className={`w-72 h-20 ${getCategoryClass(index)} mt-4 rounded-3xl relative text-white text-center text-lg p-2 max-lg:text-base`}
                     style={{ backgroundColor: category.color || '#A3BB10', "--dynamic-color": category.color || '#A3BB10' }}>
                  <Link to='/categorytitleEditor' state={{ title: category.title, description: category.description }}>
                    {category.title}
                  </Link>

                </div>
              )
            ))}
          </div>
        </div>
    </section>

    <Footer/>
    </>
  );
}

  

