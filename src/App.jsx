import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Cards from './Components/Cards'
import Filter from './Components/Filter'
import { apiurl,filterData } from './data'
import { toast } from 'react-toastify'
import Spinner from './Components/Spiner'
function App() {

  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title)

  async function fetchData(params) {
    setLoading(true);
    try {
      let respons = await fetch(apiurl);
      let output = await respons.json();
      console.log(output.data);
      
      setCourses(output.data);
    } catch (error) {
      toast.error("Network Problem for API call")
    }
    setLoading(false);
  }

  useEffect(() =>{
    fetchData();
  },[])

  return (
   <div className='flex flex-col min-h-screen bg-gray-600'>
      <div className=''>
        <Navbar/>
      </div>
      <div className=' '>
        <div >
          <Filter filterData={filterData} category={category} setCategory={setCategory}/>
        </div>
        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
          {
            loading ?(<Spinner/>): (<Cards courses={courses} category={category} setCategory={setCategory}/>)
          }
        </div>
      </div>
      
   </div>
  )
}

export default App
