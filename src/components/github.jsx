import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./github.css";

const GithubUserRepo=(q ="react", page=1 )=>{
 return (axios("https://api.github.com/search/repositories",{
 method:"GET",  
 params:{q:q,
  per_page:5,
 page,
}})

)}

 const Github = () => {
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [query,setQuery]=useState("react");
    const [data, setData]=useState([]);
    const [page,setPage]=useState(1);

useEffect(()=>{GithubUserRepo(query,page)
.then((res)=>
{ setLoading(false)
  setData(res.data)})
.catch((error)=>{setError(true)})
},[query,page])
const handleClick=(query)=>setQuery(query)




  return (
    <div>
         <div className='box1'>
        <button disabled={page===1} onClick={()=>setPage(page-1)}>PREV</button>
        <button onClick={()=>setPage(page+1)}>NEXT</button>
      </div>
        <img width="50px" src="https://avatars.dicebear.com/img/favicon.svg" alt='icon'/>
       
      <h2>Github Users</h2>
      {loading && <div>...loading</div>}
      <Searching handleClick={handleClick}/>
      {data?.items?.map((item)=><GithubrepoCard key={item.id} {...item}/>)}
     
    </div>
  )
}

const Searching=({handleClick})=>{
  const [text, setText]=useState("");
  return(
    <div>
      <input type="text" onChange={e=>setText(e.target.value)} />
    <button onClick={()=>{handleClick(text)}}>SEARCH</button>
    </div>
    
  )
}



const GithubrepoCard=({description,full_name})=>{
  return(
    <div className='box'>
  <div >Details:{description}</div>
   <div>Name:{full_name}</div>

    </div>
    
  )
}

export default Github