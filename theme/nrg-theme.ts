// theme/nrg-theme.ts
import { createTheme } from "@mui/material/styles";
import tokens from "./nrg-tokens"; // generated from your design-tokens.json

type Any = Record<string, any>;

const getPath = (obj: Any, path: string) =>
  path.split(".").reduce<any>((o, k) => (o ? o[k] : undefined), obj);

/** Resolve Tokens Studio aliases like "{global.colors.brand.primary}" into real values */
function resolveAlias(v: any, root: Any): any {
  if (typeof v !== "string") return v;
  const m = v.match(/^\{(.+)\}$/); // "{a.b.c}"
  if (!m) return v;
  const target = getPath(root, m[1]);
  const next =
    typeof target === "object" && target !== null && "value" in target
      ? target.value
      : target;
  return resolveAlias(next, root);
}

/** Read a token path and resolve its .value and any alias indirections. */
function token(path: string, fallback?: string | number): string {
  const node = getPath(tokens as Any, path);
  const raw =
    typeof node === "object" && node !== null && "value" in node
      ? node.value
      : node;
  const resolved = resolveAlias(raw, tokens as Any);
  if (resolved == null) return String(fallback ?? "");
  return String(resolved);
}

/** Parse "16px" -> 16 (MUI expects a number for borderRadius) */
const px = (v: string, fb: number) => {
  const n = parseInt(v.replace("px", ""), 10);
  return Number.isFinite(n) ? n : fb;
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: token("global.colors.brand.primary", "#111827") },
    secondary: { main: token("global.colors.brand.secondary", "#e5e7eb") },
    success: { main: token("global.colors.semantic.success", "#22c55e") },
    warning: { main: token("global.colors.semantic.warning", "#f59e0b") },
    error: { main: token("global.colors.semantic.error", "#ef4444") },

    text: {
      // these two are aliases in your JSON → will resolve to real hex here
      primary: token("light.colors.text.primary", "#111827"),
      secondary: token("light.colors.text.secondary", "#6b7280"),
    },
    background: {
      default: token("light.colors.background.secondary", "#f3f4f6"),
      paper: token("light.colors.background.primary", "#ffffff"),
    },
  },
  shape: {
    borderRadius: px(token("global.borderRadius.xl", "16px"), 16),
  },
  typography: {
    // if you want to use token font sizes too:
    fontSize: px(token("global.typography.fontSize.base", "14px"), 14),
    h4: { fontSize: px(token("global.typography.fontSize.2xl", "24px"), 24) },
    fontWeightRegular: Number(
      token("global.typography.fontWeight.normal", "400")
    ),
    fontWeightMedium: Number(
      token("global.typography.fontWeight.medium", "500")
    ),
    fontWeightSemiBold: Number(
      token("global.typography.fontWeight.semibold", "600")
    ),
    fontWeightBold: Number(token("global.typography.fontWeight.bold", "700")),
    lineHeight: 1.5,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: px(token("global.borderRadius.xl", "16px"), 16) },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: px(token("global.borderRadius.xl", "16px"), 16),
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: px(token("global.borderRadius.lg", "10px"), 10) },
      },
    },
  },
});

export default theme;
