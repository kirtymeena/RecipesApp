import Chip from '@mui/material/Chip';

function Footer() {
    return (
        <footer>
            <div className='credit'>
                Created By <span onClick={() => window.open("https://github.com/kirtymeena", "_target")}>Kirty</span>
            </div>
            <div className='git__logo'>
                Built with - <Chip label="React" sx={{ backgroundColor: "#0D6C8C", color: "white" }} /> <Chip label="CSS/Sass" sx={{ backgroundColor: "#CA6296", color: "white" }} /> <Chip label="Redux Toolkit" sx={{backgroundColor:"#593D88",color:"white"}}/> <Chip label="Material UI" color="primary"/>
            </div>

        </footer>
    )
}

export default Footer