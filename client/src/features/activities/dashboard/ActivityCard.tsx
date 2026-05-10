import AccessTime from '@mui/icons-material/AccessTime';
import Place from '@mui/icons-material/Place';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false; // Placeholder for host check logic
  const isGoing = false; // Placeholder for going check logic
  const label = isHost ? 'You are hosting' : 'You are going';
  const isCancelled = false; // Placeholder for cancellation check logic
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

  return (
    <Card sx={{ borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{ title: { fontWeight: 'bold', fontSize: 20 } }}
          subheader={
            <>
              Host by <Link to={`/profiles/Bob`}>Bob</Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(isHost || isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
          {isCancelled && <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <Box display="flex" alignItems="center" flexGrow={0}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">
            {activity.city} / {activity.venue}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          Addendds go here
        </Box>
      </CardContent>

      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          size="medium"
          variant="contained"
          component={Link}
          to={`/activities/${activity.id}`}
          sx={{ display: 'flex', justifySelf: 'flex-end' }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
