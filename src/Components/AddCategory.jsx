import Header from "./Header";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function AddCategory({ categories = [], setCategories }) {
  // الحالة لإدارة المدخلات
  const [categoryTitle, setCategoryTitle] = useState(""); // عنوان الفئة
  const [categoryDescription, setCategoryDescription] = useState(""); // وصف الفئة
  const [termColor, setTermColor] = useState("#A3BB10"); // لون الفئة الافتراضي
  const [categoryIndex, setCategoryIndex] = useState(null); // موقع الفئة عند التعديل

  const navigate = useNavigate();
  const location = useLocation();

  // استخراج القيم من الحالة إذا كان تعديل (isEdit)
  const {
    isEdit,
    categoryTitle: initialTitle,
    categoryDescription: initialDescription,
    index,
    categoryColor: initialColor
  } = location.state || {};

  // إعداد الحقول عند التعديل
  useEffect(() => {
    if (isEdit) {
      setCategoryTitle(initialTitle || "");
      setCategoryDescription(initialDescription || "");
      setTermColor(initialColor || "#A3BB10");
      setCategoryIndex(index);
    }
  }, [isEdit, initialTitle, initialDescription, index, initialColor]);

  //     دالة اضافة الفئة
  function handleAddCategory(e) {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
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
      // تعديل الفئة الحالية
      const updatedCategories = storedCategories.map((category, idx) =>
        idx === categoryIndex ? newCategory : category
      );

      localStorage.setItem("categories", JSON.stringify(updatedCategories)); // تخزين الفئات المعدلة
      setCategories(updatedCategories); // تحديث الحالة

      Swal.fire({
        position: "center",
        icon: "success",
        title: "تم تعديل الفئة بنجاح",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/homeadmin"); // العودة للصفحة الرئيسية
      });
    } else {
      // تحقق من وجود الفئة بنفس العنوان مسبقًا
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

      // إضافة الفئة الجديدة
      storedCategories.push(newCategory);

      localStorage.setItem("categories", JSON.stringify(storedCategories)); // تخزين الفئات الجديدة
      setCategories(storedCategories); // تحديث الحالة

      Swal.fire({
        position: "center",
        icon: "success",
        title: "تمت إضافة الفئة بنجاح",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/homeadmin"); // العودة للصفحة الرئيسية
      });
    }
  }

  return (
    <>
      <Header />

      <div className="back-home">
        <Link to="/homeadmin">
          <i className="fa-solid fa-house text-3xl cursor-pointer text-header" />
        </Link>
      </div>

      <section className="add-category-admin mt-20 mb-60 relative">
        {/* إدخال عنوان الفئة */}
        <div className="block">
          <label className="text-4xl font-bold block mb-4" htmlFor="addCategoryTitle">
            عنوان الفئة:
          </label>
          <input
            id="addCategoryTitle"
            maxLength={80}
            className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
            style={{ width: '80%' }}
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </div>

        {/* إدخال وصف الفئة */}
        <div className="block mt-10">
          <label className="text-4xl font-bold block mb-4" htmlFor="addCategoryDescription">
            وصف الفئة:
          </label>
          <textarea
            id="addCategoryDescription"
            className="w-72 h-40 p-4 border border-input outline-slate-400 rounded-lg"
            style={{ width: '80%' }}
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>

        {/* إدخال لون الفئة */}
        <div className="block mt-10">
          <label className="text-4xl font-bold block mb-4" htmlFor="addCategory">
            لون الأيقونة:
          </label>
          <input
            id="addCategory"
            className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg cursor-pointer"
            style={{ width: '10%' }}
            type="color"
            value={termColor}
            onChange={(e) => setTermColor(e.target.value)}
          />
        </div>

        {/* زر اضافة */}
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

