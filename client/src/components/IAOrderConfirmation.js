import Footer from "../components/Footer";
import "../pages/IACustomerCheckout.css";
import { useNavigate } from "react-router-dom";
import FrameComponent4 from "./FrameComponent4";
import "./IAOrderConfirmation.css";

// Order Confirmation Page
const IAOrderConfirmation = () => {
    const navigate = useNavigate();

    const onLogoContainerClick = () => {
        navigate("/");
    };
    return (
        <div className="ia-container">
            <FrameComponent4 />
            <header className="register-wrapper">
                <h3 className="register1">Order Confirmation</h3>
            </header>
            <section className='body-section'>
                <div className="lottie-container">
                    <lottie-player
                        autoplay
                        mode="normal"
                        src="https://lottie.host/9343e1a5-dc9a-4a08-95c3-3021b639208c/NET26ye8QF.json"
                        style={{ width: "250px" }}
                    ></lottie-player>
                </div>
                <div className='order-confirmation-text'>
                    <p className='thank-you-msg'>Thank you for ordering with BiteWise!</p>
                    <p className='delivery-msg'>Delivery instructions will be messaged to you shortly.</p>
                </div>
            </section>
            <div>
                <Footer propHeight="20.9px" propHeight1="24px" />
            </div>
        </div>
    );
}

export default IAOrderConfirmation;
