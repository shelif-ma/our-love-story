import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Container,
  IconButton,
} from "@mui/material";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 * EPIC ANNIVERSARY TIMELINE
 *
 * Features:
 * - Multiple images/GIFs per year
 * - Stunning 3D card animations
 * - Particle effects and floating hearts
 * - Carousel for multiple images
 * - Parallax scrolling effects
 * - Interactive hover animations
 * - Celebration effects for final year
 */

interface Media {
  url: string;
  type: "image" | "gif";
}

interface YearData {
  id: string;
  year: string;
  date: string;
  media: Media[];
  caption: string;
}

const THEME = {
  primary: "#ff6b9d",
  secondary: "#c44569",
  accent: "#feca57",
  background:
    "linear-gradient(135deg, rgba(200, 255, 200, 0.79) 0%, rgba(255, 255, 255, 0.93) 50%, rgba(200,255,200,0.7) 100%)",

  cardBg: "rgba(255, 255, 255, 0.98)",
  textPrimary: "#2c3e50",
  textSecondary: "#7f8c8d",
};

const TIMELINE_DATA: YearData[] = [
  {
    id: "1",
    year: "2018",
    date: "March - December 2018",
    media: [
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "The beginning — where it all started. Three moments that changed everything forever.",
  },
  {
    id: "2",
    year: "2019",
    date: "2019 Highlights",
    media: [
      {
        url: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "First Valentines, first holidays together. Building memories, one moment at a time.",
  },
  {
    id: "3",
    year: "2020",
    date: "2020 Journey",
    media: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1529634750689-66e5a6add3c3?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "Quarantine chronicles. Learning to dance, learning to stay. Together through it all.",
  },
  {
    id: "4",
    year: "2021",
    date: "2021 Adventures",
    media: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption: "Road trips and deep conversations. Finding home in each other.",
  },
  {
    id: "5",
    year: "2022",
    date: "2022 Memories",
    media: [
      {
        url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption: "New year, deeper love. Summer adventures and endless laughter.",
  },
  {
    id: "6",
    year: "2023",
    date: "2023 Highlights",
    media: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "Growing together, dreaming bigger. Grateful for every single moment.",
  },
  {
    id: "7",
    year: "2024",
    date: "2024 Journey",
    media: [
      {
        url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1529634750689-66e5a6add3c3?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "Still choosing you, every single day. Love that endures all things.",
  },
  {
    id: "8",
    year: "2025",
    date: "2025 & Forever",
    media: [
      {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
        type: "image",
      },
    ],
    caption:
      "Here's to forever and always. The greatest of these is love — and us. ∞",
  },
];

// Magical particle effect
const MagicParticle = ({ delay }: { delay: number }) => {
  const startX = Math.random() * window.innerWidth;
  const endY = -100 - Math.random() * 100;
  const duration = 4 + Math.random() * 3;
  const size = 2 + Math.random() * 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: window.innerHeight + 50, x: startX, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: endY,
        scale: [0, 1, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: "easeOut",
      }}
      style={{
        position: "fixed",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(255, ${
          Math.random() * 100 + 155
        }, ${Math.random() * 100 + 155}, 1), transparent)`,
        boxShadow: `0 0 ${size * 3}px rgba(255, 255, 255, 0.8)`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

// Enhanced floating hearts
const FloatingHeart = ({ delay }: { delay: number }) => {
  const startX = Math.random() * window.innerWidth;
  const duration = 5 + Math.random() * 2;
  const size = 24 + Math.random() * 20;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: window.innerHeight + 50,
        x: startX,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 1, 0],
        y: -150,
        scale: [0, 1.3, 1, 1, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
        }}
      >
        <FavoriteIcon
          sx={{
            fontSize: size,
            color: THEME.primary,
            filter: `drop-shadow(0 0 ${size / 2}px rgba(255, 107, 157, 0.9))`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Sparkle effect
const Sparkle = ({ delay, size = 20 }: { delay: number; size?: number }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: "none",
      }}
    >
      <AutoAwesomeIcon
        sx={{
          fontSize: size,
          color: "#fff",
          filter: `drop-shadow(0 0 ${size / 2}px rgba(255, 255, 255, 0.9))`,
        }}
      />
    </motion.div>
  );
};

// Image carousel component
const ImageCarousel = ({
  media,
  isHovered,
}: {
  media: Media[];
  isInView: boolean;
  isHovered: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return media.length - 1;
      if (next >= media.length) return 0;
      return next;
    });
  };

  // Auto-advance when hovered
  useEffect(() => {
    if (!isHovered || media.length <= 1) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, media.length]);

  if (media.length === 1) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 400,
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Box
            component="img"
            src={media[0].url}
            alt="Memory"
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: isHovered
                ? "brightness(1.1) contrast(1.1)"
                : "brightness(1)",
              transition: "filter 0.3s ease",
            }}
          />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 400,
        overflow: "hidden",
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={media[currentIndex].url}
            alt={`Memory ${currentIndex + 1}`}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "grab",
              userSelect: "none",
              filter: isHovered
                ? "brightness(1.1) contrast(1.1)"
                : "brightness(1)",
              transition: "filter 0.3s ease",
              "&:active": {
                cursor: "grabbing",
              },
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {media.length > 1 && (
        <>
          <IconButton
            onClick={() => paginate(-1)}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              backdropFilter: "blur(10px)",
              zIndex: 2,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton
            onClick={() => paginate(1)}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              backdropFilter: "blur(10px)",
              zIndex: 2,
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.7)",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Dots indicator */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            {media.map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  scale: idx === currentIndex ? 1.3 : 1,
                  opacity: idx === currentIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor:
                      idx === currentIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    boxShadow:
                      idx === currentIndex
                        ? "0 0 10px rgba(255, 255, 255, 0.8)"
                        : "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                />
              </motion.div>
            ))}
          </Stack>
        </>
      )}

      {/* Image counter */}
      {media.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            fontSize: "0.875rem",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          {currentIndex + 1} / {media.length}
        </Box>
      )}

      {/* Gradient overlays */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </Box>
  );
};

// Timeline card component
const TimelineCard = ({
  data,
  index,
  isLast,
}: {
  data: YearData;
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [showExplosion, setShowExplosion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 100,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.85, 1, 1, 0.85]
  );

  useEffect(() => {
    if (isInView && isLast) {
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 5000);
    }
  }, [isInView, isLast]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }}>
      <Stack
        direction={{ xs: "column", md: isEven ? "row" : "row-reverse" }}
        spacing={4}
        alignItems="center"
        sx={{ mb: 10, position: "relative" }}
      >
        {/* Year badge with animations */}
        <motion.div
          animate={{
            scale: isInView ? [1, 1.15, 1] : 1,
            rotate: isInView ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              minWidth: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondary})`,
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "2rem",
              position: "relative",
              zIndex: 2,
              border: "5px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: -5,
                borderRadius: "50%",
                padding: "5px",
                background: `linear-gradient(135deg, ${THEME.accent}, ${THEME.primary})`,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.6,
              },
            }}
          >
            {data.year}
            {/* Sparkles around badge */}
            {[...Array(8)].map((_, i) => (
              <Sparkle key={i} delay={i * 0.2} size={16} />
            ))}
          </Box>
        </motion.div>

        {/* Card with 3D effects */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            flex: 1,
            perspective: 2000,
            rotateX,
            rotateY,
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "100%", md: 600 },
              bgcolor: THEME.cardBg,
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: isHovered
                ? "0 30px 80px rgba(0,0,0,0.4)"
                : "0 20px 60px rgba(0,0,0,0.3)",
              position: "relative",
              transformStyle: "preserve-3d",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              transition: "box-shadow 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isHovered
                  ? "linear-gradient(135deg, rgba(255,107,157,0.15), rgba(196,69,105,0.15))"
                  : "transparent",
                zIndex: 1,
                pointerEvents: "none",
                transition: "background 0.3s ease",
              },
            }}
          >
            {/* Image carousel */}
            <ImageCarousel
              media={data.media}
              isInView={isInView}
              isHovered={isHovered}
            />

            {/* Date badge */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={
                isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
              }
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  bgcolor: "rgba(0, 0, 0, 0.75)",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  backdropFilter: "blur(15px)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  zIndex: 3,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ letterSpacing: 1.2 }}
                >
                  {data.date}
                </Typography>
              </Box>
            </motion.div>

            {/* Floating heart on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        fontSize: 100,
                        color: THEME.primary,
                        filter:
                          "drop-shadow(0 0 30px rgba(255, 107, 157, 0.9))",
                        opacity: 0.85,
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Caption */}
            <CardContent sx={{ p: 4, position: "relative", zIndex: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: THEME.textPrimary,
                    fontStyle: "italic",
                    lineHeight: 1.9,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  {data.caption}
                </Typography>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Celebration explosion for last card */}
        {isLast && showExplosion && (
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            {[...Array(150)].map((_, i) => {
              const angle = (i / 150) * Math.PI * 2;
              const distance = 300 + Math.random() * 500;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={i}
                  initial={{
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: window.innerWidth / 2 + x,
                    y: window.innerHeight / 2 + y,
                    scale: Math.random() * 2.5 + 1,
                    opacity: 0,
                    rotate: Math.random() * 720,
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 2,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                    background: `hsl(${Math.random() * 360}, 100%, 70%)`,
                    boxShadow: "0 0 30px rgba(255, 255, 255, 0.9)",
                  }}
                />
              );
            })}
            {/* Extra hearts for celebration */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 2, 1.5],
                  opacity: [1, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: 40 + Math.random() * 40,
                    color: THEME.primary,
                    filter: "drop-shadow(0 0 20px rgba(255, 107, 157, 0.9))",
                  }}
                />
              </motion.div>
            ))}
          </Box>
        )}
      </Stack>
    </motion.div>
  );
};

