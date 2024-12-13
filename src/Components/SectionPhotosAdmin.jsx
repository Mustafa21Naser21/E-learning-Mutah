import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar,Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import Swal from 'sweetalert2';

export default function SectionPhotos() {
  const [images, setImages] = useState([
    "/src/images/slideimg1.jfif",
    "/src/images/slideimg2.jfif",
    "/src/images/slideimg3.jfif",
    "/src/images/slideimg4.jfif",
  ]);

  // دالة لإظهار نافذة إضافة الصورة
  function show() {
    document.querySelector(".add-picture").style.display = "block";
  }

  // دالة لإخفاء نافذة إضافة الصورة
  function hidden() {
    document.querySelector(".add-picture").style.display = "none";
  }

  // دالة لإضافة صورة جديدة إلى السلايدر الأول
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setImages([...images, newImageURL]);
    }
  }

  // دالة لحذف صورة معينة بناءً على الفهرس
  function removeImage(index) {
    Swal.fire({
        title: "تنبيه",
        text: "هل انت متأكد من حذف الصورة",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "حذف",
        cancelButtonText: "تراجع"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "تم الحذف بنجاح",
            text: "تم",
            icon: "success"
          });
          setImages(images.filter((_, imgIndex) => imgIndex !== index));v
        }
      });
    
  }

  return (
    <section>
      <div className="slide-img relative ">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                style={{ height: "80vh" }}
                className="w-full"
                src={src}
                alt={`slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div onClick={show} className="icon-add-picture z-50 cursor-pointer">
          <i className="fa-solid fa-image text-gray-400 text-3xl" />
        </div>

        <div
          style={{ width: "50%" }}
          className="add-picture hidden h-64 absolute left-1/4 top-1/4 bg-white z-50 rounded-md"
        >
          <i
            onClick={hidden}
            className="fa-solid fa-xmark text-gray-400 mt-2 mr-2 cursor-pointer"
          />

          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            freeMode={true} // تفعيل التمرير الحر
            scrollbar={{
             hide: true, // إظهار شريط التمرير
            draggable: true, // تمكين السحب على شريط التمرير
           }}
            modules={[Scrollbar, Pagination]}
            className="mySwiper mt-8"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <img
                    style={{ height: "150px",width:'180px', objectFit: "cover", }}
                    
                    src={src}
                    alt={`slide ${index + 1}`}
                  />
                  <i
                    onClick={() => removeImage(index)}
                    className="fa-solid fa-trash delete-icon cursor-pointer absolute top-0 right-0 m-2 text-red-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* زر اختيار صورة من الجهاز */}
          <label className="cursor-pointer">
            <i title="اضافة صورة" className="fa-solid fa-plus text-3xl cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
