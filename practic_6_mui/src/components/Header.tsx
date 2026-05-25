import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type Page = 'main' | 'table';

interface ComponentProps {
  activePage: Page;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
    background: '#5d8aa84a',
    borderRadius: '15px'
}));

const getBtnVariant = (active: Page, curr: Page) => {
  return active === curr ? 'contained' : 'text';
};

const getBtnBg = (active: Page, curr: Page) => {
  return active === curr ? '#5d8aa8' : 'white';
};

function Header({ activePage = 'main' }: ComponentProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  return (
    <Container maxWidth="xl">
      <StyledToolbar>
        <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
          Аренда и аренда
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button variant={getBtnVariant(activePage, 'main')} color="info" size="medium">
            Квартиры Владивостока
          </Button>
          <Button variant={getBtnVariant(activePage, 'table')} color="info" size="medium">
            Детальная информация 
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>

              <MenuList>
                <MenuItem
                  sx={{
                    bgcolor: getBtnBg(activePage, 'main'),
                    '&:hover': { backgroundColor: '#8eb0c7' },
                  }}
                >
                  Квартиры Владивостока
                </MenuItem>

                <MenuItem
                  sx={{
                    bgcolor: getBtnBg(activePage, 'table'),
                    '&:hover': { backgroundColor: '#8eb0c7' },
                  }}
                >
                  Детальная информация 
                </MenuItem>

              </MenuList>
            </Box>
          </Drawer>
        </Box>
      </StyledToolbar>
    </Container>
  );
}

export default Header;