import React from "react";
import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import { Lock, BadgeCheck, Smartphone } from "lucide-react";

export default function FigmaFooter() {
  return (
    <Box asChild>
      <footer style={{ width: "100%" }}>
        {/* Badge row */}
        <Flex
          align="center"
          justify="center"
          wrap="wrap"
          gap="3"
          style={{ width: "100%", padding: "16px 0" }}
        >
          <Flex align="center" gap="1">
            <Lock size={16} color="var(--blue-9)" />
            <Text size="1" color="gray">
              Secure Payment
            </Text>
          </Flex>

          <Separator orientation="vertical" style={{ height: 16 }} />

          <Flex align="center" gap="1">
            <BadgeCheck size={16} color="var(--green-9)" />
            <Text size="1" color="gray">
              EU AFIR Compliant
            </Text>
          </Flex>

          <Separator orientation="vertical" style={{ height: 16 }} />

          <Flex align="center" gap="1">
            <Smartphone size={16} />
            <Text size="1" color="gray">
              Mobile Optimized
            </Text>
          </Flex>
        </Flex>

        {/* Language row */}
        <Flex
          justify="center"
          align="center"
          gap="4"
          style={{ paddingBottom: 16 }}
        >
          <Text size="1" color="gray" as="button">
            EN
          </Text>
          <Text size="1" color="gray" as="button">
            DE
          </Text>
          <Text size="1" color="gray" as="button">
            FR
          </Text>
        </Flex>
      </footer>
    </Box>
  );
}
