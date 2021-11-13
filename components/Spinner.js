const Spinner = ({ className, ...props }) => {
  return (
    <div
      className={`flex items-center justify-center space-x-2 animate-pulse ${className}`}
    >
      <div>
        <div className="w-6 h-6 border-[3.5px] border-white border-dotted rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
