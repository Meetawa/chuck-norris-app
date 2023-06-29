import React, { useEffect, useState } from "react";

const CategorySection = ({ categories }) => {
  const [selected, setselected] = useState("");
  const [joke, setjoke] = useState("");
  const [id, setid] = useState(null);
  const [close, setclose] = useState(false);
  const [loding, setloding] = useState(false);

  const fetchjoke = async () => {
    setloding(true);
    const fetchdata = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${selected}`
    );
    const jsondata = await fetchdata.json();
    setloding(false);
    const jokes = jsondata.value;
    setjoke(jokes);
  };

  useEffect(() => {
    if (selected) {
      fetchjoke();
    }
  }, [selected]);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2  grid-cols-4   bg-transparent text-white text-lg   md:gap-y-3  md:w-fit">
        {categories.map((categorie, index) => (
          <div
            key={index}
            className={` shadow-xl w-16 h-6 md:w-60 md:h-40 bg-[#FFFFFF] text-center  m-3 rounded-md hover:border border-black capitalize text-white text-lg  
                        cursor-pointer ${
                          index == id && "bg-slate-400"
                        } md:p-3 `}
            onClick={() => {
              setselected(categorie);
              setid(index);
              setclose(false);
            }}
          >
            <h1 className=" text-blue-900 font-bold capitalize text-sm md:text-2xl md:pt-6">
              {categorie}
            </h1>
            <p className="capitalize text-purple-800 text-sm lg:block md:block hidden">
              unlimited jokes on {categorie}
            </p>
          </div>
        ))}
      </div>
      {selected && (
        <div
          className={`${
            !close
              ? "absolute shadow-2xl md:top-56  top-72 lg:rounded-md card p-5 lg:w-1/2 md:w-1/2"
              : "hidden"
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setclose(true);
              setid(null);
            }}
            className="h-6 w-6 float-right text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-center text-xl text-white font-bold">
            {" "}
            <span className=" block capitalize text-3xl text-white">
              {" "}
              {selected}{" "}
            </span>
          </h1>
          <div className="w-full border border-black m-auto mt-6 shadow-xl flex flex-col items-center justify-center">
            {loding ? (
              <div className="lds-roller items-center">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <p className="text-center font-semibold text-blue-100   font-sans  m-5 text-xl md:text-3xl">
                " {joke} "
              </p>
            )}
            <button
              className="px-4 py-2 bg-blue-700  my-2 mx-3 cursor-pointer lg:w-96 md:96  rounded-md hover:bg-blue-600 font-bold "
              onClick={() => {
                fetchjoke();
              }}
            >
              Next joke
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySection;
