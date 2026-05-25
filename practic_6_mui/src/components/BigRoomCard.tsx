import { Button, Typography, Box, Card, CardContent} from '@mui/material';

interface ComponentProps {
    apartment: {
        img: string, 
        title: string, 
        description: string[],
    };
    index: number;
}

function BigRoomCard({ apartment, index } : ComponentProps) {
    const isRightImg = index % 2 === 0;
    return (
        
        <Card sx={{
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', md: isRightImg ? '2fr 1fr' : '1fr 2fr'},
            gridRow: {xs: isRightImg ? '1' : '2',
                    md: isRightImg ? '1 / span 2' : '3 / span 2'},
            gridColumn: {xs: isRightImg ? '1' : '1',
                    md: isRightImg ? '1 / span 2': '1 / span 2'},
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'gray',
            margin: '3px'
        }}>
            <CardContent sx={{
                order: isRightImg ? 0 : 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}>
                <Typography variant="h5" sx={{
                    fontWeight: 700
                }}>
                    {apartment.title}
                </Typography>

                <Typography sx={{
                    color: 'gray',
                    fontSize: { xs: 14, md: 16 },
                }}>
                    {apartment.description}
                </Typography>

                <Button variant="contained" sx={{
                    alignSelf: isRightImg ? 'flex-end' : 'flex-start',
                    borderRadius: 20,
                }}>
                    Подробнее
                </Button>

            </CardContent>

            <Box component="img" src={apartment.img} alt={apartment.title} sx={{
                order: isRightImg ? 1 : 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}/>
        </Card>
    );
  }

export default BigRoomCard;