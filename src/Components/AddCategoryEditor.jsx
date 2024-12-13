import HeaderViewer from "./HeaderViewer";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";

export default function AddCategoryEditor({ categories = [], setCategories }) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [termColor, setTermColor] = useState("#A3BB10"); 
  const [categoryIndex, setCategoryIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { isEdit, categoryTitle: initialTitle, categoryDescription: initialDescription, index, categoryColor: initialColor } = location.state || {};

  useEffect(() => {
    if (isEdit) {
      setCategoryTitle(initialTitle || "");
      setCategoryDescription(initialDescription || "");
      setTermColor(initialColor || "#A3BB10"); 
      setCategoryIndex(index);
    }
  }, [isEdit, initialTitle, initialDescription, index, initialColor]);

  function handleSaveCategory(e) {
    e.preventDefault();
  
    if (categoryTitle.trim() === "" || categoryDescription.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "يرجى إدخال جميع الحقول المطلوبة",
        showConfirmButton: true,
      });
      return;
    }
  
    const newCategory = {
      title: categoryTitle,
      description: categoryDescription,
      color: termColor,
    };
  
    // جلب الفئات المخزنة من localStorage
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
  
    // إذا كانت في وضع تعديل، قم بتعديل الفئة في المصفوفة
    if (isEdit) {
      const updatedCategories = storedCategories.map((category, idx) =>
        idx === categoryIndex ? newCategory : category
      );
  
      // تخزين الفئات المعدلة في localStorage
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
  
      // تحديث الحالة في الصفحة
      setCategories(updatedCategories);
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم تعديل الفئة بنجاح",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/homeEditor");
      });
  
    } else {
      // تحقق إذا كانت الفئة بنفس العنوان موجودة بالفعل
      const isCategoryExist = storedCategories.some((category) => category.title === categoryTitle);
  
      if (isCategoryExist) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "عنوان البند موجود مسبقًا، يرجى اختيار عنوان آخر",
          showConfirmButton: true,
        });
        return;
      }
  
      // إضافة الفئة الجديدة إلى المصفوفة
      storedCategories.push(newCategory);
  
      // تخزين الفئات الجديدة في localStorage
      localStorage.setItem("categories", JSON.stringify(storedCategories));
  
      // تحديث الحالة في الصفحة
      setCategories(storedCategories);
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "تمت إضافة الفئة بنجاح",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/homeEditor");
      });
    }
  }
  



  return (
    <>
      <HeaderViewer />

      <div className="back-home ">
      <Link to="/homeEditor"><i className="fa-solid fa-house text-3xl cursor-pointer text-header"/></Link>
      </div>
  
      <section className="add-category-admin mt-20 mb-60 relative">

        <div className="block">
          <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4" htmlFor="addCategoryTitle">عنوان الفئة:</label>
          <input
            id="addCategoryTitle"
            maxLength={80}
            className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
            style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </div>


        <div className="block mt-10">
          <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4" htmlFor="addCategoryDescription">وصف الفئة:</label>
          <textarea
            id="addCategoryDescription"
            className="w-72 h-40 p-4 border border-input outline-slate-400 rounded-lg"
            style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>

        <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4 " htmlFor="addCategory"> لون الايقونة :</label>
              <input id="addCategory" style={{ width: '10%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg  cursor-pointer" type="color"
                value={termColor}
                onChange={(e) => setTermColor(e.target.value)}
              />
            </div>

        <div className="btn-add-category mt-10">
          <button
            onClick={handleSaveCategory}
            className="w-60 h-14 bg-header text-white text-4xl px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {categoryIndex !== null ? "تعديل الفئة" : "إضافة فئة"}
            <i className="fa-solid fa-check border-2 border-white w-8 h-8 rounded-full text-xl "></i>
          </button>
        </div>
      </section>
    </>
  );
}
