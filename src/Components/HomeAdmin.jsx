// استيراد المكتبات والمكونات اللازمة
import { useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import SectionPhotosAdmin from "./SectionPhotosAdmin";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// دالة لتحديد الفئة بناءً على الرقم لتغيير التنسيق الديناميكي
const getCategoryClass = (index) => `add${(index % 10) + 1}`;

export default function HomeAdmin({ categories, setCategories, setCurrentCategory }) {
    const navigate = useNavigate();

    // تحميل الفئات من التخزين المحلي عند أول تحميل للمكون
    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(storedCategories);
    }, []);

    // عند النقر على فئة، يتم إعدادها كالفئة الحالية وتخزينها في التخزين المحلي
    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        localStorage.setItem("currentCategory", JSON.stringify(category));
    };

    // التنقل إلى صفحة تعديل الفئة مع تمرير البيانات كـ state
    const handleEditCategory = (event, category, index) => {
        event.stopPropagation(); 
        navigate('/addcategory', {
            state: {
                isEdit: true,
                categoryTitle: category.title,
                categoryDescription: category.description,
                index,
                categoryColor: category.color
            }
        });
    };

    // حذف الفئة مع تأكيد المستخدم أولاً
    const deleteCategory = (event, index) => {
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
                    localStorage.setItem("categories", JSON.stringify(updatedCategories)); // تحديث التخزين المحلي
                    return updatedCategories;
                });

                Swal.fire({
                    title: "تم حذف الفئة بنجاح",
                    icon: "success",
                });
            }
        });
    };

    // التحقق من الحد الأقصى لعدد الفئات قبل إضافة فئة جديدة
    const limitCategory = (event) => {
        if (categories.length >= 10) {
            event.preventDefault();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "لا يمكن إضافة أكثر من 10 فئات",
                showConfirmButton: true,
            });
        } else {
            navigate("/addcategory");
        }
    };

   
    return (
        <>
            <Header />
            <SectionPhotosAdmin />
            <section className='mb-10'>

                {/* زر إضافة فئة جديدة */}
                <div className="flex justify-center mt-10">
                    <button onClick={limitCategory} className="btn-add w-40 h-16 bg-header text-white text-3xl rounded-lg hover:opacity-90 transition-opacity">
                        اضافة فئة
                    </button>
                </div>

                {/* عرض الفئات */}
                <div className="add-category mt-4 flex justify-between">

                    {/* الفئات على الجهة اليمنى */}
                    <div className="right-category mt-8" style={{ width: '35%' }}>
                        {categories.map((category, index) => (
                            index % 2 === 0 && (
                                <div
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`add-right w-72 h-20 ${getCategoryClass(index)} mt-2 rounded-3xl mr-12 relative text-white text-center text-lg p-2 max-lg:text-base`}
                                    style={{ backgroundColor: category.color || '#A3BB10' }}>
                                    <i onClick={(event) => deleteCategory(event, index)}
                                       className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                                    <Link to='/categorytitleadmin' state={{ title: category.title, description: category.description }}>
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

                    {/* الفئات على الجهة اليسرى */}
                    <div className="left-category mt-8" style={{ width: '35%', marginLeft: '-5%' }}>
                        {categories.map((category, index) => (
                            index % 2 !== 0 && (
                                <div
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`add-left w-72 h-20 ${getCategoryClass(index)} mt-2 mr-16 rounded-3xl relative text-white text-center text-lg p-2 max-lg:text-base`}
                                    style={{ backgroundColor: category.color || '#A3BB10' }}>
                                    <i onClick={(event) => deleteCategory(event, index)}
                                       className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                                    <Link to='/categorytitleadmin' state={{ title: category.title, description: category.description }}>
                                        {category.title}
                                    </Link>
                                    <i onClick={(event) => handleEditCategory(event, category, index)}
                                       className="fa-solid fa-pen-to-square modify-icon cursor-pointer" />
                                </div>
                            )
                        ))}
                    </div>

                </div>

                {/*  mobile version */}

                <div className="add-category-mobile hidden mt-10 justify-between">
                    <div className="text-center px-4 mb-20">
                        <h1 className="text-3xl text-center">تقرير نماذج التعلم الالكتروني الكامل عن بعد والمدمج 2024</h1>
                    </div>

                    <div className='grid grid-cols-1'>
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleCategoryClick(category)}
                                className={`w-72 h-20 ${getCategoryClass(index)} mt-4 rounded-3xl relative text-white text-center text-lg p-2 max-lg:text-base`}
                                style={{ backgroundColor: category.color || '#A3BB10' }}>
                                <i onClick={(event) => deleteCategory(event, index)}
                                   className="fa-solid fa-trash delete-icon cursor-pointer ml-4" />
                                <Link to='/categorytitleadmin' state={{ title: category.title, description: category.description }}>
                                    {category.title}
                                </Link>
                                <i onClick={(event) => handleEditCategory(event, category, index)}
                                   className="fa-solid fa-pen-to-square modify-icon cursor-pointer" />
                            </div>
                        ))}
                    </div>
                </div>

            </section>
            <Footer />
        </>
    );
};

