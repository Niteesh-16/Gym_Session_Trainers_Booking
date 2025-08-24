import React from "react";

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="mt-20 min-h-screen w-full grid grid-cols-4 grid-rows-2 gap-7 max-lg:grid-cols-2 max-lg:grid-rows-4 max-lg:gap-4 max-sm:grid-cols-1 max-sm:grid-rows-5 max-sm:gap-x-0"
    >
      <div className="h-screen row-span-2 col-span-2 max-lg:row-span-2 max-lg:h-[49vh] relative bg-gallery-pattern1 bg-cover max-sm:row-span-1 max-sm:col-span-1">
        <div className="w-full absolute top-[50%] left-[-50%] translate-x-[-50%] translate-y-[-50%] text-center z-10">
          <h1 className="text-4xl text-white font-medium mb-2">
            Best fitness gallery
          </h1>
          <p className="font text-xl text-slate-200">Fitness Body</p>
        </div>
      </div>

      <div className="h-full w-full relative overflow-hidden bg-gallery-pattern2 bg-cover">
        <div className="w-full absolute top-[50%] left-[-50%] translate-x-[-50%] translate-y-[-50%] text-center z-10">
          <h1 className="text-4xl text-white font-medium mb-2">
            Best fitness gallery
          </h1>
          <p className="font text-xl text-slate-200">Fitness Body</p>
        </div>
      </div>

      <div className="h-full w-full relative overflow-hidden bg-gallery-pattern3 bg-right bg-cover">
        <div className="w-full absolute top-[50%] left-[-50%] translate-x-[-50%] translate-y-[-50%] text-center z-10">
          <h1 className="text-4xl text-white font-medium mb-2">
            Best fitness gallery
          </h1>
          <p className="font text-xl text-slate-200">Fitness Body</p>
        </div>
      </div>

      <div className="h-full w-full relative overflow-hidden bg-gallery-pattern4 bg-cover">
        <div className="w-full absolute top-[50%] left-[-50%] translate-x-[-50%] translate-y-[-50%] text-center z-10">
          <h1 className="text-4xl text-white font-medium mb-2">
            Best fitness gallery
          </h1>
          <p className="font text-xl text-slate-200">Fitness Body</p>
        </div>
      </div>

      <div className="h-full w-full relative overflow-hidden bg-gallery-pattern5 bg-cover">
        <div className="w-full absolute top-[50%] left-[-50%] translate-x-[-50%] translate-y-[-50%] text-center z-10">
          <h1 className="text-4xl text-white font-medium mb-2">
            Best fitness gallery
          </h1>
          <p className="font text-xl text-slate-200">Fitness Body</p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
