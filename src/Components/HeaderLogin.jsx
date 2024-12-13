
export default function HeaderLogin() {

    return (
  
      <header>
          <div className="header  bg-header text-white flex  justify-between relaive">
  
          <div className="pr-6 mt-6 text-lg flex"> 
                  <h1 className="text-up-profile">نظام متابعة تطبيق التعليم الالكتروني</h1>
           </div>
  
              <div className="px-2 mt-6 text-lg">
                  <h1>جامعة مؤتة :: نحو بيئة تعليمية أفضل</h1>
              </div>
  
              <div className="py-2 pl-6 text-d phone-and-email-header">
                  <h1 style={{direction:'ltr'}}><i className="fa-solid fa-phone mr-2"></i>+(962)32372372380</h1>
                  <h1 style={{direction:'ltr'}} className="mt-2"><i className="fa-regular fa-envelope mr-2"></i><a href="mailto:Elearn@mutah.edu.jo">Elearn@mutah.edu.jo</a></h1>
              </div>
  
          </div>
      </header>
  
    )
  }