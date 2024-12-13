import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import HeaderViewer from './Header';

export default function AddTermEditor({ addTerm, currentCategory, setCurrentCategory }) {
  const location = useLocation();
  const navigate = useNavigate();

  
  const { isEdit, termTitle: initialTitle, termContent: initialContent, termDescription: initialDescription, attachments: initialAttachments, termColor: initialColor } = location.state || {};

  const [termTitle, setTermTitle] = useState(initialTitle || "");
  const [termContent, setTermContent] = useState(initialContent || "");
  const [termDescription, setTermDescription] = useState(initialDescription || "");
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [termColor, setTermColor] = useState(initialColor || "#ffffff");
  const [attachments, setAttachments] = useState(initialAttachments || []);

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
  
    let updatedCategory;
    if (isEdit) {
      // تحديث البند في نفس مكانه
      updatedCategory = {
        ...currentCategory,
        terms: currentCategory.terms.map((term) =>
          term.title === initialTitle ? newTerm : term
        ),
      };
    } else {
      // إضافة البند الجديد
      updatedCategory = {
        ...currentCategory,
        terms: [...currentCategory.terms, newTerm],
      };
    }
  
    // حفظ الفئة في التخزين المحلي
    localStorage.setItem(currentCategory.title, JSON.stringify(updatedCategory));
  
    // تحديث الحالة
    setCurrentCategory(updatedCategory);
  
    // رسالة نجاح
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
  
  
 

  


  function addAttached() {
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
  }

  function showFileInput(e) {
    e.preventDefault();
    document.querySelector(".add-file").style.display = 'block';
  }

  function hideFileInput() {
    document.querySelector(".add-file").style.display = 'none';
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFileURL(URL.createObjectURL(file)); // إنشاء رابط URL للملف للعرض
    }
  }

  return (
    <>
      <HeaderViewer />
      <section>
        <div className="add-term relative mt-20">
          <form className="" action="" onSubmit={handleAddTerm}>
           
            <div className="block">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4 " htmlFor="addCategory">عنوان البند :</label>
              <input id="addCategory" style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg" type="text"
                 maxLength={150}  value={termTitle}
                onChange={(e) => setTermTitle(e.target.value)}
              />
            </div>

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4 " htmlFor="addCategory">محتوى البند :</label>
              <input id="addCategory" style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg" type="text"
                value={termContent}
                onChange={(e) => setTermContent(e.target.value)}
              />
            </div>

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4" htmlFor="">شرح البند :</label>
              <input style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-32 p-4 border border-input outline-slate-400 rounded-lg"
                value={termDescription}
                onChange={(e) => setTermDescription(e.target.value)}
              />
            </div>

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4" htmlFor=""> النسبة المئوية :</label>
              <input style={{ width: '10%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 text-center border border-input outline-slate-400 rounded-lg"
              value={'0%'} readOnly
              />
            </div>

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4 " htmlFor="addCategory"> لون الايقونة :</label>
              <input id="addCategory" style={{ width: '10%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg" type="color"
                value={termColor}
                onChange={(e) => setTermColor(e.target.value)}
              />
            </div>

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-4xl font-bold block mb-4 " htmlFor="addCategory">المرفقات و الروابط :</label>
              <button onClick={showFileInput} style={{ marginRight: '10%' }} className='w-64 h-16 mt-4 font-bold border-2 border-black text-4xl px-4 py-2 rounded-lg'>
                <i className="fa-solid fa-plus px-2 ml-4 text-white bg-header rounded-full" />اضافة مرفق
              </button>
            </div>

            <div className="btn-add-term">
              <button type="submit" className="w-60 h-14 mb-10 mt-10 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
              {isEdit ?"تعديل البند" : "اضافة البند"} 
                <i className="fa-solid fa-check border-2 border-white w-8 h-8 rounded-full text-xl "></i>
              </button>
            </div>
          </form>

          <div className="add-file bg-white hidden w-96 h-96 rounded-lg">
            <i onClick={hideFileInput} className="fa-solid fa-xmark" style={{ cursor: 'pointer', float: 'right', padding: '10px' }} />

            <div className="block mt-10">
              <label style={{ marginRight: '10%' }} className="text-3xl font-bold block mb-4">اسم المرفق :</label>
              <input style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }} className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-xl"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)} // المستخدم يدخل اسم المرفق
              />
            </div>

            <div className="block relative mt-10">
              <label htmlFor="file-upload" style={{ marginRight: '10%' }} className="text-3xl font-bold block mb-4 cursor-pointer">
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
                style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}
              />
            </div>

            <button style={{ marginRight: '25%' }} onClick={addAttached} className="w-60 h-14 mb-2 mt-14 bg-header border-2 border-gray-400 text-white text-4xl px-4 py-2 rounded-lg">
              اضافة المرفق
            </button>
          </div>
        </div>
      </section>
    </>
  );
}


 