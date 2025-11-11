import React from "react";

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((__, index) => (
        <div key={index} className="flex  flex-col gap-4 bg-base-100 shadow-sm">
          <div className="skeleton h-52 w-full"></div>
          <div className="space-y-2 p-3">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="flex justify-end">
              <div className="skeleton h-7 w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
