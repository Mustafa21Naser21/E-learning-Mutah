import { Link } from "react-router-dom";
import Footer from "./Footer";
import Swal from 'sweetalert2'
import HeaderLogin from "./HeaderLogin";

export default function Login() {

 function login(){


  Swal.fire({
    title:"تم تسجيل الدخول بنجاح",
    text: "",
    icon: "success"
  });

 }

  return (

    <>

    <HeaderLogin />

    <section className="flex justify-center ">
        <div style={{width:'500px',height:'500px',}} className="form bg-white border-2 border-slate-400 rounded-lg p-10 mt-40 mb-20   ">

            <div className="form-logo  px-10 text-center">
                <img className="w-28 mr-28" src="/src/images/mutah.png" alt="" />
                <h1 className="mt-4 text-2xl text-form font-bold ">E-Learning System</h1>

            </div>

            <div className="form-text px-10 mt-14">

               <form action="">
               <input style={{direction:'ltr'}} placeholder="Username"  className="w-72 h-12 p-4 border border-input outline-slate-400 rounded-lg mr-4 " type="text" />
                <input style={{direction:'ltr'}} placeholder="Password" className="w-72 h-12 p-4 border border-input rounded-lg outline-slate-400 mt-6 mr-4" type="password" />

                <button onClick={login} className="btn-form w-32 h-12 rounded-lg bg-header text-white text-lg px-4 py-2 mt-10 mr-24 hover:opacity-90 transition-opacity"><Link to='/homeadmin'>Log-in</Link></button>
               </form>

            </div>
            

        </div>
    </section>

  <Footer />
    
    </>

    

  )
}
