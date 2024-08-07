import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data = [], header }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const numMovies = data.length;

  const settings = {
    dots: numMovies > 6,
    infinite: numMovies > 6,
    speed: 500,
    slidesToShow: numMovies <= 6 ? numMovies : 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: header ? 2000 : 6000,
    arrows: numMovies > 6,
    appendDots: dots => <ul style={{ marginTop: "5px" }}>{dots}</ul>,
    customPaging: i => (
      <div
        style={{
          marginTop: "1rem",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: i === activeSlide ? "rgb(40,40,40)" : "white",
          opacity: 0.75,
        }}
      />
    ),
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <Slider {...settings}>
      {data?.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
};

export default SliderUtil;
