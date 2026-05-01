import { Box, Button, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

type Props = {
  selectedActivity: Activity | undefined;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
};

export default function ActivityForm({
  selectedActivity,
  closeForm,
  submitForm,
}: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const activity: Activity = {
      id: selectedActivity?.id || "",
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      city: formData.get("city") as string,
      venue: formData.get("venue") as string,
      isCancelled: false,
      latitude: 0,
      longitude: 0,
    };

    submitForm(activity);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          label="Title"
          defaultValue={selectedActivity?.title}
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={selectedActivity?.description}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={selectedActivity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={selectedActivity?.date}
        />
        <TextField
          name="city"
          label="City"
          defaultValue={selectedActivity?.city}
        />
        <TextField
          name="venue"
          label="Venue"
          defaultValue={selectedActivity?.venue}
        />
        <Box display="flex" gap={3} justifyContent="flex-end">
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
