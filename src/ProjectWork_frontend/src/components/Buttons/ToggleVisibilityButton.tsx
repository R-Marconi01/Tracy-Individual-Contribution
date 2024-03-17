import React from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { ThreeCircles } from "react-loader-spinner";

interface ToggleVisibilityButtonProps {
  isVisible: boolean;
  onClick: () => void;
  processing: boolean;
}

const ToggleVisibilityButton: React.FC<ToggleVisibilityButtonProps> = ({ isVisible, onClick, processing }) => {
  return (
    <button onClick={onClick} className="px-2 py-1.5 rounded-md bg-blue-500 text-white flex items-center">
    {processing ? (
      <ThreeCircles
        height="20"
        width="20"
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    ) : isVisible ? (
      <><EyeIcon className="h-5 w-5 mr-1" />Hide</>
    ) : (
      <><EyeOffIcon className="h-5 w-5 mr-1" />Unhide</>
    )}
  </button>
);
};

export default ToggleVisibilityButton;