import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-lg text-gray-600 my-2">{description}</p>
    </div>
  );
};

export default Title;
