import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agents from '../api/agents';

export const useActivities = () => {
  const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agents.get<Activity[]>('/activities');
      return response.data;
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agents.put('/activities', activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agents.post('/activities', activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agents.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { activities, isPending, updateActivity, createActivity, deleteActivity };
};
