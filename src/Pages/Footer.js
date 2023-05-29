import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return ( 
        <div>
            <footer>
                <div className="foot">
                    <h2>Contact Us</h2>
                    <a href="tel:+1245894738">+1245894738</a>
                    <a href="mailto:virtualclass@gmail.com">virtualclass@gmail.com</a>
                </div>
                <div className="foot">
                    <h2>Policy</h2>
                    <a href="mailto:virtualclass@gmail.com">virtualclass@gmail.com</a>
                </div>
                <div className="foot social_media">
                    <h2>Follow Us</h2>

                    <Link to="/" className="">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>

                    <Link to="/" className="">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>

                    <Link to="/" className="">
                    <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                </div>
                <div className="foot">
                    <h2>Newsletter</h2>
                    
                    <a href="#111">Subscribe</a>
                </div>
            </footer>
            <p style={{textAlign: "center", padding: "20px"}}>Copyright Virtual Class &copy2023 All rights reserved</p>
        </div>
    );
}
 
export default Footer;