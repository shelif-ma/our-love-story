import { Box } from "@mui/material";
import Ballpit from "../Animations/Ballpit";
import SplitText from "../Animations/SplitText";
import Particles from "../Animations/Particles";
import ScrollStack, { ScrollStackItem } from "../Animations/ScrollStack";
import CircularGallery from "../Animations/CircularGallery";
import Stack from "../Animations/Stack";
import Lanyard from "../Animations/Lanyard";

// Main Timeline Component
const AnniversaryTimeline = () => {
  const images = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    },
  ];
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#000",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Ballpit
            count={50}
            gravity={0.6}
            friction={0.8}
            wallBounce={0.95}
            followCursor={true}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "white",
            top: "25%",
            transform: "translateY(-50%)",
            fontWeight: "bold",
          }}
        >
          <SplitText text="Oru Kadhal Kadhai" tag="h1" delay={200} />
        </Box>
      </Box>

      {/* ScrollStack Section */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#000",
          minHeight: "100vh", // allow scrolling space
          overflow: "visible",
        }}
      >
        <ScrollStack useWindowScroll={true}>
          <ScrollStackItem>
            <h2>Card 1</h2>
            <p>This is the first card in the stack</p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h2>Card 2</h2>
            <p>This is the second card in the stack</p>
          </ScrollStackItem>
          <ScrollStackItem>
            <h2>Card 3</h2>
            <p>This is the third card in the stack</p>
          </ScrollStackItem>
        </ScrollStack>
      </Box>

      {/* Circular Gallery Section */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#000",
          paddingY: "30vh", // spacing from previous section
          // overflow: "hidden",
          border: "2px solid red",
          zIndex: 1,
        }}
      >
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </Box>
      <Box
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Stack
          randomRotation={true}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 200, height: 200 }}
          cardsData={images}
        />
      </Box>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </>
  );
};

export default AnniversaryTimeline;