// Main Timeline Component
const AnniversaryTimeline = () => {
  const [particles, setParticles] = useState<number[]>([]);
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Continuous particle system
    const particleCount = 40;
    setParticles(Array.from({ length: particleCount }, (_, i) => i));

    // Floating hearts
    const heartInterval = setInterval(() => {
      setHearts((prev) => {
        const newHeart = Date.now();
        const updated = [...prev, newHeart];
        return updated.slice(-15); // Keep last 15 hearts
      });
    }, 1200);

    return () => {
      clearInterval(heartInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: THEME.background,
        py: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background particles */}
      {particles.map((p) => (
        <MagicParticle key={p} delay={p * 0.1} />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <FloatingHeart key={h} delay={0} />
      ))}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* Epic Animated Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: -150 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.5,
            type: "spring",
            bounce: 0.4,
          }}
        >
          <Stack
            spacing={4}
            alignItems="center"
            sx={{ mb: 12, position: "relative" }}
          >
            {/* Sparkle decoration */}
            <Box sx={{ position: "relative", width: "100%", height: 60 }}>
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{
                    position: "absolute",
                    left: `${(i / 15) * 100}%`,
                    top: "50%",
                  }}
                >
                  <AutoAwesomeIcon
                    sx={{
                      fontSize: 20 + Math.random() * 20,
                      color: "#fff",
                      filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))",
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            {/* Main title with gradient animation */}
            <motion.div
              animate={{
                textShadow: [
                  "2px 2px 10px rgba(255,107,157,0.3)",
                  "2px 2px 30px rgba(255,107,157,0.9), 0 0 50px rgba(196,69,105,0.6)",
                  "2px 2px 10px rgba(255,107,157,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                  background: "linear-gradient(45deg, #fff, #ffd1dc, #fff)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 3s ease infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: 3,
                  "@keyframes gradient": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                  },
                }}
              >
                Nam Kaadhal Kadhai ✨
              </Typography>
            </motion.div>

            {/* Animated divider line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              <Box
                sx={{
                  height: 4,
                  background:
                    "linear-gradient(90deg, transparent, white, transparent)",
                  borderRadius: 10,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
                }}
              />
            </motion.div>

            {/* Subtitle with fade-in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: 300,
                  letterSpacing: 4,
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
                }}
              >
                2018 — 2025 and beyond ∞
              </Typography>
            </motion.div>

            {/* Floating hearts around title */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", left: "10%", top: "40%" }}
            >
              <FavoriteIcon
                sx={{ fontSize: 40, color: THEME.primary, opacity: 0.7 }}
              />
            </motion.div>
            <motion.div
              animate={{
                y: [10, -10, 10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ position: "absolute", right: "10%", top: "40%" }}
            >
              <FavoriteIcon
                sx={{ fontSize: 40, color: THEME.primary, opacity: 0.7 }}
              />
            </motion.div>
          </Stack>
        </motion.div>

        {/* Timeline section */}
        <Box sx={{ position: "relative" }}>
          {/* Animated center line */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 6,
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "translateX(-50%)",
              zIndex: 0,
              boxShadow: "0 0 30px rgba(255,255,255,0.4)",
              "&::before": {
                content: '""',
                position: "absolute",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg, transparent, rgba(255,107,157,0.5), transparent)",
                animation: "pulse 3s ease-in-out infinite",
              },
              "@keyframes pulse": {
                "0%, 100%": { opacity: 0.3 },
                "50%": { opacity: 1 },
              },
            }}
          />

          {/* Timeline cards */}
          {TIMELINE_DATA.map((data, index) => (
            <TimelineCard
              key={data.id}
              data={data}
              index={index}
              isLast={index === TIMELINE_DATA.length - 1}
            />
          ))}
        </Box>

        {/* Grand Finale Footer */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.5 }}
        >
          <Stack alignItems="center" spacing={4} sx={{ mt: 12, mb: 8 }}>
            {/* Pulsing heart */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: 120,
                    color: THEME.primary,
                    filter: "drop-shadow(0 0 40px rgba(255, 107, 157, 0.9))",
                  }}
                />
                {/* Sparkles around heart */}
                {[...Array(12)].map((_, i) => (
                  <Sparkle key={i} delay={i * 0.15} size={24} />
                ))}
              </Box>
            </motion.div>

            {/* Final message with animation */}
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: 300,
                  letterSpacing: 3,
                  textShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
                  px: 2,
                }}
              >
                Forever and always 💕
              </Typography>
            </motion.div>

            {/* Additional romantic quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.85)",
                  textAlign: "center",
                  fontStyle: "italic",
                  maxWidth: 600,
                  lineHeight: 1.8,
                  px: 3,
                }}
              >
                "Every love story is beautiful, but ours is my favorite"
              </Typography>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      {/* Overlay gradient for depth */}
    </Box>
  );
};

export default AnniversaryTimeline;
