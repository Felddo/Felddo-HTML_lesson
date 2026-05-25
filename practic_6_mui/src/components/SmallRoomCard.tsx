import { Button, Typography, Box, Card, CardContent} from '@mui/material';

interface ComponentProps {
  apartment: {
    img: string;
    title: string;
    description: string[];
  };
  index: number;
}

function SmallRoomCard({ apartment, index }: ComponentProps) {
  const imageOnRight = index % 2 === 0;

  return (
    <Card sx={{
        display: 'grid',
        gridTemplateColumns: {xs: '1ft', md: '1fr 1fr'},
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'gray',
        margin: '3px'
      }}
    >

        <Box component="img" src={apartment.img} alt={apartment.title} sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2
        }}>
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 700,
                    fontSize: { xs: 18, md: 16 },
                    marginBottom: '10px'
                }}>
                    {apartment.title}
                </Typography>

                <Typography sx={{
                    color: 'gray',
                    fontSize: { xs: 14, md: 10 },
                }}>
                    {apartment.description}
                </Typography>
            </Box>

            <Button variant="contained" size='small' sx={{
                alignSelf: 'flex-start',
                borderRadius: 20,
            }}>
                Подробнее
            </Button>
      </CardContent>
    </Card>
  );
}

export default SmallRoomCard;