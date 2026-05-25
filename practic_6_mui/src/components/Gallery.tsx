import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

import Image1 from '../images/first.jpg';
import Image2 from '../images/second.jpg';
import Image3 from '../images/third.jpg';
import Image4 from '../images/fourth.jpg';

const gallery_images = [Image1, Image2, Image3, Image4];

const Photos = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
}));

const ImgSmall = styled(Box)(() => ({
    overflow: 'hidden',
    borderRadius: '10px',
    margin: '3px'
}));

function Gallery() {
    return (
        <Photos>
            {gallery_images.map((item: string, index: number) => (
                <ImgSmall key={index} sx={{
                    width: {xs: "95%", md: index % 3 === 0 ? '28%' : '68%'},
                    height: {xs: '100%', md: '100px'}
                }}>
                    <Box component="img" src={item} alt={`gallery-${index}`}
                        sx={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </ImgSmall>
            ))}
        </Photos>
    );
}

export default Gallery;