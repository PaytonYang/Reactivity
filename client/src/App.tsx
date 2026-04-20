import { Typography, List, ListItemText, ListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));

    return () => {};
  }, []);

  return (
    <>
      <Typography variant="h3">Reactivity</Typography>
      <List>
        {activities.map((activity) => {
          return (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default App;
