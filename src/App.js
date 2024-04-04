import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setPhoto] = useState([]);
  console.log(images);
  
  
  const [sbrand, setsBrand] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setloading] = useState(false);

  const getBrand = () => {
    setloading(true);
    fetch('https://dummyjson.com/products?limit=10')
      .then((res) => { return res.json() })
      .then(data => {

        setsBrand(data.products);
        console.log(sbrand);
        setloading(false);
      })
  };
  useEffect(() => {
    getBrand();
  }, []);

  const handlePagination = () => {
    setloading(true);
    fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`)
      .then((res) => { return res.json() })
      .then(data => {

        setsBrand(data.products);
        setloading(false);
      })
  };

  useEffect(() => {
    handlePagination();
  }, [page]);

  function handlePrevPage() {
    if (page <= 0) {
      setPage(0);
    }
    else {
      setPage((prev) => prev - 1);
    }
  }

  function handleNextPage() {
    if (page >= 9) {
      setPage(0);
    } else {
      setPage((prev) => prev + 1);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(price==''&title==''&brand==''&images==''){
      window.alert('Please fill all fields')
    }
    else{
    console.log(price,title,brand,images);
    fetch('https://dummyjson.com/products/add', {
  method: 'POST', /* or PATCH */
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    price,title,brand,images
  })
})
.then(res => res.json())
.then(data=>setBrand(sbrand.push(data)));
console.log(sbrand);
setPhoto([]);
}};
  useEffect(() => {
    getBrand();
  }, []);

  
  return (
    <>
      <div className="mb-10">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product Price: </label>
            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product Title: </label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="mb-5">
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product brand</label>
            <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setBrand(e.target.value)}/>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-black dark:text-black" htmlFor="file_input">Upload file</label>
            <input className="block w-full text-sm text-gray-900  rounded-lg p-2 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" required onChange={(e) => images.push(e.target.files[0].name)}/>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
  
  {loading? ('...') : (
      
      <div className="flex flex-wrap w-4/5 mx-auto">
        {sbrand?.map((list, index) => { 
        return (
        <>
        <div className="w-1/5 overflow-hidden border" key={index}>
          <div className="relative ">
            <img className="w-auto h-32 mx-auto" src={list.images[0]} alt="Product Image" />
          </div>
          <div className="p-4 stretch flex flex-col">
            <h2 className="font-bold text-lg text-red-300 mb-2">Rs.{list.price * 290}</h2>
            <div className="h-24"><h3 className="text-lg font-medium">{list.title}</h3>
            <p className="text-gray-600 text-sm mb-8">{list.brand}</p>
            </div>
            </div>
            <div className="flex px-4 mb-5">
              <button className=" bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add to cart
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white ml-2 font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </>
      );
      })}
    
    
        <div className="w-4/5 py-10 m-auto flex justify-between align-middle  gap-10">
          <button className="primary bg-gray-200 p-2 rounded-lg hover:shadow-lg hover:bg-gray-300 disabled:opacity-50" onClick={handlePrevPage}>PREV</button>
          <span className="mx-auto">{page + 1}of 10</span>
          <button className="primary bg-gray-200 p-2 rounded-lg hover:shadow-lg hover:bg-gray-300 disabled:opacity-50" onClick={handleNextPage}>NEXT</button>
        </div>
    </div>
  
    )
  }
  </>
  );
  
}
    
      

export default App;
