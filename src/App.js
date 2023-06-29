import { useEffect, useState } from "react";
import "./App.css";
import Categories from "./components/CategorySection";
import Header from "./components/Header";

function App() {
  const [categories, setcategories] = useState([]);
  const [loding, setloding] = useState(false);

  let fetchCategories = async () => {
    setloding(true);
    const fetchdata = await fetch(
      "https://api.chucknorris.io/jokes/categories"
    );
    const jsondata = await fetchdata.json();
    setloding(false);
    setcategories(jsondata);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loding ? (
        <div className="flex flex-col items-center justify-center  mt-10">
          {" "}
          <div class="lds-facebook w-full  ">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="  h-fit flex flex-col items-center justify-center">
          <Header />
          <Categories categories={categories} />
        </div>
      )}
    </>
  );
}

export default App;
