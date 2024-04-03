import { useState,useEffect } from "react";
import './App.css';

function App() {
  const [sbrand, setBrand]=useState([]);
  const [page, setPage]=useState(0);
  const [loading,setloading]=useState(false);
  
  const getBrand=async()=>{
    setloading(true);
    fetch('https://dummyjson.com/products?limit=10')
    .then((res) => {return res.json()})
    .then(data=>{
      
      setBrand(data.products);
      console.log(sbrand);
      setloading(false);
      })
  };
      useEffect(()=>{
        getBrand();
      },[]);
  
      const handlePagination=async ()=>{
        setloading(true);
        fetch(`https://dummyjson.com/products?limit=10&skip=${page*10}`)
    .then((res) => {return res.json()})
    .then(data=>{
      
      setBrand(data.products);
      console.log(sbrand);
      setloading(false);
      })
      };

      useEffect(()=>{
        handlePagination();
      },[page]);

      function handlePrevPage(){
        if(page<=0){
          setPage(0);
        }
        else{
         setPage((prev)=>prev-1); 
        }
      }
  
      function handleNextPage(){
        if(page>=9){
          setPage(0);
        }else{
          setPage((prev)=>prev+1);
        }
      }
  return (
    <div className="flex flex-wrap w-4/5 mx-auto justify-center">{sbrand.map((list, index) => (
    <div className="rounded-md w-1/4 overflow-hidden shadow-md hover:shadow-lg mb-4" key={index}>
  <div className="relative">
    <img className="w-96 h-60" src={list.images[0]} alt="Product Image" />
    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
    </div>
  </div>
  <div className="p-4">
  <h2 className="font-bold text-lg">Rs.{list.price*290}</h2>
    <h3 className="text-lg font-medium mb-2">{list.title}</h3>
    <p className="text-gray-600 text-sm mb-4">{list.brand}</p>
    <div>
        <button className="bg-green-600 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded">
          Add to cart
        </button>
    </div>
  </div>
</div>
    ))}
    <div className="w-4/5 py-10 m-auto flex justify-between align-middle flex-wrap gap-10">
      <button className="primary bg-gray-200 p-2 rounded-lg hover:shadow-lg hover:bg-gray-300 disabled:opacity-50" onClick={handlePrevPage}>PREV</button>
      <span className="mx-auto">{page+1}of 10</span>
      <button className="primary bg-gray-200 p-2 rounded-lg hover:shadow-lg hover:bg-gray-300 disabled:opacity-50" onClick={handleNextPage}>NEXT</button>
    </div>
    </div>
  );
}

export default App;
