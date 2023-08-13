import React,{useEffect } from 'react';
import Cardown from "./Usercoursebox"
import Coursedata from "./coursedata";



export default function ImgMediaCard() 
{
  function addcourse(course)
  { 
    return(
      <div style={{marginTop:"15px"}}>
      <Cardown
        id={course._id}
        key={course._id}
        title={course.title}
        description={course.description}
        price={course.price}
        img={course.image}
      />
      </div>
    )
  }


  const courseData = Coursedata();

  return <>{courseData && courseData.map(addcourse)}</>;
}