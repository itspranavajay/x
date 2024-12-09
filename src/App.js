import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home";
import MyContextWraper from "./Context/Context";
import Signin from "./Pages/Auth/Signin";
import WriteForUs from "./Pages/WriteForUs/WriteForUs";
import Admin from "./Pages/Admin/Admin";
import AdminCreateCatogary from "./Pages/Admin/AdminCreateCatogary";
import AdminUnapprovedNews from "./Pages/Admin/AdminUnapprovedNews";
import AdminUpdateNews from "./Pages/Admin/AdminUpdateNews";
import CategoryNews from "./Pages/CategoryNews/CategoryNews";
import SingleNews from "./Pages/SingleNews/SingleNews";
import Contact from "./Components/ContactUs/Contact";
import AdminDailyThought from "./Pages/Admin/AdminDailyThought";
import SearchNews from "./Pages/SearchNews/SearchNews";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";

function App() {
  const [value, setValue] = useState('');
  return (
    <MyContextWraper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Signin />} />
        <Route path="/writeforus" element={<WriteForUs />} />
        <Route path="/category/:category" element={<CategoryNews />} />
        <Route path="/news/:newsId" element={<SingleNews />} />
        <Route path="/get-in-touch" element={<Contact />} />
        <Route path="/search" element={<SearchNews />} />
        <Route path="/adminonly" element={<Admin />} >
          <Route path="" element={<AdminCreateCatogary/>} />
          <Route path="createcategory" element={<AdminCreateCatogary/>} />
          <Route path="addthought" element={<AdminDailyThought/>} />
          <Route path="unapproved" element={<AdminUnapprovedNews/>} />
          <Route path="updatenews" element={<AdminUpdateNews/>} />
        </Route>
      </Routes>
    </MyContextWraper>
    // <ReactQuill theme="snow" value={value} onChange={setValue} />


  );
}

export default App;
