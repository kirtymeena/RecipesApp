function Footer() {
    return (
        <footer>
            <div className='credit'>
                Created By <span onClick={()=>window.open("https://github.com/kirtymeena", "_target")}>Kirty</span>
            </div>
            <div className='git__logo'>
                Technology used - React, CSS/Sass, Redux Toolkit, material UI, 
            </div>

        </footer>
    )
}

export default Footer