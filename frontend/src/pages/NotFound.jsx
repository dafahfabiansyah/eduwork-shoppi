import { Link } from 'react-router-dom';
import { GiSkeletonInside } from 'react-icons/gi';
import errorGif from '../img/ueno404dribbble.gif';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <img src={errorGif} alt="Error GIF" /> */}
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="my-5 text-xl flex items-center">
        sorry, an expected error has occurred
        <GiSkeletonInside className="ml-2" />
      </p>
      <Link to="/">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
