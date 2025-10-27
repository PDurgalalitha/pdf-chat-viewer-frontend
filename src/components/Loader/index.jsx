import { loader } from "../../assets/TriangleLoading";
import Lottie from "react-lottie";
import styles from "./index.module.scss";

const Loader = ({ isLarge }) => {
  const options = {
    loop: true,

    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className={`${styles.loaderContainer} ${
        isLarge ? styles.larger : styles.small
      }`}
    >
      <Lottie options={options} />
    </div>
  );
};

export default Loader;
