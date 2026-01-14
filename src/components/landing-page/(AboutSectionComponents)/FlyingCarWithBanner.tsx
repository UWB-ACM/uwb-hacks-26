import React from "react";
  import Image from "next/image";

  export default function FlyingCarWithBanner() {
      return (
          <div className="relative w-full pb-[200px]">
              {/* Banner and Car positioned in the middle area */}
              <div className="relative z-30 flex items-center justify-center pt-16 pb-8">
                  {/* Banner with text */}
                  <Image
                      src="/about/banner1.png"
                      alt="Banner"
                      width={600}
                      height={140}
                      priority
                  />

                  {/* Flying Car */}
                  <Image
                      src="/about/FlyingCar.png"
                      alt="Flying Car"
                      width={300}
                      height={200}
                      priority
                      className="-ml-8"
                  />
              </div>

              {/* HALL-E positioned in front of skyline */}
              <div className="absolute left-[30%] bottom-[160px] z-20">
                  <Image
                      src="/about/HALL-E.png"
                      alt="HALL-E Robot"
                      width={160}
                      height={160}
                      priority
                  />
              </div>

              {/* City Skyline - at the bottom */}
              <div className="absolute bottom-[60px] left-0 w-full z-10">
                  <Image
                      src="/about/skyline.png"
                      alt="City Skyline"
                      width={1920}
                      height={250}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                  />
              </div>

              {/* Grass - at the very bottom */}
              <div className="absolute bottom-0 left-0 w-full z-15">
                  <Image
                      src="/about/Grass.png"
                      alt="Grass"
                      width={1920}
                      height={80}
                      style={{ width: '100%', height: 'auto' }}
                      priority
                  />
              </div>
          </div>
      );
  }