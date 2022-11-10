import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product, ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence, Variants } from "framer-motion";

export const ProjectPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [
    {
      author,
      description,
      info,
      license,
      likesCount,
      price,
      tags,
      title,
      viewsCount,
      gallery,
    },
    setProduct,
  ] = useState<Product>({} as Product);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      setProduct(
        await (
          await fetch(`http://localhost:3001/products/${productId}`)
        ).json()
      );
      setProducts(
        await (
          await fetch(`http://localhost:3001/products?id_ne=${productId}`)
        ).json()
      );
    })();
  }, [productId]);
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
    <div style={{ width: 1445, margin: "auto" }}>
      <h1
        style={{
          fontSize: 48,
          fontWeight: 400,
          marginLeft: 42,
          color: "#80e0a1",
        }}
      >
        {title}
      </h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="imgs" style={{ overflow: "hidden" }}>
          <div style={{ width: 967, height: 524 }}>
            <div className="big-slider" style={{ position: "relative" }}>
              {gallery?.length > 1 ? (
                <>
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      style={{ position: "absolute" }}
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
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      marginTop: 12,
                      marginLeft: 900,
                    }}
                  >
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M53.1 1.9125C53.0051 1.68528 52.8719 1.476 52.7063 1.29375C52.524 1.12813 52.3147 0.994953 52.0875 0.9C51.8621 0.803923 51.62 0.752962 51.375 0.75H36.375C35.8777 0.75 35.4008 0.947544 35.0492 1.29917C34.6976 1.65081 34.5 2.12772 34.5 2.625C34.5 3.12228 34.6976 3.59919 35.0492 3.95083C35.4008 4.30246 35.8777 4.5 36.375 4.5H46.8563L31.2938 20.0438C31.118 20.2181 30.9785 20.4254 30.8833 20.6539C30.7881 20.8824 30.7391 21.1275 30.7391 21.375C30.7391 21.6225 30.7881 21.8676 30.8833 22.0961C30.9785 22.3246 31.118 22.5319 31.2938 22.7062C31.4681 22.882 31.6754 23.0215 31.9039 23.1167C32.1324 23.2119 32.3775 23.2609 32.625 23.2609C32.8725 23.2609 33.1176 23.2119 33.3461 23.1167C33.5746 23.0215 33.782 22.882 33.9563 22.7062L49.5 7.14375V17.625C49.5 18.1223 49.6975 18.5992 50.0492 18.9508C50.4008 19.3025 50.8777 19.5 51.375 19.5C51.8723 19.5 52.3492 19.3025 52.7008 18.9508C53.0525 18.5992 53.25 18.1223 53.25 17.625V2.625C53.247 2.37998 53.1961 2.13792 53.1 1.9125Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                      <path
                        d="M7.14375 4.5H17.625C18.1223 4.5 18.5992 4.30246 18.9508 3.95083C19.3025 3.59919 19.5 3.12228 19.5 2.625C19.5 2.12772 19.3025 1.65081 18.9508 1.29917C18.5992 0.947544 18.1223 0.75 17.625 0.75H2.625C2.37998 0.752962 2.13792 0.803923 1.9125 0.9C1.68528 0.994953 1.476 1.12813 1.29375 1.29375C1.12813 1.476 0.994953 1.68528 0.9 1.9125C0.803923 2.13792 0.752962 2.37998 0.75 2.625V17.625C0.75 18.1223 0.947544 18.5992 1.29917 18.9508C1.65081 19.3025 2.12772 19.5 2.625 19.5C3.12228 19.5 3.59919 19.3025 3.95083 18.9508C4.30246 18.5992 4.5 18.1223 4.5 17.625V7.14375L20.0438 22.7062C20.2181 22.882 20.4254 23.0215 20.6539 23.1167C20.8824 23.2119 21.1275 23.2609 21.375 23.2609C21.6225 23.2609 21.8676 23.2119 22.0961 23.1167C22.3246 23.0215 22.5319 22.882 22.7062 22.7062C22.882 22.5319 23.0215 22.3246 23.1167 22.0961C23.2119 21.8676 23.2609 21.6225 23.2609 21.375C23.2609 21.1275 23.2119 20.8824 23.1167 20.6539C23.0215 20.4254 22.882 20.2181 22.7062 20.0438L7.14375 4.5Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                      <path
                        d="M51.375 34.5C50.8777 34.5 50.4008 34.6975 50.0492 35.0492C49.6975 35.4008 49.5 35.8777 49.5 36.375V46.8562L33.9562 31.2937C33.7814 31.1189 33.5739 30.9802 33.3454 30.8856C33.117 30.791 32.8722 30.7423 32.625 30.7423C32.3777 30.7423 32.1329 30.791 31.9045 30.8856C31.6761 30.9802 31.4686 31.1189 31.2937 31.2937C31.1189 31.4686 30.9802 31.6761 30.8856 31.9045C30.791 32.1329 30.7423 32.3778 30.7423 32.625C30.7423 32.8722 30.791 33.117 30.8856 33.3455C30.9802 33.5739 31.1189 33.7814 31.2937 33.9562L46.8562 49.5H36.375C35.8777 49.5 35.4008 49.6975 35.0492 50.0492C34.6975 50.4008 34.5 50.8777 34.5 51.375C34.5 51.8723 34.6975 52.3492 35.0492 52.7008C35.4008 53.0525 35.8777 53.25 36.375 53.25H51.375C51.62 53.247 51.8621 53.1961 52.0875 53.1C52.3202 53.0158 52.5315 52.8814 52.7064 52.7065C52.8814 52.5315 53.0158 52.3202 53.1 52.0875C53.1961 51.8621 53.247 51.62 53.25 51.375V36.375C53.25 35.8777 53.0524 35.4008 52.7008 35.0492C52.3492 34.6975 51.8723 34.5 51.375 34.5Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                      <path
                        d="M20.0438 31.2937L4.5 46.8562V36.375C4.5 35.8777 4.30246 35.4008 3.95083 35.0492C3.59919 34.6975 3.12228 34.5 2.625 34.5C2.12772 34.5 1.65081 34.6975 1.29917 35.0492C0.947544 35.4008 0.75 35.8777 0.75 36.375V51.375C0.752962 51.62 0.803923 51.8621 0.9 52.0875C0.994953 52.3147 1.12813 52.524 1.29375 52.7062C1.476 52.8719 1.68528 53.005 1.9125 53.1C2.13792 53.1961 2.37998 53.247 2.625 53.25H17.625C18.1223 53.25 18.5992 53.0525 18.9508 52.7008C19.3025 52.3492 19.5 51.8723 19.5 51.375C19.5 50.8777 19.3025 50.4008 18.9508 50.0492C18.5992 49.6975 18.1223 49.5 17.625 49.5H7.14375L22.7062 33.9562C23.0593 33.6032 23.2577 33.1243 23.2577 32.625C23.2577 32.1257 23.0593 31.6468 22.7062 31.2937C22.3532 30.9407 21.8743 30.7423 21.375 30.7423C20.8757 30.7423 20.3968 30.9407 20.0438 31.2937Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      marginTop: 217,
                      marginLeft: 10,
                    }}
                    onClick={() => paginate(-1)}
                  >
                    <svg
                      width="62"
                      height="100"
                      viewBox="0 0 62 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.166749 50L50.1667 100L61.8334 88.3333L23.5001 50L61.8334 11.6667L50.1668 -2.5628e-06L0.166749 50Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      marginTop: 217,
                      marginLeft: 895,
                    }}
                    onClick={() => paginate(1)}
                  >
                    <svg
                      width="62"
                      height="100"
                      viewBox="0 0 62 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M61.8334 50L11.8334 -2.18557e-06L0.166702 11.6667L38.5 50L0.166698 88.3333L11.8334 100L61.8334 50Z"
                        fill="#CCCCCC"
                        fill-opacity="0.66"
                      />
                    </svg>
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
          <div
            className="slider"
            style={{
              marginTop: 21,
              width: 950,
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ width: 60, paddingLeft: 11 }}
              onClick={() => paginate(-1)}
            >
              <svg
                width="38"
                height="60"
                viewBox="0 0 38 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 30L30.5 60L37.5 53L14.5 30L37.5 7L30.5 3.57746e-07L0.5 30Z"
                  fill="black"
                />
              </svg>
            </div>
            {gallery?.map((src, index) => (
              <img
                style={{
                  border:
                    index === Math.abs(slide % gallery.length)
                      ? "4px solid #80E0A1"
                      : "none",
                }}
                key={index}
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
            <div
              style={{ width: 60, paddingLeft: 11 }}
              onClick={() => paginate(1)}
            >
              <svg
                width="38"
                height="60"
                viewBox="0 0 38 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.5 30L7.5 3.57746e-07L0.499996 7L23.5 30L0.499997 53L7.5 60L37.5 30Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div
            className="buy-info"
            style={{
              maxWidth: 466,
              height: 350,
              border: "1px solid #dddddd",
              borderRadius: 15,
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: 64,
                marginTop: 55,
                margin: 0,
              }}
            >
              {price}
            </p>
            <p style={{ textAlign: "center", marginTop: 29, fontSize: 24 }}>
              {license}
            </p>
            <button
              style={{
                width: 230,
                height: 75,
                margin: "40px 118px 45px",
                fontSize: 24,
                borderRadius: 37.5,
                border: "none",
                padding: 9,
                background: "#80e0a1",
              }}
            >
              добавить в корзину
            </button>
          </div>
          <div
            className="author-tags"
            style={{
              maxWidth: 466,
              maxHeight: 350,
              border: "1px solid #dddddd",
              borderRadius: 15,
              marginTop: 29,
              padding: "34px 25px 105px 26px",
            }}
          >
            <div className="author" style={{ display: "flex", margin: 0 }}>
              <div style={{ marginRight: 23 }}>
                <img src={process.env.PUBLIC_URL + author?.avatar} alt="ава" />
              </div>
              <div style={{ height: 100 }}>
                <p style={{ fontSize: 32, margin: 0 }}>{author?.name}</p>
                <p style={{ fontSize: 24, marginTop: 11 }}>
                  {author?.salesCount}
                </p>
              </div>
            </div>
            <hr
              style={{
                marginTop: 41,
              }}
            />
            <div>
              {tags?.map((tag, index) => (
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 3px 8px 3px",
                    borderRadius: 8,
                    background: "#d9d9d9",
                    fontSize: 24,
                    marginTop: 24,
                    marginRight: 12,
                  }}
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 127,
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 950 }}>
          <div
            style={{ display: "flex", marginBottom: 61, alignItems: "center" }}
          >
            <button
              style={{
                width: 466,
                height: 75,
                fontSize: 24,
                border: "1px solid #dddddd",
                borderRadius: 15,
                background: "#fbfbfb",
                marginRight: 99,
              }}
            >
              + Добавить в список желаемого
            </button>
            <div
              className="statistics"
              style={{
                fontSize: 24,
                width: 284,
                height: 36,
                display: "flex",
                justifyContent: "space-between",
                color: "#80e0a1",
              }}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 6.5625C9.86706 6.5625 3.2511 11.0073 0 17.5C3.2511 23.9927 9.86706 28.4375 17.5 28.4375C25.1327 28.4375 31.7488 23.9927 35 17.5C31.7489 11.0073 25.1327 6.5625 17.5 6.5625ZM26.1287 12.3629C28.185 13.6745 29.9275 15.4314 31.2364 17.5C29.9276 19.5686 28.1849 21.3255 26.1287 22.6371C23.5449 24.2851 20.5611 25.1562 17.5 25.1562C14.4389 25.1562 11.4551 24.2851 8.87134 22.6371C6.81509 21.3254 5.07261 19.5686 3.76373 17.5C5.07254 15.4313 6.81509 13.6745 8.87134 12.3629C9.00525 12.2775 9.14054 12.1947 9.27664 12.1134C8.93628 13.0475 8.75 14.0556 8.75 15.1074C8.75 19.9398 12.6675 23.8574 17.5 23.8574C22.3324 23.8574 26.25 19.9398 26.25 15.1074C26.25 14.0556 26.0637 13.0475 25.7234 12.1133C25.8593 12.1946 25.9947 12.2775 26.1287 12.3629ZM17.5 14.0137C17.5 15.8259 16.031 17.2949 14.2188 17.2949C12.4065 17.2949 10.9375 15.8259 10.9375 14.0137C10.9375 12.2015 12.4065 10.7324 14.2188 10.7324C16.031 10.7324 17.5 12.2015 17.5 14.0137Z"
                  fill="#80E0A1"
                />
              </svg>
              <div>{viewsCount}</div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.9785 4.07611C29.1184 4.07611 32.4707 7.42777 32.4707 11.5594C32.4707 19.0427 24.9785 23.3036 17.4959 30.7869C10.0126 23.3036 2.5293 19.0427 2.5293 11.5595C2.5293 7.42784 5.88164 4.07618 10.0126 4.07618C13.7539 4.07618 15.6249 5.94718 17.4959 9.68848C19.3662 5.94718 21.2372 4.07611 24.9785 4.07611Z"
                  fill="#80E0A1"
                />
              </svg>
              <div>{likesCount}</div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35 9.84383C30.2032 11.4995 26.5488 12.6786 23.3335 16.4064C20.469 19.7281 16.3333 20.8794 11.667 18.6899V30.6249H9.33345V1.09376C9.33337 0.489137 9.85519 0 10.5 0C11.1448 0 11.6669 0.489137 11.6669 1.09376C14.2575 4.62491 18.7601 5.40698 23.3334 5.46887C30.3332 5.5648 35 9.84383 35 9.84383ZM13.9999 24.3531V26.5787C16.7525 27.1066 18.6667 28.2263 18.6667 29.5316C18.6667 31.3431 15.0093 32.8129 10.5 32.8129C5.99058 32.8129 2.33355 31.3431 2.33355 29.5312C2.33355 28.2263 4.24747 27.1067 6.99997 26.5787V24.3531C2.76196 25.0409 0 26.9679 0 29.5311C0 32.7505 4.31802 35 10.5 35C16.6817 35 21 32.7504 21 29.5311C21.0001 26.9679 18.2379 25.0409 13.9999 24.3531Z"
                  fill="#80E0A1"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              padding: "18px 31px 18px 31px",
              border: "1px solid #dddddd",
              borderRadius: 15,
            }}
          >
            <h1 style={{ fontSize: 40, height: 48, margin: 0 }}>Описание</h1>
            <p style={{ fontSize: 24 }}>{description}</p>
          </div>
        </div>
        <div
          style={{
            maxWidth: 466,
            border: "1px solid #dddddd",
            borderRadius: 15,
            padding: "23px 18px 23px 29px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 32 }}>Информация о 3д модели</h2>
          {info?.map((i, index) => (
            <p style={{ fontSize: 32 }} key={index}>
              {i}
            </p>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 121 }}>
        <h1>Похожие товары</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[...products.slice(0, 2), products?.at(-1)].map((p) => (
            <motion.div
              key={p?.id}
              whileHover={{
                scale: 1.05,
                border: "3px solid transparent",
                zIndex: 10,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ProductCard {...p!} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
