import { useGetAllUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetAllUsersQuery();

  return (
    <div className="w-[14rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4 ml-[-3rem]">
      <h2 className="pl-12 mb-2 text-2xl font-bold">Realtime</h2>
      <p className="mb-2 text-gray-500 pl-14">Update Live</p>
      <div className="border-t border-[#666] my-4"></div>
      <h2 className="pl-20 mb-2 text-2xl font-bold">
        {visitors?.users?.length}
      </h2>
      <p className=" mb-2 ml-[4rem] text-gray-500">Subscribe</p>
      <hr />

      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
