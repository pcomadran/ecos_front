import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useLocation } from "react-router-dom";

interface Image {
  imgPath: string;
}

interface CarruselProps {
  images: Image[];
}

const Carrusel: React.FC<CarruselProps> = ({ images }) => {
  const location = useLocation().pathname;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
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
          borderRadius: location === "/" ? "16px 0 16px 16px" : 3,
          overflow: "hidden",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 140,
                    display: "block",
                    maxWidth: 345,
                    overflow: "hidden",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={step.imgPath}
                  alt={`Image ${index + 1}`}
                />
              ) : null}
            </div>
          ))}
        </SwipeableViews>
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
        {images.map((_, index) => (
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
