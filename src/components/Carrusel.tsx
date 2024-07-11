import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarruselProps {
  imageUrls: string[];
  borderRadius?: number | string;
}

const Carrusel: React.FC<CarruselProps> = ({
  imageUrls,
  borderRadius = "16px",
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imageUrls.length;

  const sliderRef = React.useRef<Slider>(null);

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handleBack = () => {
    sliderRef.current?.slickPrev();
  };

  const handleStepChange = (index: number) => {
    setActiveStep(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => handleStepChange(next),
    arrows: false,
  };

  return (
    <Box
      sx={{
        maxWidth: 345,
        flexGrow: 1,
        position: "relative",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: borderRadius,
          overflow: "hidden",
          width: "90%",
          margin: "0 auto",
          "& .slick-slide": {
            borderRadius: borderRadius,
            overflow: "hidden",
          },
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <Box
                component="img"
                sx={{
                  height: "128px",
                  width: "304px",
                  display: "block",
                  overflow: "hidden",
                  // width: "100%",
                  objectFit: "cover",
                  borderRadius: borderRadius,
                }}
                src={url}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
        <Button
          size="small"
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            minWidth: "auto",
            backgroundColor: "rgba(250, 250, 250, 0.2)",
          }}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
        </Button>
        <Button
          size="small"
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            minWidth: "auto",
            backgroundColor: "rgba(250, 250, 250, 0.2)",
          }}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          <KeyboardArrowRight />
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {imageUrls.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: activeStep === index ? "#4E169D" : "grey.400",
              margin: "0 4px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carrusel;
