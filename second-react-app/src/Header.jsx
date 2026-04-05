import Hero from "./Hero";

function Header() {

    let name = "Pragna";
    let isMale = false;
    let userNameCss = { color: 'darkgreen', backgroundColor: 'pink', padding: '5px' }
    
    let aTagCss = {
        margin: "0 15px",
        color: "#333",
        fontSize: "18px"
    }

    return <>
        <center>
            <h1 style={{ color: 'green' }}>Header</h1>
            <div style={{ margin: '30px' }}>
                <a href="" style={aTagCss}>Home </a>

                <a href="" style={aTagCss}>About </a>

                <a href="" style={aTagCss}>Contect</a>

                <h3 style={userNameCss}>UserName : {name} {isMale ? "👨" : "👧"}</h3>

            </div>
        </center>

        <Hero />
    </>
}

export default Header;