import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Footer() {
  return (
    <Container maxWidth="lg">
        <Typography align="center" sx={{
            borderRadius: "10px",
            bgcolor: "#5d8aa8",
            color: "white"}}>
            Б9123-09.03.04 / 6 Гнатенко Андрей
        </Typography>
    </Container>
  );
}

export default Footer;
