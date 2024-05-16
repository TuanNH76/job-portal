import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { updateUser } from "../../../features/axios/api/user/userDetails";

interface SkillUploadInterface {
  isOpen: boolean;
  onClose: () => void;
  setIsUploaded: () => void;
}

export default function AddKeySkillsModal({
  isOpen,
  onClose,
  setIsUploaded,
}: SkillUploadInterface) {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const user = useSelector((state: RootState) => state.userDetails.userDetails);

  useEffect(() => {
    if (isOpen) {
      setSkills(user?.skills || []);
    }
  }, [user, isOpen]);

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skill.trim() !== "" && !skills.includes(skill.trim())) {
      setSkills((prevSkills) => [...prevSkills, skill.trim()]);
      setSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSaveSkills = async () => {
    try {
      const payload = {
        skills: [...skills],
      };
      await updateUser(payload);
      setIsUploaded();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-[500px]">
        <div className="text-2xl mb-4 font-semibold text-gray-700">
          Add your key skills
        </div>
        <div>
          <input
            type="text"
            value={skill}
            onChange={handleSkillChange}
            placeholder="Type a skill..."
            className="mt-2 w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSkillAdd}
            className="mt-4 bg-purple-500 font-semibold text-white py-2 px-4 rounded shadow-sm hover:bg-purple-800 hover:shadow-xl"
          >
            Add Skill
          </button>
          <div className="flex flex-wrap mt-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center bg-teal-500 text-white rounded-full py-1.5 px-3 mr-2 mb-2"
              >
                <span className="mr-2">{skill}</span>
                <button onClick={() => handleSkillRemove(skill)}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCloseModal}
            className="mr-2 bg-red-500 text-white p-2 rounded"
          >
            Close
          </button>
          {skills.length > 0 && (
            <button
              onClick={handleSaveSkills}
              className="bg-purple-500 text-white p-2 rounded"
            >
              Save Skills
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
