// components/LoaderOverlay.jsx
import Lottie from 'lottie-react';
import loading_tile from '../../assets/login_tile.json'; // adjust path if needed
import Wrapper from './style';

const Loading = () => {
    return (
        <Wrapper>
            <div className="blur-overlay" />
            <div className="login-tile">
                <Lottie animationData={loading_tile} loop={true} />
            </div>
        </Wrapper>
    );
};

export default Loading;
