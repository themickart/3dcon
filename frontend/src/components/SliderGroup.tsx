import React, { useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

export const SliderGroup: React.FC<{ gallery: string[] }> = ({ gallery }) => {
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;
  const [[slide, direction], setSlide] = useState([0, 0]);
  const paginate = (newDirection: number) =>
    setSlide([slide + newDirection, newDirection]);
  const variants: Variants = {
    initial: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    animate: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };
  return (
    <div className="flex justify-between">
      <div className="imgs overflow-hidden flex flex-col">
        <div className="w-[967px] h-[524px] mb-8">
          <div className="big-slider relative">
            {gallery?.length > 1 ? (
              <>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    className="absolute"
                    key={slide}
                    width={967}
                    height={524}
                    src={
                      process.env.PUBLIC_URL +
                      gallery?.[Math.abs(slide % gallery.length)]
                    }
                    custom={direction}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    {...variants}
                    drag={"x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) paginate(1);
                      else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    }}
                    alt=""
                  />
                </AnimatePresence>
                <div className="absolute z-[1] mt-3 ml-[900px]">
                  <img
                    src={process.env.PUBLIC_URL + "/icons/fullscreen.svg"}
                    alt=""
                  />
                </div>
                <div
                  className="z-[1] absolute mt-[217px] ml-[10px]"
                  onClick={() => paginate(1)}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/icons/bigLeftArrow.svg"}
                    alt=""
                  />
                </div>
                <div
                  className="z-[1] absolute mt-[217px] ml-[895px]"
                  onClick={() => paginate(-1)}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/icons/bigRightArrow.svg"}
                    alt=""
                  />
                </div>
              </>
            ) : (
              <img
                width={967}
                height={524}
                alt=""
                src={process.env.PUBLIC_URL + gallery?.[0]}
              />
            )}
          </div>
        </div>
        <div className="slider w-[950px] h-[140px] flex items-center justify-between">
          <div className="w-[60px] pl-[11px]" onClick={() => paginate(1)}>
            <img src={process.env.PUBLIC_URL + "/icons/leftArrow.svg"} alt="" />
          </div>
          {gallery?.map((src, index) => (
            <img
              className={
                index === Math.abs(slide % gallery.length)
                  ? "border-4 border-solid border-[#80e0a1]"
                  : "none"
              }
              key={src}
              src={process.env.PUBLIC_URL + src}
              alt=""
              width={247}
              height={139}
              onClick={() =>
                setSlide(([prevSlide, prevDirection]) => [
                  index,
                  index - prevSlide,
                ])
              }
            />
          ))}
          <div className="w-p[60px] pl-[11px]" onClick={() => paginate(-1)}>
            <img
              src={process.env.PUBLIC_URL + "/icons/rightArrow.svg"}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
