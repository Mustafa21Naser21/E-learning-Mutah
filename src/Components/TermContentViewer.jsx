

import HeaderViewer from "./HeaderViewer";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";


export default function TermContentViewer({ currentCategory, setCurrentCategory }) {
    const location = useLocation();
    const { termContent, termDescription, attachments = [] } = location.state || {};
    const [localAttachments, setLocalAttachments] = useState(attachments);
  
    return (
      <>
        <HeaderViewer />
  
        <div className="back-home">
          <Link to="/homeViewer">
            <i className="fa-solid fa-house text-3xl cursor-pointer text-header" />
          </Link>
        </div>
  
        <section>
          <div className="term-content">
            <div className="term-title mt-10">
              <div className="mt-10 px-10">
                <h1 className="text-5xl font-bold max-sm:text-4xl">البند :</h1>
                <h1 className="text-2xl mt-4 h-auto px-4 term-content">{termContent}</h1>
              </div>
              <div className="mt-10 px-10">
                <h1 className="text-5xl font-bold max-sm:text-4xl">ملخص البند:</h1>
                <h1 className="text-2xl mt-4 h-auto px-4 term-description">{termDescription}</h1>
              </div>
            </div>
  
            {/* عرض المرفقات */}

  {localAttachments.length > 0 ? (
    
  <div
    className="attachments mt-10 mb-10 grid gap-4"
    style={{
      gridTemplateColumns: `repeat(2, 1fr)`, 
      justifyContent: "space-between",
      justifyItems: "center",
    }}
  >
    {localAttachments.map((attachment, index) => (
      <div
        key={index}
        className={`attached mt-20 w-52 h-52 text-center text-white p-4 rounded-2xl relative max-sm:text-base max-sm:w-40 max-sm:h-40 ${
          index % 2 === 0 ? "bg-orange" : "bg-move"
        }`}
        style={{
          gridColumn: localAttachments.length % 2 !== 0 && index === localAttachments.length - 1 ? "1 / -1" : "auto",
        }}
      >
        <a
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
          style={{ textDecoration: "none" }}
          download={attachment.name}
        >
          <h1 className="attached-text text-2xl mb-2">{attachment.name}</h1>
        </a>
      
      </div>
    ))}
  </div>
) : (
  <div className="text-center mt-10">
    <h1 className="text-center mt-20 mb-20 text-3xl text-black font-bold">
      لا توجد مرفقات
    </h1>
  </div>
)}
          </div>
        </section>
      </>
    );
  }
  
