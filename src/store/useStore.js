import { create } from "zustand";

const initialProjectInfo = () => ({
  projectName: "",
  chainId: "",
  tokenAddress: "",
  tokenDecimals: 18,
  tokenSymbol: "",
  officialWebsite: "",
  projectSocials: {
    twitter: "",
    telegram: "",
  },
  interactionHashtag: "",
  description: "",
  ranking: 0,
  actions: 0,
  burned: 0,
  avatar_preview: "",
  socialImage_preview: "",
  avatar: null,
  socialImage: null,
  burnThresholds: null,
  owner: "",
  joinedMembers: [],
  uniqueCode: "",
});

const useStore = create((set, get) => ({
  owner: null,
  editedProjectInfo: initialProjectInfo(),
  isJoined: false,
  joinedAddress: null,
  setOwer: (state) => set({ owner: state }),
  setEditedProjectInfo: (info) =>
    set({ editedProjectInfo: { ...get().editedProjectInfo, ...info } }),
  updateProjectInfoField: (field, value) => {
    if (["twitter", "telegram"].includes(field)) {
      set((state) => ({
        editedProjectInfo: {
          ...state.editedProjectInfo,
          projectSocials: {
            ...state.editedProjectInfo.projectSocials,
            [field]: value,
          },
        },
      }));
    } else {
      set((state) => ({
        editedProjectInfo: {
          ...state.editedProjectInfo,
          [field]: value,
        },
      }));
    }
  },

  resetEditedProjectInfo: () =>
    set({ editedProjectInfo: initialProjectInfo() }),
  setJoined: (isJoined) => set({ isJoined }),
  setJoinedAddress: (joinedAddress) => set({ joinedAddress }),
}));

export default useStore;
