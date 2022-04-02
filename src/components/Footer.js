import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__links">
                    <a href="https://www.linkedin.com/in/josué-peña-073524223/" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="https://github.com/jp-programming" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon="fa-brands fa-github" />
                    </a>
                </div>
                <span>@jp_programming</span>
            </div>
        </footer>
    );
};

export default Footer;
