import React, { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = "",
  pauseOnHover = false,
  reverse = false,
}) => {
  return (
    <div
      className={`marquee-container ${className} ${reverse ? "reverse" : ""}`}
      onMouseEnter={pauseOnHover ? () => console.log("Paused") : undefined}
      onMouseLeave={pauseOnHover ? () => console.log("Resumed") : undefined}
    >
      {children}
    </div>
  );
};

export default Marquee;
