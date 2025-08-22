import React from "react";
import { Flex, Text, Separator } from "@radix-ui/themes";
import { Lock, BadgeCheck, Smartphone } from "lucide-react";

export default function FigmaFooter() {
  return (
    <Flex direction="column" align="center" gap="3" mt="6" mb="5">
      <Flex align="center" gap="3">
        <Flex align="center" gap="1">
          <Lock size={16} color="var(--blue-9)" />
          <Text size="1" color="gray">Secure Payment</Text>
        </Flex>
        <Separator orientation="vertical" />
        <Flex align="center" gap="1">
          <BadgeCheck size={16} color="var(--green-9)" />
          <Text size="1" color="gray">EU AFIR Compliant</Text>
        </Flex>
        <Separator orientation="vertical" />
        <Flex align="center" gap="1">
          <Smartphone size={16} />
          <Text size="1" color="gray">Mobile Optimized</Text>
        </Flex>
      </Flex>
      <Flex align="center" gap="4">
        <Text size="1" color="gray" as="button">EN</Text>
        <Text size="1" color="gray" as="button">DE</Text>
        <Text size="1" color="gray" as="button">FR</Text>
      </Flex>
    </Flex>
  );
}
