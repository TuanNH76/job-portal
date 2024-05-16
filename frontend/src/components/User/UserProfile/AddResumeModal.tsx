import React, { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { uploadResume } from "../../../features/axios/api/user/userDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddResumeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  setIsUploaded: () => void;
}

const AddResume: React.FC<AddResumeConfirmationProps> = ({
  isOpen,
  onClose,
  setIsUploaded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        setUploaded(true);
        await uploadResume(selectedFile).then(() => {
          setIsUploaded();
          setTimeout(() => {
            toast.success("Resume uploaded successfully");
          }, 2000);
          setTimeout(() => {
            setUploaded(false);
            onClose();
          }, 2000);
        });
      }
    } catch (error) {
      onClose();
      toast.error("Failed to upload the resume");
    }
  };

  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
        <div className="bg-white rounded-lg p-6 w-[500px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-700 flex items-center">
              Upload your resume
              <DocumentIcon className="text-purple-700 h-8 w-8 ml-4" />
            </h3>
            <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={onClose} />
          </div>
          <div className="mb-6">
            <form>
              <label className="relative cursor-pointer bg-red-200 hover:bg-red-300 py-2 px-4 rounded-md shadow-sm">
                <span className="text-black">Choose File</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
              {selectedFile && (
                <div className="flex items-center space-x-2 pt-4">
                  <DocumentIcon className="text-red-500 h-6 w-6" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </form>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outlined" color="red" onClick={onClose}>
              Close
            </Button>
            <Button color="purple" onClick={handleSubmit}>
              {uploaded ? <Spinner /> : "Upload"}
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer className="z-50" />
    </React.Fragment>
  );
};

export default AddResume;
