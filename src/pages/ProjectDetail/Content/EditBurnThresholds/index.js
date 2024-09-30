import React, { useState, useEffect } from "react";
import Board from "../../../../components/Board";
import Button from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import SetProjectBUrnThresholdInput from "../../../../components/SetProjectBurnThresholdInput";
import ThresholdModal from "./ThresholdModal";
import { useProjectById } from "../../../../hooks/useProjectById";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../utils/axiosInstance";
import { toast } from "react-toastify";

const EditBurnThresholds = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useProjectById({ _id: projectId });
  const navigation = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [optionGroup, setOptionGroup] = useState({
    twitterThresholds: {
      likes: {
        title: "Likes",
        inline: "Likes",
        burnAmount: 5000,
        threshold: 200,
        show: true,
      },
      shares: {
        title: "Shares",
        inline: "Shares",
        burnAmount: 10000,
        threshold: 100,
        show: true,
      },
      comments: {
        title: "Comments",
        inline: "Comments",
        burnAmount: 2500,
        threshold: 50,
        show: true,
      },
      retweets: {
        title: "Retweets",
        inline: "Retweets",
        burnAmount: 7500,
        threshold: 100,
        show: true,
      },
    },
    takeoverThresholds: {
      holdersJoined: {
        title: "% of Holders Joined",
        inline: "% of holders have joined the Takeover",
        burnAmount: 10000,
        threshold: 20,
        show: true,
      },
    },
  });

  useEffect(() => {
    if (!isLoading) {
      let temp_obj = {
        ...optionGroup,
      };

      if (project?.twitterThresholds) {
        temp_obj.twitterThresholds = {
          ...temp_obj.twitterThresholds,
          ...Object.keys(project.twitterThresholds).reduce((acc, key) => {
            acc[key] = {
              ...temp_obj.twitterThresholds[key],
              ...project.twitterThresholds[key],
              // Ensure only burnAmount and threshold are updated
              burnAmount:
                project.twitterThresholds[key].burnAmount ||
                temp_obj.twitterThresholds[key].burnAmount,
              threshold:
                project.twitterThresholds[key].threshold ||
                temp_obj.twitterThresholds[key].threshold,
            };
            return acc;
          }, {}),
        };
      }

      if (project?.takeoverThresholds) {
        temp_obj.takeoverThresholds = {
          ...temp_obj.takeoverThresholds,
          ...Object.keys(project.takeoverThresholds).reduce((acc, key) => {
            acc[key] = {
              ...temp_obj.takeoverThresholds[key],
              ...project.takeoverThresholds[key],
              // Ensure only burnAmount and threshold are updated
              burnAmount:
                project.takeoverThresholds[key].burnAmount ||
                temp_obj.takeoverThresholds[key].burnAmount,
              threshold:
                project.takeoverThresholds[key].threshold ||
                temp_obj.takeoverThresholds[key].threshold,
            };
            return acc;
          }, {}),
        };
      }

      setOptionGroup(temp_obj);
    }
  }, [project, isLoading]);

  const UpdateMutation = useMutation({
    mutationFn: async (updatedProject) => {
      const response = await axiosInstance.put(
        `/projects/${projectId}`,
        updatedProject
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Updated burn thresholds Successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error("Update failed.");
    },
  });

  const handleChange = (e, platform, optionKey, field) => {
    const value = e.target.value;

    const updatedOption = {
      ...optionGroup[platform][optionKey],
      [field]: value,
    };

    setOptionGroup((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [optionKey]: updatedOption,
      },
    }));
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="flex w-full items-center justify-center py-6 text-red-500">
        Error loading project.
      </p>
    );

  return (
    <div className="flex min-h-screen w-11/12 flex-col md:w-[60%]">
      <Board>
        <div className="w-full p-6">
          <div className="flex py-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/set_project.svg`}
              alt="Burn"
            />
            <span className="pl-4 text-[22px]">
              Edit project burn thresholds{" "}
            </span>
          </div>

          {Object.keys(optionGroup.twitterThresholds).map((key) => {
            const option = optionGroup.twitterThresholds[key];
            return (
              option.show && (
                <div className="px-1.5 py-2 text-[12px] sm:py-4" key={key}>
                  <label className="text-[#56B0B9]">Twitter</label>
                  <div className="flex flex-col">
                    <div className="my-1 flex flex-col items-baseline justify-between rounded-[8px] bg-[#000000] bg-opacity-30 p-1 sm:flex-row sm:items-center">
                      <div className="flex pl-3">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/twitter.svg`}
                          alt="Twitter"
                        />
                        <span className="ml-3 text-[16px]">{option.title}</span>
                      </div>
                      <div className="w-full rounded-[8px] bg-[#000000] bg-opacity-60 p-4 sm:w-[60%]">
                        <span className="pr-1">Every</span>
                        <SetProjectBUrnThresholdInput
                          val={option.threshold}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "twitterThresholds",
                              key,
                              "threshold"
                            )
                          }
                        />
                        <span className="px-1">{option.inline},</span>
                        <span className="px-1 text-[#FF8A00]">burn</span>
                        <SetProjectBUrnThresholdInput
                          val={option.burnAmount}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "twitterThresholds",
                              key,
                              "burnAmount"
                            )
                          }
                        />
                        <span className="pl-1">tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}

          {Object.keys(optionGroup.takeoverThresholds).map((key) => {
            const option = optionGroup.takeoverThresholds[key];
            return (
              option.show && (
                <div className="px-1.5 py-2 text-[12px] sm:py-4" key={key}>
                  <label className="text-[#56B0B9]">TokenTakeover</label>
                  <div className="flex flex-col">
                    <div className="my-1 flex flex-col items-baseline justify-between rounded-[8px] bg-[#000000] bg-opacity-30 p-1 sm:flex-row sm:items-center">
                      <div className="flex pl-3">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/icons/logo_icon.svg`}
                          alt="TokenTakeover"
                          width="12%"
                          height="12%"
                        />
                        <span className="ml-3 text-[16px]">{option.title}</span>
                      </div>
                      <div className="w-full rounded-[8px] bg-[#000000] bg-opacity-60 p-4 sm:w-[60%]">
                        <span className="pr-1">Once</span>
                        <SetProjectBUrnThresholdInput
                          val={option.threshold}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "takeoverThresholds",
                              key,
                              "threshold"
                            )
                          }
                        />
                        <span className="px-1">{option.inline},</span>
                        <span className="px-1 text-[#FF8A00]">burn</span>
                        <SetProjectBUrnThresholdInput
                          val={option.burnAmount}
                          onChange={(e) =>
                            handleChange(
                              e,
                              "takeoverThresholds",
                              key,
                              "burnAmount"
                            )
                          }
                        />
                        <span className="pl-1">tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}

          <div className="mt-auto">
            <div className="mt-4 flex justify-between">
              <Button
                width="fit"
                label="Manage Thresholds"
                onClick={() => setShowModal(true)}
              />
              <Button
                width="fit"
                label="Update"
                onClick={() => {
                  UpdateMutation.mutate({
                    ...project,
                    ...optionGroup,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Board>

      <ThresholdModal
        showModal={showModal}
        setShowModal={setShowModal}
        optionGroup={optionGroup}
        setOptionGroup={setOptionGroup}
      />
    </div>
  );
};

export default EditBurnThresholds;
