import { Route,BrowserRouter,Routes} from 'react-router-dom';
import './main.css';
import Login from './Components/Login';
import CategoryContentViewer from './Components/CategoryContentViewer';
import CategoryContentAdmin from './Components/CategoryContentAdmin';
import CategoryContentEditor from './Components/CategoryContentEditor';
import AddTerm from './Components/AddTerm';
import AddTermEditor from './Components/AddTermEditor';
import AddCategory from './Components/AddCategory';
import TermContent from './Components/TermContent';
import HomeViewer from './Components/HomeViewer';
import AddCategoryEditor from './Components/AddCategoryEditor';
import HomeAdmin from './Components/HomeAdmin';
import HomeEditor from './Components/HomeEditor';
import { useState } from 'react';
import TermContentEditor from './Components/TermConentEditor';
import TermContentViewer from './Components/TermContentViewer';




function App() {

  const [categories, setCategories] = useState([]);
  //const [terms, setTerms] = useState([]); // حالة لتخزين الفئات
  const [currentCategory, setCurrentCategory] = useState({
    title: "",
    content: "",
    description: "",
    terms: [],
    attachments: []
  });

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, { ...newCategory, terms: [] }]);
  };
 

  const addTerm = (newTerm) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) =>
        category.title === currentCategory.title
          ? { ...category, terms: [...(category.terms || []), newTerm] }
          : category
      );
  
      const updatedCategory = updatedCategories.find(
        (category) => category.title === currentCategory.title
      );
  
      // ضمان عدم وجود خصائص مفقودة في `currentCategory`
      setCurrentCategory({ ...updatedCategory, terms: updatedCategory.terms || [] });
  
      return updatedCategories;
    });
  };
  


  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' index element={<Login />}/>
      <Route path="/addcategory" element={<AddCategory addCategory={addCategory} setCategories={setCategories} />} />
      <Route path="/homeadmin" element={<HomeAdmin categories={categories} setCategories={setCategories} setCurrentCategory={setCurrentCategory}  />} /> 
      <Route path='/homeViewer' element={<HomeViewer categories={categories} setCategories={setCategories} setCurrentCategory={setCurrentCategory} />}/>
      <Route path='/homeEditor' element={<HomeEditor categories={categories} setCategories={setCategories} setCurrentCategory={setCurrentCategory}  />} />
      <Route path='/categorytitle' element={<CategoryContentViewer currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories} />}/>
      <Route path='/categorytitleadmin' element={<CategoryContentAdmin currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories} />} />
      <Route path='/addterm' element={<AddTerm addTerm={addTerm} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories}    />}/>
      <Route path='/termcontent' element={<TermContent currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />}/>
      <Route path='/termcontentEditor' element={<TermContentEditor currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}  />}/>
      <Route path='/termcontentViewer' element={<TermContentViewer  currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />}/>
      <Route path='/categorytitleEditor' element={<CategoryContentEditor currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories} />}/>
      <Route path='/addcategoryeditor' element={<AddCategoryEditor  addCategory={addCategory} setCategories={setCategories} />}/>
      <Route path='/addtermeditor' element={<AddTermEditor addTerm={addTerm} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories}    />} />


    </Routes>
    </BrowserRouter>




    </>
  )
}

export default App
