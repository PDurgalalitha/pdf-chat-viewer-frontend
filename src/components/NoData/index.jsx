import { emptyState } from "../../assets/EmptyState.js";
import Lottie from "react-lottie";
import styles from "./index.module.scss";

const NoData = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: emptyState,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={styles.Container}>
      <Lottie options={options} />
    </div>
  );
};

export default NoData;
