import TypeIt from "typeit-react";
import { useAlexio } from "../Context";

const TypingAnimation = () => {
  const user = useAlexio();
  if (!user.userData) {
    return <div></div>;
  }
  const title = user.userData.user.about.title;
  return (
    <span className="type-it">
      <TypeIt
        options={{
          speed: 200,
          loop: true,
          strings: [title],
          breakLines: false,
        }}
      />
    </span>
  );
};
export default TypingAnimation;
