import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function HeaderViewer() {
  const [profileImage, setProfileImage] = useState(null);

  // استخدام useRef للتحكم في العناصر
  const profileViewerRef = useRef(null);
  const changePasswordRef = useRef(null);

  // عرض وإخفاء نافذة الملف الشخصي
  const showProfilePopup = () => {
    profileViewerRef.current.style.display = "block";
  };

  const hideProfilePopup = () => {
    profileViewerRef.current.style.display = "none";
  };

  // عرض وإخفاء نافذة تغيير كلمة المرور
  const showPasswordPopup = () => {
    changePasswordRef.current.style.display = "block";
  };

  const hidePasswordPopup = () => {
    changePasswordRef.current.style.display = "none";
  };

  // تغيير صورة الملف الشخصي
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileImage(newImageURL);
    }
  };

  return (
    <header>
      
      <div className="header bg-header text-white flex justify-between relative">
        <div className="pr-6 mt-6 text-lg flex">
          <div
            onClick={showProfilePopup}
            className="profile w-10 h-10 text-center border border-white rounded-full mt-2 ml-4 overflow-hidden"
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <i style={{ marginTop: "5px" }} className="fa-regular fa-user text-3xl"></i>
            )}
          </div>
          <h1 className="text-up-profile">نظام متابعة تطبيق التعليم الإلكتروني</h1>
        </div>

        <div className="px-2 mt-6 text-lg">
          <h1>جامعة مؤتة :: نحو بيئة تعليمية أفضل</h1>
        </div>

        <div className="py-2 pl-6 text-md phone-and-email-header">
          <h1 style={{ direction: "ltr" }}>
            <i className="fa-solid fa-phone mr-2"></i>+(962)32372372380
          </h1>
          <h1 style={{ direction: "ltr" }} className="mt-2">
            <i className="fa-regular fa-envelope mr-2"></i>
            <a href="mailto:Elearn@mutah.edu.jo">Elearn@mutah.edu.jo</a>
          </h1>
        </div>
      </div>

      {/* نافذة الملف الشخصي */}
      <div ref={profileViewerRef} className="profile-viewer bg-white hidden">
        <i onClick={hideProfilePopup} className="fa-solid fa-xmark text-gray-400" />
        <div className="change-picture">
          <label className="cursor-pointer absolute bottom-1 right-1 p-2 rounded-full">
            <i title="إضافة صورة شخصية" className="fa-solid fa-pen" />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div
          style={{ marginRight: "40%" }}
          className="relative w-24 h-24 text-center border-2 border-gray-400 rounded-full mt-6 overflow-hidden"
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <i style={{ marginTop: "27px" }} className="fa-regular fa-user text-gray-400 text-7xl"></i>
          )}
        </div>
        <div className="mt-8 mr-4 text-gray-400">
          <h1 className="text-2xl">الصفة : مستخدم</h1>
          <h1 className="text-2xl mt-2">اسم المستخدم: 123456</h1>
        </div>
        <div className="mt-10 flex justify-around">
          <button
            onClick={showPasswordPopup}
            className="w-32 h-12 bg-header p-2 text-center text-white rounded-md hover:opacity-90 transition-opacity"
          >
            تغيير كلمة المرور
          </button>
          <button className="w-32 h-12 bg-header p-2 text-center text-white rounded-md hover:opacity-90 transition-opacity">
            <Link to="/">تسجيل الخروج</Link>
          </button>
        </div>
      </div>

      {/* نافذة تغيير كلمة المرور */}
      <div ref={changePasswordRef} className="change-password bg-white hidden">
        <form className="relative">
          <i onClick={hidePasswordPopup} className="fa-solid fa-xmark text-gray-400" />
          <input
            placeholder="كلمة السر القديمة"
            className="w-72 h-12 p-4 mt-12 border border-input outline-slate-400 rounded-lg"
            type="password"
          />
          <input
            placeholder="كلمة السر الجديدة"
            className="w-72 h-12 p-4 mt-8 border border-input outline-slate-400 rounded-lg"
            type="password"
          />
          <input
            placeholder="تأكيد كلمة السر الجديدة"
            className="w-72 h-12 p-4 mt-8 border border-input outline-slate-400 rounded-lg"
            type="password"
          />
          <button
            className="w-28 h-12 bg-header p-2 text-center text-xl text-white rounded-md mt-6 hover:opacity-90 transition-opacity"
          >
            تأكيد
          </button>
        </form>
      </div>
    </header>
  );
}
