import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/Modal.jsx";
import GenreForm from "../../components/GenreForm.jsx";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
  useUpdateGenreMutation,
} from "../../redux/api/genres";

const GenreList = () => {
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { data: genres, refetch } = useGetAllGenresQuery();
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async e => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} genre created successfully`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async e => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        genre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} genre updated successfully`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} genre deleted successfully`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <div className="ml-[12rem] mt-[6rem] flex flex-col md:flex-row">
      <div className="p-3 md:w-3/4">
        <h1 className="h-12 text-3xl pb-[5rem] ml-2 ">Manage Genres</h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className="flex flex-wrap">
          {genres?.map(genre => (
            <div key={genre._id}>
              <button
                className="px-5 py-3 m-3 text-teal-500 bg-white border border-teal-500 rounded-lg hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={value => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
