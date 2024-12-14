// مكون AddCategoryEditor: لإضافة أو تعديل فئات المحتوى
import HeaderViewer from "./HeaderViewer";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function AddCategoryEditor({ categories = [], setCategories }) {
  // حالات لتخزين بيانات الفئة
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [termColor, setTermColor] = useState("#A3BB10"); 
  const [categoryIndex, setCategoryIndex] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // استخراج البيانات الأولية عند تعديل فئة موجودة
  const {
    isEdit,
    categoryTitle: initialTitle,
    categoryDescription: initialDescription,
    index,
    categoryColor: initialColor
  } = location.state || {};

  // إعداد الحالات عند الدخول في وضع التعديل
  useEffect(() => {
    if (isEdit) {
      setCategoryTitle(initialTitle || "");
      setCategoryDescription(initialDescription || "");
      setTermColor(initialColor || "#A3BB10"); 
      setCategoryIndex(index);
    }
  }, [isEdit, initialTitle, initialDescription, index, initialColor]);

  // دالة اضافة الفئة
  function handleAddCategory(e) {
    e.preventDefault();

    // التحقق من إدخال جميع الحقول المطلوبة
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

    if (isEdit) {
      // تعديل الفئة إذا كانت موجودة
      const updatedCategories = storedCategories.map((category, idx) =>
        idx === categoryIndex ? newCategory : category
      );

      localStorage.setItem("categories", JSON.stringify(updatedCategories));
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
      // التحقق من وجود فئة بنفس العنوان
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

      // إضافة فئة جديدة
      storedCategories.push(newCategory);
      localStorage.setItem("categories", JSON.stringify(storedCategories));
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

      {/* زر العودة إلى الصفحة الرئيسية */}
      <div className="back-home">
        <Link to="/homeEditor">
          <i className="fa-solid fa-house text-3xl cursor-pointer text-header"/>
        </Link>
      </div>
  
      <section className="add-category-admin mt-20 mb-60 relative">
        {/* إدخال عنوان الفئة */}
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

        {/* إدخال وصف الفئة */}
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

        {/* اختيار لون الأيقونة */}
        <div className="block mt-10">
          <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4" htmlFor="addCategory">لون الأيقونة:</label>
          <input
            id="addCategory"
            style={{ width: '10%', marginLeft: '10%', marginRight: '10%' }}
            className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg cursor-pointer"
            type="color"
            value={termColor}
            onChange={(e) => setTermColor(e.target.value)}
          />
        </div>

        {/* زر الاضافة */}
        <div className="btn-add-category mt-10">
          <button
            onClick={handleAddCategory}
            className="w-60 h-14 bg-header text-white text-4xl px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {categoryIndex !== null ? "تعديل الفئة" : "إضافة فئة"}
            <i className="fa-solid fa-check border-2 border-white w-8 h-8 rounded-full text-xl"></i>
          </button>
        </div>
      </section>
    </>
  );
}
