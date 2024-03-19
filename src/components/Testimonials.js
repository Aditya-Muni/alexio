import Slider from "react-slick";
import { sliderProps } from "../sliderProps";
import { useAlexio } from "../Context";

const Testimonials = () => {
  const user = useAlexio();

  if (!user.userData) {
    return <div></div>;
  }

  const testimonials = user.userData.user.testimonials;
  return (
    <div className="testimonial-section m-30px-t sm-m-20px-t pb-5">
      <div className="sub-title m-30px-b">
        <h2 className="dark-color theme-after">What People Say?</h2>
      </div>
      <Slider {...sliderProps.testimonial} id="client-slider-single">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-col" key={index}>
            <div className="say">
              <p>{testimonial.review}</p>
            </div>
            <div className="user">
              <div className="img">
                <img src={testimonial.image.url} alt title />
              </div>
              <div className="name ml-2">
                <span>{testimonial.name}</span>
                <label>{testimonial.position}</label>
              </div>
            </div>
          </div>
        ))}
      </Slider>{" "}
    </div>
  );
};
export default Testimonials;
