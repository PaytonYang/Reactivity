import { Box, Button, ButtonGroup, List, Paper, Typography, ListItemText } from '@mui/material';
import { useStore } from '../../lib/hooks/useStore';
import { observer } from 'mobx-react-lite';

export const Counter = observer(function Counter() {
  const { counterStore } = useStore();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box width="60%">
        <Typography variant="h4" gutterBottom>
          {counterStore.title}
        </Typography>
        <Typography variant="h6">The count is: {counterStore.count}</Typography>
        <ButtonGroup variant="contained" sx={{ mt: 2 }}>
          <Button onClick={() => counterStore.decrement()} color="error" variant="contained">
            Decrement
          </Button>
          <Button onClick={() => counterStore.increment()} color="success" variant="contained">
            Increment
          </Button>
          <Button onClick={() => counterStore.increment(5)} color="primary" variant="contained">
            Increment by 5
          </Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: '40%', p: 4 }}>
        <Typography variant="h5">Counter events ({counterStore.eventCount})</Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <ListItemText key={index}>{event}</ListItemText>
          ))}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;
