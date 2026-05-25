import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import BigRoomCard from './BigRoomCard';
import SmallRoomCard from './SmallRoomCard';

import rooms from '../data';
const big_rooms = [rooms[0], rooms[1]];
const small_rooms = [rooms[2], rooms[3], rooms[4], rooms[5]]


function Content() {
    return (
        <Container maxWidth="xl">
            <Box sx={{
                display: 'grid',
                gridTemplateRows: {xs: 'repeat(6, 1fr)', md: 'repeat(4, 1fr)'},
                gridTemplateColumns: {xs: '1fr', md: 'repeat(3, 1fr)'}
            }}>
                {big_rooms.map((item, index) => (
                    <BigRoomCard apartment={ item } index={ index }/>
                ))}
                {small_rooms.map((item, index) => (
                    <SmallRoomCard apartment={ item } index={ index }/>
                ))}
            </Box>
        </Container>
    );
}

export default Content;