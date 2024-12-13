
export default function Footer() {
  return (

    <footer>

        <div style={{direction:'ltr'}} className="footer bg-footer text-white text-lg flex  justify-between mt-10">

            <div style={{width:'30%'}} className="logo-footer footer-content px-6  mt-10 mb-4 ml-8 ">
                <img className="w-36" src="/src/images/mutah.png" alt="" />
            </div>

            <div style={{width:'40%'}} className="contact-us footer-content  mb-4 ">
                <h2 className="text-2xl mt-10">Contact Us :</h2>
                <h2 className="mt-4"><i className="fa-solid fa-location-dot mr-2"></i>الكرك - الأردن - الرمز البريدي (61710) </h2>
                <h2 className="mt-4"><i className="fa-solid fa-phone mr-2"></i>+(962)32372372380</h2>
                <h2 className="mt-4"><i className="fa-regular fa-envelope mr-2"></i><a href="mailto:Elearn@mutah.edu.jo">Elearn@mutah.edu.jo</a></h2>
          </div>

            <div style={{width:'30%'}} className="follow-us footer-content px-6  mb-4 ">
                <h2  className="text-2xl mt-10 mb-4">Follow Us :</h2>
                <div className="flex gap-6">
                    <a href=""><img className="w-16" src="/src/images/facbook.png" alt="" /></a>
                    <a href=""><img className="w-16" src="/src/images/twiter.png" alt="" /></a>
                </div>

            </div>

        </div>

        <div style={{direction:'ltr'}} className="copy bg-copy text-center text-slate-400 flex justify-center p-4">
            <h1 className=""> Copyright © 2024 - Developed By : </h1>
            <h2 className="text-white font-bold  "> Saif Hammad , Mustafa Nasser</h2>
        </div>

    </footer>
  )
}


     

