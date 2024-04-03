import { Oval } from "react-loader-spinner";

const Loader = () => {

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50`}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10">
        <Oval
          visible={true}
          height={60}
          width={60}
          color="blue"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;
