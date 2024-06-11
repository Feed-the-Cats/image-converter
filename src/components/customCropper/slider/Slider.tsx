import { cn } from "@/lib/utils";
import React, { PureComponent } from "react";

interface Props {
  className?: string;
  onChange?: (value: number) => void;
  value?: number;
  showValue?: boolean;
}

export class Slider extends PureComponent<Props> {
  line = React.createRef<HTMLDivElement>();

  state = {
    focus: false,
    width: 0,
  };

  componentDidMount() {
    window.addEventListener("resize", this.recalculateWidth);
    window.addEventListener("orientationchange", this.recalculateWidth);

    window.addEventListener("mouseup", this.onStop, { passive: false });
    window.addEventListener("mousemove", this.onDrag, { passive: false });
    window.addEventListener("touchmove", this.onDrag, { passive: false });
    window.addEventListener("touchend", this.onStop, { passive: false });

    const line = this.line.current;
    if (line) {
      line.addEventListener("mousedown", this.onStart);
      line.addEventListener("touchstart", this.onStart);
    }

    this.recalculateWidth();
  }
  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onStop);
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("touchmove", this.onDrag);
    window.removeEventListener("touchend", this.onStop);

    window.removeEventListener("resize", this.recalculateWidth);
    window.removeEventListener("orientationchange", this.recalculateWidth);

    const line = this.line.current;
    if (line) {
      line.removeEventListener("mousedown", this.onStart);
      line.removeEventListener("touchstart", this.onStart);
    }
  }
  onDrag = (e: MouseEvent | TouchEvent) => {
    const { onChange } = this.props;
    if (this.state.focus) {
      const position = "touches" in e ? e.touches[0].clientX : e.clientX;
      const line = this.line.current;

      if (line) {
        const { left, width } = line.getBoundingClientRect();

        if (onChange) {
          onChange(
            Math.max(
              -1,
              Math.min(1, (2 * (position - left - width / 2)) / width),
            ),
          );
        }
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
  };
  onStop = () => {
    this.setState({
      focus: false,
    });
  };
  onStart = (e: MouseEvent | TouchEvent) => {
    this.setState({
      focus: true,
    });
    this.onDrag(e);
  };
  recalculateWidth = () => {
    const line = this.line.current;
    if (line) {
      this.setState({
        width: line.clientWidth,
      });
    }
  };
  render() {
    const { value = 0, className } = this.props;
    const handleInsideDot = this.state.width
      ? Math.abs(value) <= 16 / this.state.width
      : true;

    const fillWidth = `${Math.abs(value) * 50}%`;
    const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;
    const formattedValue = `${value > 0 ? "+" : ""}${Math.round(100 * value)}`;

    return (
      <div
        className={cn(
          "flex h-5 w-full max-w-96 cursor-pointer flex-col items-center justify-center rounded-xl bg-slider px-4",
          className,
        )}
        ref={this.line}
      >
        <div
          className={cn("relative flex h-0.5 w-full items-center bg-white/50")}
        >
          <div
            className={cn(
              "absolute h-0.5 shrink-0 basis-auto flex-col self-stretch bg-white",
            )}
            style={{
              width: fillWidth,
              left: fillLeft,
            }}
          />
          <div
            className={cn(
              "absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
            )}
          />
          <div
            className={cn(
              "absolute -top-5 flex -translate-x-1/2 items-center justify-center align-bottom text-[10px] font-medium text-white transition-all duration-75",
              handleInsideDot ? "image-editor-slider__value--hidden" : "",
            )}
            style={{
              left: `${Math.abs(value * 50 + 50)}%`,
            }}
          >
            {formattedValue}
          </div>
          <div
            className={cn(
              "absolute flex h-2 w-0.5 items-center justify-center bg-white transition-[height] hover:h-3",
              this.state.focus ? "h-3" : "",
              handleInsideDot ? "h-1" : "",
            )}
            style={{
              left: `${value * 50 + 50}%`,
            }}
          />
        </div>
      </div>
    );
  }
}
