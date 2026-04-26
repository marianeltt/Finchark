import React from "react";

interface Props {
  title: string;
  subTitle: string;
}

const Tile = ({ title, subTitle }: Props) => {
  return (
    <div className="w-full sm:w-1/2 xl:w-1/4 px-2">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs break-words">
                {title}
              </h5>
              <span className="font-bold text-xl break-words">
                {subTitle}
              </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;