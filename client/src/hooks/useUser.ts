import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "@/services/user.service.api";

export const useUser = () => {
  const getProfile = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      getProfile.refetch();
    },
  });

  const deleteProfile = useMutation({
    mutationFn: deleteUserProfile,
    onSuccess: () => {
      getProfile.refetch();
    },
  });

  return {
    getUserProfile: getProfile,
    updateUserProfile: updateProfile,
    deleteUserProfile: deleteProfile,
  };
};
