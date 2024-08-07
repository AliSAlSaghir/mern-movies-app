import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/users";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useProfileMutation();
  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 mt-[2rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-7">Update Profile</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block mb-2 text-white">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full p-4 rounded-sm form-input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-4 rounded-sm form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full p-4 rounded-sm form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-4 rounded-sm form-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Update
                </button>

                {isLoading && <Loader />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
