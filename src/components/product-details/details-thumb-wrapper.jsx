import Image from "next/image";
import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({
  productItem,
  activeIndex,
  setActiveIndex,
  imgWidth = 416,
  imgHeight = 480,
  // videoId = true,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { variants, videoId, status } = productItem || {};

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav>
          <div className="nav nav-tabs flex-sm-column">
            {variants?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${
                  item.img === variants[activeIndex]?.img ? "active" : ""
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <Image
                  src={item.img}
                  alt="image"
                  width={78}
                  height={100}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                />
              </button>
            ))}

            {videoId && (
              <button
                onClick={() => setIsVideoOpen(true)}
                style={{
                  background: "purple",
                  width: "78px",
                  height: "100px",
                  padding: "16px",
                  borderRadius: "12px",
                }}
              >
                <a
                  className="cursor-pointer popup-video"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-play" color="white"></i>
                </a>
              </button>
            )}
          </div>
        </nav>

        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <Image
                src={variants[activeIndex]?.img}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default DetailsThumbWrapper;
