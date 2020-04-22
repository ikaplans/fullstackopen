import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
      <div>
        {course.parts.map((x) => (
          <div key={x.id}>{`${x.name} ${x.exercises}`}</div>
        ))}
      </div>
      <b>{`total of ${course.parts.reduce(
        (acc, val) => acc + val.exercises,
        0
      )} exercises`}</b>
    </>
  );
};

export default Course;
