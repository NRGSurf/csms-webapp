import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { CheckCircle2 } from "lucide-react";

type Props = { labels: string[]; currentIndex: number; className?: string };

export default function FigmaStepper({ labels, currentIndex }: Props) {
  const total = Math.max(labels.length, 1);
  const pct = Math.min(100, Math.max(0, ((currentIndex + 1) / total) * 100));

  return (
    <Box>
      <Flex justify="between" align="center" mb="1">
        {labels.map((label, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const bg = isCompleted
            ? "var(--green-9)"
            : isActive
            ? "var(--blue-9)"
            : "var(--gray-5)";
          const color = isCompleted || isActive ? "white" : "var(--gray-11)";
          return (
            <Flex key={label} direction="column" align="center" gap="1">
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9999,
                  background: bg,
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : index + 1}
              </Box>
              <Text size="1" color="gray">
                {label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      <Box
        style={{
          width: "100%",
          height: 8,
          borderRadius: 9999,
          background: "var(--gray-5)",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--blue-9)",
            borderRadius: 9999,
            transition: "width .3s ease",
          }}
        />
      </Box>
    </Box>
  );
}
