import { SearchOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <Paper sx={{ height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 6 }}>
      <SearchOff sx={{ fontSize: 100, color: 'primary' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Oops - we've looked everywhere but we couldn't find this page
      </Typography>
      <Button fullWidth component={Link} to="/activities">
        Return to activities page
      </Button>
    </Paper>
  );
}
