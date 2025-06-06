import React from "react";
import Lottie from "lottie-react";
import loader from "../../assets/loading.json";
import Wrapper from "./style";


const LoadingScreen = () => (
    <Wrapper>
        <div className="animation-wrapper">
            <div className="lottie-container">
                <Lottie animationData={loader} loop={true} />
            </div>
        </div>
        <p className="loading-text">Getting everything ready for you. Please hold on a moment…</p>
    </Wrapper>
);

export default LoadingScreen;
