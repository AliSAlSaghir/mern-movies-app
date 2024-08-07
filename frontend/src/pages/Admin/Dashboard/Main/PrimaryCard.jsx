import { useGetAllUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useGetAllUsersQuery();

  return (
    <div className="w-[100%] h-[10%]  bg-[#282828] text-white rounded-lg p-1">
      <h2 className="pl-4 mb-3 text-xl font-bold">Congratulations!</h2>
      <p className="pl-3">
        You have {visitors?.users?.length} new users, watching your content.
      </p>
    </div>
  );
};

export default PrimaryCard;
