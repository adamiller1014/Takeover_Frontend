import React, { useState } from "react";
import Board from "../../../components/Board";
import Button from "../../../components/Button";
import FileUpload from "../../../components/FileUpload";
import AvatarWithChangeButton from "../../../components/AvatarChange";
import useStore from "../../../store/useStore";
import { InputBox, InputText } from "../../../components/InputBox";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for toast messages
import { useNavigate } from "react-router-dom";

const SetProject = () => {
  const navigate = useNavigate();
  const editedProjectInfo = useStore((state) => state.editedProjectInfo);
  const updateProjectInfoField = useStore(
    (state) => state.updateProjectInfoField
  );

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (e) => {
    updateProjectInfoField(field, e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear error when user starts typing
  };

  const validateFields = () => {
    const newErrors = {};

    if (!editedProjectInfo.projectName) {
      newErrors.projectName = "Project name is required";
    }

    if (!editedProjectInfo.tokenSymbol) {
      newErrors.tokenSymbol = "Project symbol is required";
    }

    if (!editedProjectInfo.officialWebsite) {
      newErrors.officialWebsite = "Official project website is required";
    }

    if (!editedProjectInfo.interactionHashtag) {
      newErrors.interactionHashtag = "Interaction hashtag is required";
    }

    if (!editedProjectInfo.projectSocials.twitter) {
      newErrors.twitter = "Official project Twitter is required";
    }

    if (!editedProjectInfo.projectSocials.telegram) {
      newErrors.telegram = "Official project Telegram is required";
    }

    if (!editedProjectInfo.description) {
      newErrors.description = "Project description is required";
    }

    if (!editedProjectInfo.avatar) {
      newErrors.avatar = "Project avatar is required";
    }

    if (!editedProjectInfo.socialImage) {
      newErrors.socialImage = "Social share image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      navigate("/takeover/verify_project");
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  return (
    <div
      className="flex w-full items-center justify-center pt-10 text-white"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/admin_bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Board className="mt-[50px] h-[calc(100vh-200px)] w-[76%] overflow-auto sm:w-[60%] md:w-[56%] lg:w-[52%]">
        <div className="p-6">
          <div className="flex py-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/set_project.svg`}
              alt="success"
            />
            <span className="pl-4 text-[22px]">Set the project metadata</span>
          </div>

          <div className="flex flex-col pl-5 pr-5 md:pl-10">
            <div className="border-b border-[#56B0B9] pb-2 md:pb-5">
              <InputBox label="Project name">
                <InputText
                  value={editedProjectInfo.projectName}
                  placeholder="your project name"
                  onChange={handleInputChange("projectName")}
                  error={errors.projectName}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox
                label="Project symbol"
                placeholder="your project symbol"
              >
                <InputText
                  value={editedProjectInfo.tokenSymbol}
                  onChange={handleInputChange("tokenSymbol")}
                  error={errors.tokenSymbol}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Official project website">
                <InputText
                  value={editedProjectInfo.officialWebsite}
                  placeholder="example.com"
                  onChange={handleInputChange("officialWebsite")}
                  error={errors.officialWebsite}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Interaction hashtag">
                <InputText
                  value={editedProjectInfo.interactionHashtag}
                  placeholder="#"
                  onChange={handleInputChange("interactionHashtag")}
                  error={errors.interactionHashtag}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Official project Twitter">
                <InputText
                  value={editedProjectInfo.projectSocials.twitter}
                  onChange={handleInputChange("twitter")}
                  error={errors.twitter}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Official project Telegram">
                <InputText
                  value={editedProjectInfo.projectSocials.telegram}
                  onChange={handleInputChange("telegram")}
                  error={errors.telegram}
                />
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Project description">
                <div className="flex w-[98%] flex-col lg:w-[65%]">
                  <textarea
                    className={`rounded-md border ${
                      errors.description ? "border-red-500" : "border-[#047857]"
                    } bg-[#111827] px-[13px] py-2`}
                    value={editedProjectInfo.description}
                    onChange={handleInputChange("description")}
                    placeholder=""
                  />
                  {errors.description && (
                    <span className="mt-1 text-sm text-red-500">
                      {errors.description}
                    </span>
                  )}
                  <span className="text-[#56B0B9]">
                    Shows when project is shared through social channels.
                  </span>
                </div>
              </InputBox>
            </div>
            <div className="border-b border-[#56B0B9] py-2 md:py-5">
              <InputBox label="Project avatar">
                <AvatarWithChangeButton
                  initialAvatar={
                    editedProjectInfo.avatar_preview ||
                    `${process.env.PUBLIC_URL}/assets/icons/Avatar.png`
                  }
                  onAvatarChange={(avatar, file) => {
                    updateProjectInfoField("avatar_preview", avatar);
                    updateProjectInfoField("avatar", file);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      avatar: "",
                    }));
                  }}
                />
                {errors.avatar && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.avatar}
                  </span>
                )}
              </InputBox>
            </div>
            <InputBox label="Social share image">
              <div className="w-[98%] md:w-[60%]">
                <FileUpload
                  initialImage={editedProjectInfo.socialImage_preview || null}
                  onFileUpload={(image, file) => {
                    updateProjectInfoField("socialImage_preview", image);
                    updateProjectInfoField("socialImage", file);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      socialImage: "",
                    }));
                  }}
                />
                {errors.socialImage && (
                  <span className="mt-1 flex text-sm text-red-500">
                    {errors.socialImage}
                  </span>
                )}
                <span className="text-[#56B0B9]">
                  Must include TokenTakeover branding and not include profanity,
                  nudity, drug or gun use. Violations will result in project
                  removal, <b>download template</b>.{" "}
                </span>
              </div>
            </InputBox>
            <div className="mt-4 flex justify-end">
              <Button
                width="fit"
                label={"Project dashboard"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Board>
    </div>
  );
};

export default SetProject;
