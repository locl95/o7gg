import React from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
    children: React.ReactElement;
    offset?: { x: number; y: number };
    content: React.ReactElement;
  }

const Tooltip: React.FC<TooltipProps> = ({
    children,
    offset = { x: 0, y: 0 },
    content,
  }: {
    children: React.ReactElement;
    className?: string;
    offset?: { x: number; y: number };
    content: React.ReactElement;
  }) => {
    const [show, setShow] = React.useState(false);
    const [{ clientX, clientY }, setCoordinates] = React.useState<{
      clientX: number;
      clientY: number;
    }>({ clientX: 0, clientY: 0 });
  
    return (
      <React.Fragment>
        {
          React.cloneElement(children, {
            onMouseEnter: () => setShow(true),
            onMouseLeave: () => setShow(false),
            onMouseMove: (e: React.SetStateAction<{ clientX: number; clientY: number; }>) => setCoordinates(e),
          })
        }
        {createPortal(
          show && (
            <div
              className="fixed top-0 left-0"
              style={{
                transform: `translate(${clientX + offset.x}px, ${
                  clientY + offset.y
                }px)`,
              }}
            >
              {content}
            </div>
          ),
          document.body
        )}
      </React.Fragment>
    );
  };

  export default Tooltip;