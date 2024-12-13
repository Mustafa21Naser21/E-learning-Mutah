
import Footer from './Footer'
import HeaderViewer from './HeaderViewer'
import SectionPhotos from  './SectionPhotos'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function getCategoryClass(index) {
    const classIndex = (index % 10) + 1; 
    return `add${classIndex}`;
}
export default function HomeEditor ({ categories, setCategories, setCurrentCategory }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  function handleCategoryClick(category) {
    setCurrentCategory(category);
    localStorage.setItem("currentCategory", JSON.stringify(category));
  }

  function handleEditCategory(event, category, index) {
    event.stopPropagation();
    navigate('/addcategoryeditor', {
      state: {
        isEdit: true,
        categoryTitle: category.title,
        categoryDescription: category.description,
        index: index,
        categoryColor: category.color
      }
    });
  }

  function deleteCategory(event, index) {
    event.stopPropagation();

    Swal.fire({
      title: "تنبيه",
      text: "سوف يتم حذف جميع البنود الخاصة في الفئة عند حذفها",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
      cancelButtonText: "تراجع",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories((prevCategories) => {
          const updatedCategories = prevCategories.filter((_, catIndex) => catIndex !== index);
          localStorage.setItem("categories", JSON.stringify(updatedCategories)); // تحديث localStorage
          return updatedCategories;
        });

        Swal.fire({
          title: "تم حذف الفئة بنجاح",
          icon: "success",
        });
      }
    });
  }

  function limitCategory(event) {
    if (categories.length >= 10) {
      event.preventDefault();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "لا يمكن إضافة أكثر من 10 فئات",
        showConfirmButton: true,
      });
    } else {
      navigate("/addcategoryeditor");
    }
  }

  return (
    <>
      <HeaderViewer />
      <SectionPhotos />
      <section className='mb-10'>
        <div className="flex justify-center mt-10">
          <button onClick={(event) => limitCategory(event)} className="btn-add w-40 h-16 bg-header text-white text-3xl rounded-lg hover:opacity-90 transition-opacity">
             اضافة فئة
          </button>
        </div>
        <div className="add-category mt-4 flex justify-between">
          <div className="right-category mt-8" style={{ width: '35%' }}>
            {categories.map((category,index) => (
              index % 2 === 0 && (
                <div key={index}
                     onClick={() => handleCategoryClick(category)}
                     className={`add-right w-72 h-20 ${getCategoryClass(index)} mt-2 rounded-3xl mr-12 relative text-white text-center text-lg p-2 max-lg:text-base`}
                     style={{ backgroundColor: category.color || '#A3BB10', "--dynamic-color": category.color || '#A3BB10' }}>
                  <i onClick={(event) => deleteCategory(event, index)}
                     className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                  <Link to='/categorytitleEditor' state={{ title: category.title, description: category.description }}>
                    {category.title}
                  </Link>
                  <i onClick={(event) => handleEditCategory(event, category, index)}
                     className="fa-solid fa-pen-to-square modify-icon cursor-pointer" />
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
            {categories.map((category,index) => (
              index % 2 !== 0 && (
                <div key={index}
                     onClick={() => handleCategoryClick(category)}
                     className={`add-left w-72 h-20 ${getCategoryClass(index)} mt-2 mr-16 rounded-3xl relative text-white text-center text-lg p-2 max-lg:text-base`}
                     style={{ backgroundColor: category.color || '#A3BB10', "--dynamic-color": category.color || '#A3BB10' }}>
                  <i onClick={(event) => deleteCategory(event, index)}
                     className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                  <Link to='/categorytitleEditor' state={{ title: category.title, description: category.description }}>
                    {category.title}
                  </Link>
                  <i onClick={(event) => handleEditCategory(event, category, index)}
                     className="fa-solid fa-pen-to-square modify-icon cursor-pointer" />
                </div>
              )
            ))}
          </div>
        </div>

{/* Mobile Version */}
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
                  <i onClick={(event) => deleteCategory(event, index)}
                     className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                  <Link to='/categorytitleEditor' state={{ title: category.title, description: category.description }}>
                    {category.title}
                  </Link>
                  <i onClick={(event) => handleEditCategory(event, category, index)}
                     className="fa-solid fa-pen-to-square modify-icon cursor-pointer" />
                </div>
              )
            ))}
          </div>
        </div>

      </section>
      <Footer />
    </>
  );
}

