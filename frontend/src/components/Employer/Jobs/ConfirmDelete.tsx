import { Fragment, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleted } from "../../../features/redux/slices/employer/employerJobsSlice";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      onConfirm();
      setTimeout(() => {
        dispatch(deleted());
        toast.success("Job deleted successfully");
      }, 1500);
      setTimeout(() => {
        onClose();
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to delete the job");
    }
  };

  return (
    <div
      className={` fixed z-20 top-0 left-0 w-full h-full  ${
        isOpen ? "show" : "hide"
      }`}
    >
      <div className="absolute top-[30%] left-[60%] bg-[#d8d8d8] p-5 rounded-lg w-[400px] max-w-[0.9]">
        <div className="flex p-4 gap-4">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Job
          </h3>
        </div>
        <div className="mb-5">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete the job? All of the data will be
            permanently removed. This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
