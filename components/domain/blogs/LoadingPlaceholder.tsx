const LoadingPlaceholder = () => (
  <div className="animate-pulse rounded-md p-2 w-full mx-auto my-2">
    <div className="flex justify-between items-center">
      <div className="flex space-x-4 w-full">
        <div className="bg-gray-300 rounded-md h-[64px] w-[87px] ml-8"></div>
        <div className="flex-1 space-y-2 pl-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/4"></div>
          <div className="h-4 bg-gray-300 rounded w-2/5"></div>
        </div>
      </div>
      <div className="flex">
        <button className="bg-gray-300 w-16 rounded-2xl mr-2"></button>
        <button className="bg-gray-300 w-8 py-4 px-1 rounded-full"></button>
      </div>
    </div>
  </div>
);

export default LoadingPlaceholder;
