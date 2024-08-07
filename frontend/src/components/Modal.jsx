const Modal = ({ isOpen, onClose, children }) => {
  const handleBackdropClick = e => {
    e.stopPropagation(); // Prevent click inside the modal content from closing it
    onClose(); // Close the modal when clicking outside
  };

  const handleModalContentClick = e => {
    e.stopPropagation(); // Prevent the modal content click from closing the modal
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="absolute top-[30%] left-[15%] bg-white p-8 rounded-lg z-10 text-right h-[17rem]"
            onClick={handleModalContentClick}
          >
            <button
              className="absolute top-0 font-semibold text-black w-14 h-14 right-1 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              X
            </button>
            <div className="mt-[2rem] ">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
