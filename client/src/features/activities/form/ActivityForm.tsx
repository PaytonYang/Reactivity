import { Box, Button, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
  activity: Activity | undefined;
  closeForm: () => void;
};

export default function ActivityForm({ activity, closeForm }: Props) {
  const { updateActivity, createActivity } = useActivities();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const activityData: Activity = {
      id: activity?.id || crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      date: formData.get('date') as string,
      city: formData.get('city') as string,
      venue: formData.get('venue') as string,
      isCancelled: false,
      latitude: 0,
      longitude: 0,
    };

    if (activity) {
      await updateActivity.mutateAsync(activityData);
      closeForm();
    } else {
      await createActivity.mutateAsync(activityData);
      closeForm();
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit Activity' : 'Create Activity'}
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={3} onSubmit={handleSubmit}>
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField name="description" label="Description" multiline rows={3} defaultValue={activity?.description} />
        <TextField name="category" label="Category" defaultValue={activity?.category} />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" gap={3} justifyContent="flex-end">
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success" disabled={updateActivity.isPending || createActivity.isPending}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
