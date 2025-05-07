"use client";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
}
