import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function SectionPhotos() {
  return (
    <section>

      <div className="slide-img ">

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
                modules={[Autoplay,Pagination, Navigation]}
                className="mySwiper"
        >

          <SwiperSlide>
          <img style={{height:'80vh'}}  className="w-full" src="/src/images/slideimg1.jfif" alt="" />
          </SwiperSlide>

          <SwiperSlide>
          <img style={{height:'80vh'}}  className="w-full" src="/src/images/slideimg2.jfif" alt="" />
          </SwiperSlide>

          <SwiperSlide>
          <img style={{height:'80vh'}}  className="w-full" src="/src/images/slideimg3.jfif" alt="" />
          </SwiperSlide>

          <SwiperSlide>
          <img style={{height:'80vh'}}  className="w-full" src="/src/images/slideimg4.jfif" alt="" />
          </SwiperSlide>

        </Swiper>

        


      
      </div>

    </section>
  )
}
