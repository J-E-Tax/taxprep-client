import Lottie from "lottie-react";
import MainVerticalStepper from "../components/main/MainVerticalStepper";
import robotAnimation from "../components/main/robot.json";

function MainPage() {
  return (
    <div className="bg-base-lightest" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '80vh',
      paddingTop: '5rem',
    }}>
      <h2>What Would You Like To Do?</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
      }}>
        <Lottie
          animationData={robotAnimation}
          style={{ height: 200 }}
        />
        <MainVerticalStepper />
        <Lottie
          animationData={robotAnimation}
          style={{ height: 200 }}
        />
      </div>
    </div>
  );
}

export default MainPage;