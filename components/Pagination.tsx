const PageNumber = ({ isActive = false, children }) => {
  return (
    <div
      className={`w-8 md:flex justify-center items-center hidden cursor-pointer leading-5 transition duration-150 ease-in rounded-full ${
        isActive ? "bg-primary text-white" : ""
      }`}
    >
      {children}
    </div>
  );
};

const Pagination = ({
  activePage,
  lastPage,
  onClickBack,
  onClick,
  onClickNext,
}: {
  activePage: number;
  lastPage: number;
  onClickBack: () => any;
  onClick: () => any;
  onClickNext: () => any;
}) => {
  return (
    <div className="flex flex-col items-center my-12">
      <style jsx>{`
        .circle {
          @apply h-8 w-8 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer;
        }
      `}</style>

      <div className="flex text-gray-700">
        <div
          className={`mr-1 circle ${activePage === 1 ? "opacity-20" : ""}`}
          onClick={() => {
            if (activePage === 1) return;
            onClickBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-4 h-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="flex h-8 font-medium rounded-full bg-gray-200">
          <PageNumber isActive={true}>{activePage}</PageNumber>
        </div>
        <div
          className={`ml-1 circle ${
            activePage === lastPage ? "opacity-20" : ""
          }`}
          onClick={() => {
            if (activePage === lastPage) return;
            onClickNext();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-4 h-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
