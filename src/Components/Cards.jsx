import React, { useState } from "react";
import Card from "./Card";

const Cards = (props) => {
    const courses = props.courses;
    const category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);

    console.log("Printing data:", courses);

    function getCourses() {
        if (!courses) return []; 

        if (category === "ALL") {
            let allCourses = [];
            Object.values(courses).forEach((array) => {
                array.forEach((courseData) => {
                    allCourses.push(courseData);
                });
            });
            return allCourses; 
        } else {
            return courses[category] || []; 
        }
    }

    const coursesToDisplay = getCourses();

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {coursesToDisplay.length === 0 ? (
                <p>No courses available in this category.</p> 
            ) : (
                coursesToDisplay.map((course) => (
                    <Card
                        key={course.id}
                        course={course}
                        likedCourses={likedCourses}
                        setLikedCourses={setLikedCourses}
                    />
                ))
            )}
        </div>
    );
};

export default Cards;
