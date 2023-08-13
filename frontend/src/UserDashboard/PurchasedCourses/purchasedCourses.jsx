import React,{useEffect } from 'react';
import Cardown from './PurchasCoursebox';
import Coursedata from './Purchasedcoursedata';



export default function purchasedCourses() 
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

  if (courseData === null) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return <>{courseData.purchasedCourses && courseData.purchasedCourses.map(addcourse)}</>;
}