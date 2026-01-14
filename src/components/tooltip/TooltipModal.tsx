import React, { useMemo, useRef, useState } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "theme/index";
import { IAppTooltipProps } from ".";
import { styles } from "./tooltip.styles";

interface ITooltipModalProps extends Omit<IAppTooltipProps, 'type'> {
}

export const TooltipModal = React.memo((props: ITooltipModalProps) => {
  const { children, tooltipContent, side, triangularColor } = props;
  const ref = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const theme = useAppTheme();

  const measure = () => {
    ref.current?.measureInWindow((x, y, w, h) => {
      setPos({ x, y, w, h });
    });
  };

  const tooltipStyle = useMemo(() => {
    switch (side) {
      case 'top':
        return { top: (pos.y - pos.h - 10) - 1, left: pos.x };
      case 'bottom':
        return { top: (pos.y + pos.h + 10) - 1, left: pos.x };
      case 'left':
        return { top: pos.y, left: (pos.x - pos.w - 10) };
      case 'right':
        return { top: pos.y, left: (pos.x + pos.w + 10) };
    }
  }, [pos, side]);

  return (
    <>
      {/* ===== Trigger nằm TRONG layout bình thường ===== */}
      <View ref={ref} onLayout={measure}>
        <Pressable onPress={() => {
          setIsOpen(true)
        }}>
          {children}
        </Pressable>
        {/* ===== Tooltip overlay ===== */}
        <Modal visible={isOpen} transparent={true} animationType="fade">
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: `${theme.color.bg.white}80` }}
            activeOpacity={1}
            onPress={() => {
              setIsOpen(false);
            }}
          >
            <TriangularView pos={pos} side={side} triangularColor={triangularColor} />
            <View style={[{ position: 'absolute' }, tooltipStyle]} pointerEvents="box-none">
              {tooltipContent}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </>
  );
})

interface ITriangularViewProps extends Pick<IAppTooltipProps, 'side' | 'triangularColor'> {
  pos: { x: number; y: number; w: number; h: number };
}

const TriangularView = React.memo((props: ITriangularViewProps) => {
  const { side, pos, triangularColor } = props;

  const triangularViewStyle = useMemo(() => {
    switch (side) {
      case 'top':
        return { ...styles.triangularViewBottom, borderTopColor: triangularColor };
      case 'bottom':
        return { ...styles.triangularViewTop, borderBottomColor: triangularColor };
      case 'left':
        return { ...styles.triangularViewRight, borderLeftColor: triangularColor };
      case 'right':
        return { ...styles.triangularViewLeft, borderRightColor: triangularColor };
    }
  }, [side, triangularColor]);

  const absoluteStyle = useMemo(() => {
    switch (side) {
      case 'top':
        return { top: pos.y - pos.h / 2, left: pos.x + (pos.w - 20) / 2 };
      case 'bottom':
        return { top: pos.y + pos.h, left: pos.x + (pos.w - 20) / 2 };
      case 'left':
        return { top: pos.y + 2, left: pos.x - 10 };
      case 'right':
        return { top: pos.y + 2, left: pos.x + pos.w };
    }
  }, [side, pos]);

  return <View style={[{ zIndex: 999, position: 'absolute' }, absoluteStyle]} pointerEvents="box-none">
    <View style={triangularViewStyle} />
  </View>
})