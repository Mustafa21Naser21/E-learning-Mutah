import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './Header';

export default function AddTerm({ addTerm, currentCategory, setCurrentCategory }) {
  const location = useLocation();
  const navigate = useNavigate();

  // استخراج القيم المبدئية إذا كانت الصفحة في وضع التعديل
  const {
    isEdit,
    termTitle: initialTitle,
    termContent: initialContent,
    termDescription: initialDescription,
    attachments: initialAttachments,
    termColor: initialColor
  } = location.state || {};

  // حالات المكونات (States)
  const [termTitle, setTermTitle] = useState(initialTitle || "");
  const [termContent, setTermContent] = useState(initialContent || "");
  const [termDescription, setTermDescription] = useState(initialDescription || "");
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [termColor, setTermColor] = useState(initialColor || "#ffffff");
  const [attachments, setAttachments] = useState(initialAttachments || []);

  // معالجة إضافة أو تعديل البند
  const handleAddTerm = (e) => {
    e.preventDefault();

    // التحقق من القيم الفارغة
    if (termTitle.trim() === "" || termDescription.trim() === "" || termContent.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "يرجى إدخال جميع الحقول المطلوبة",
        showConfirmButton: true,
      });
      return;
    }

    // التحقق من تكرار العنوان
    const isDuplicate = currentCategory.terms.some(
      (term) => term.title.trim() === termTitle.trim() && (!isEdit || term.title !== initialTitle)
    );

    if (isDuplicate) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "عنوان البند موجود مسبقًا، يرجى اختيار عنوان آخر",
        showConfirmButton: true,
      });
      return;
    }

    // إنشاء البند الجديد
    const newTerm = {
      title: termTitle,
      content: termContent,
      description: termDescription,
      color: termColor,
      attachments,
    };

    // تحديث أو إضافة البند حسب الوضع
    const updatedCategory = isEdit
      ? {
          ...currentCategory,
          terms: currentCategory.terms.map((term) =>
            term.title === initialTitle ? newTerm : term
          ),
        }
      : {
          ...currentCategory,
          terms: [...currentCategory.terms, newTerm],
        };

    // حفظ التعديلات في التخزين المحلي
    localStorage.setItem(currentCategory.title, JSON.stringify(updatedCategory));

    // تحديث الحالة العامة
    setCurrentCategory(updatedCategory);

    // إظهار رسالة نجاح
    Swal.fire({
      position: "center",
      icon: "success",
      title: isEdit ? "تم تعديل البند بنجاح" : "تم إضافة البند بنجاح",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/categorytitleadmin", {
        state: {
          title: updatedCategory.title,
          description: updatedCategory.description,
          terms: updatedCategory.terms,
        },
      });
    });
  };

  // معالجة إضافة المرفقات
  const addAttached = () => {
    if (fileName && fileURL) {
      const newAttachment = { name: fileName, url: fileURL };
      setAttachments([...attachments, newAttachment]);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "تم اضافة المرفق بنجاح",
        showConfirmButton: false,
        timer: 2000
      });
      document.querySelector(".add-file").style.display = 'none';
      setFileName(""); 
      setFileURL(""); 
    } else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "يرجى إدخال اسم المرفق وتحميل الملف",
        showConfirmButton: true,
      });
    }
  };

  // عرض وإخفاء واجهة إضافة المرفقات
  const showFileInput = (e) => {
    e.preventDefault();
    document.querySelector(".add-file").style.display = 'block';
  };

  const hideFileInput = () => {
    document.querySelector(".add-file").style.display = 'none';
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileURL(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Header />
      <div className="back-home">
        <Link to="/homeadmin">
          <i className="fa-solid fa-house text-3xl cursor-pointer text-header" />
        </Link>
      </div>
      <section>
        <div className="add-term relative mt-20">
          <form onSubmit={handleAddTerm}>

            {/* إدخال عنوان البند */}
            <div className="block">
              <label className="text-4xl font-bold block mb-4" htmlFor="addCategory">عنوان البند:</label>
              <input
                id="addCategory"
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="text"
                maxLength={150}
                value={termTitle}
                onChange={(e) => setTermTitle(e.target.value)}
              />
            </div>

            {/* إدخال محتوى البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4" htmlFor="addContent">محتوى البند:</label>
              <input
                id="addContent"
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="text"
                value={termContent}
                onChange={(e) => setTermContent(e.target.value)}
              />
            </div>

            {/* إدخال شرح البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4" htmlFor="addDescription">شرح البند:</label>
              <input
                id="addDescription"
                className="w-72 h-32 p-4 border border-input outline-slate-400 rounded-lg"
                type="text"
                value={termDescription}
                onChange={(e) => setTermDescription(e.target.value)}
              />
            </div>

            {/* إدخال لون البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4">لون الأيقونة:</label>
              <input
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="color"
                value={termColor}
                onChange={(e) => setTermColor(e.target.value)}
              />
            </div>

             {/* إدخال مرفقات البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4">المرفقات والروابط:</label>
              <button onClick={showFileInput} className="w-64 h-16 mt-4 font-bold border-2 border-black text-4xl px-4 py-2 rounded-lg">
                <i className="fa-solid fa-plus px-2 ml-4 text-white bg-header rounded-full" />
                إضافة مرفق
              </button>
            </div>

            {/*  زر اضافة البند */}
            <div className="btn-add-term">
              <button
                type="submit"
                className="w-60 h-14 mb-10 mt-10 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
                {isEdit ? "تعديل البند" : "إضافة البند"}
                <i className="fa-solid fa-check border-2 border-white w-8 h-8 rounded-full text-xl"></i>
              </button>
            </div>
          </form>

          <div className="add-file bg-white hidden w-96 h-96 rounded-lg">
            <i onClick={hideFileInput} className="fa-solid fa-xmark cursor-pointer float-right p-4" />
            {/* إدخال اسم المرفق */}
            <div className="block mt-10">
              <label className="text-3xl font-bold block mb-4">اسم المرفق:</label>
              <input
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-xl"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            
            {/* اضافة مرفق   */}
            <div className="block mt-10">
              <label className="text-3xl font-bold block mb-4 cursor-pointer">
                <i className="fa-solid fa-file-arrow-up" /> تحميل المرفق:
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <input
                type="text"
                value={fileURL ? "تم تحميل الملف" : ""}
                readOnly
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-xl"
              />
            </div>
            <button onClick={addAttached} className="w-60 h-14 mt-10 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
              إضافة المرفق
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
