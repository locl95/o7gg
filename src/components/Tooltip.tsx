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
}) => {
  const [show, setShow] = React.useState(false);
  const [{ clientX, clientY }, setCoordinates] = React.useState<{
    clientX: number;
    clientY: number;
  }>({ clientX: 0, clientY: 0 });

  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const getTooltipPosition = () => {
    if (!tooltipRef.current)
      return { left: clientX + offset.x, top: clientY + offset.y };

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;

    let left = clientX + offset.x;
    let top = clientY + offset.y;

    if (left + tooltipRect.width > innerWidth) {
      left = clientX - tooltipRect.width - offset.x;
    }

    if (top + tooltipRect.height > innerHeight) {
      top = clientY - tooltipRect.height - offset.y;
    }

    if (left < 0) {
      left = clientX + offset.x;
    }

    if (top < 0) {
      top = clientY + offset.y;
    }

    return { left, top };
  };

  const position = getTooltipPosition();

  return (
    <React.Fragment>
      {React.cloneElement(children, {
        onMouseEnter: () => setShow(true),
        onMouseLeave: () => setShow(false),
        onMouseMove: (e: React.MouseEvent) =>
          setCoordinates({ clientX: e.clientX, clientY: e.clientY }),
      })}
      {createPortal(
        show && (
          <div
            ref={tooltipRef}
            className="fixed top-0 left-0"
            style={{
              transform: `translate(${position.left}px, ${position.top}px)`,
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
