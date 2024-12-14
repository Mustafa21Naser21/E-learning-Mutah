import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import HeaderViewer from './Header';

export default function AddTermEditor({ addTerm, currentCategory, setCurrentCategory }) {
  const location = useLocation();
  const navigate = useNavigate();

  // استخلاص البيانات من الحالة السابقة إذا وجدت
  const {
    isEdit,
    termTitle: initialTitle,
    termContent: initialContent,
    termDescription: initialDescription,
    attachments: initialAttachments,
    termColor: initialColor
  } = location.state || {};

  // تعريف المتغيرات المحلية باستخدام useState
  const [termTitle, setTermTitle] = useState(initialTitle || "");
  const [termContent, setTermContent] = useState(initialContent || "");
  const [termDescription, setTermDescription] = useState(initialDescription || "");
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [termColor, setTermColor] = useState(initialColor || "#ffffff");
  const [attachments, setAttachments] = useState(initialAttachments || []);

  // الدالة لمعالجة إضافة البند
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

    // إنشاء أو تحديث البند
    const newTerm = {
      title: termTitle,
      content: termContent,
      description: termDescription,
      color: termColor,
      attachments,
    };

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

    // تحديث التخزين المحلي والحالة
    localStorage.setItem(currentCategory.title, JSON.stringify(updatedCategory));
    setCurrentCategory(updatedCategory);

    Swal.fire({
      position: "center",
      icon: "success",
      title: isEdit ? "تم تعديل البند بنجاح" : "تم إضافة البند بنجاح",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/categorytitleEditor", {
        state: {
          title: updatedCategory.title,
          description: updatedCategory.description,
          terms: updatedCategory.terms,
        },
      });
    });
  };

  // الدالة لإضافة مرفق جديد
  const addAttached = () => {
    if (fileName && fileURL) {
      const newAttachment = { name: fileName, url: fileURL };
      setAttachments([...attachments, newAttachment]);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "تم اضافة المرفق بنجاح",
        showConfirmButton: false,
        timer: 2000,
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

  // الدوال لإظهار وإخفاء مربع إدخال الملفات
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
      setFileURL(URL.createObjectURL(file)); // إنشاء رابط URL للملف للعرض
    }
  };

  return (
    <>
      <HeaderViewer />
      <div className="back-home">
        <Link to="/homeEditor">
          <i className="fa-solid fa-house text-3xl cursor-pointer text-header" />
        </Link>
      </div>
      <section>
        <div className="add-term relative mt-20">
          <form onSubmit={handleAddTerm}>
            {/* إدخال عنوان البند */}
            <div className="block">
              <label className="text-4xl font-bold block mb-4" htmlFor="termTitle">عنوان البند:</label>
              <input
                id="termTitle"
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="text"
                maxLength={150}
                value={termTitle}
                onChange={(e) => setTermTitle(e.target.value)}
              />
            </div>

            {/* إدخال محتوى البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4" htmlFor="termContent">محتوى البند:</label>
              <input
                id="termContent"
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="text"
                value={termContent}
                onChange={(e) => setTermContent(e.target.value)}
              />
            </div>

            {/* إدخال شرح البند */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4" htmlFor="termDescription">شرح البند:</label>
              <textarea
                id="termDescription"
                className="w-72 h-32 p-4 border border-input outline-slate-400 rounded-lg"
                value={termDescription}
                onChange={(e) => setTermDescription(e.target.value)}
              />
            </div>

            {/* اختيار اللون */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4" htmlFor="termColor">لون الايقونة:</label>
              <input
                id="termColor"
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg"
                type="color"
                value={termColor}
                onChange={(e) => setTermColor(e.target.value)}
              />
            </div>

            {/* المرفقات */}
            <div className="block mt-10">
              <label className="text-4xl font-bold block mb-4">المرفقات:</label>
              <button onClick={showFileInput} className='w-64 h-16 mt-4 font-bold border-2 border-black text-4xl px-4 py-2 rounded-lg'>
                <i className="fa-solid fa-plus px-2 ml-4 text-white bg-header rounded-full" /> اضافة مرفق
              </button>
            </div>

            {/* زر اضافة البند */}
            <div className="btn-add-term">
              <button type="submit" className="w-60 h-14 mb-10 mt-10 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
                {isEdit ? "تعديل البند" : "اضافة البند"}
                <i className="fa-solid fa-check border-2 border-white w-8 h-8 rounded-full text-xl"></i>
              </button>
            </div>
          </form>

          {/* مربع إضافة الملفات */}
          <div className="add-file bg-white hidden w-96 h-96 rounded-lg">
            <i onClick={hideFileInput} className="fa-solid fa-xmark" style={{ cursor: 'pointer', float: 'right', padding: '10px' }} />
            <div className="block mt-10">
              <label className="text-3xl font-bold block mb-4">اسم المرفق:</label>
              <input
                className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-xl"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            <div className="block relative mt-10">
              <label htmlFor="file-upload" className="text-3xl font-bold block mb-4 cursor-pointer">
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
                className="w-72 h-20 p-4 border border-input outline-slate-400 rounded-xl"
              />
            </div>
            <button onClick={addAttached} className="w-60 h-14 mb-2 mt-14 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
              اضافة المرفق
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

 

 
