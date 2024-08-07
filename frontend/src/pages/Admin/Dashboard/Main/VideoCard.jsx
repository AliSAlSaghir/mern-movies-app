const VideoCard = ({ image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center w-[90%] mt-5">
        <div>
          <img
            src={`http://localhost:5000${image}`}
            alt="Card Image"
            className="h-[3rem]"
          />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="mb-3 text-gray-500">{date}</p>
        </div>

        <div className="flex items-center justify-end flex-grow mb-5">
          <div className="text-lg text-white">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
