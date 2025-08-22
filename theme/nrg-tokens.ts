// AUTO-GENERATED from design-tokens.json — do not edit
const tokens = {
  "global": {
    "colors": {
      "brand": {
        "primary": {
          "value": "#030213",
          "type": "color",
          "description": "Primary brand color"
        },
        "secondary": {
          "value": "#ececf0",
          "type": "color",
          "description": "Secondary brand color"
        }
      },
      "semantic": {
        "background": {
          "value": "#ffffff",
          "type": "color"
        },
        "foreground": {
          "value": "{global.colors.brand.primary}",
          "type": "color"
        },
        "success": {
          "value": "#22c55e",
          "type": "color"
        },
        "warning": {
          "value": "#f59e0b",
          "type": "color"
        },
        "error": {
          "value": "#d4183d",
          "type": "color"
        }
      },
      "neutral": {
        "50": {
          "value": "#f9fafb",
          "type": "color"
        },
        "100": {
          "value": "#f3f4f6",
          "type": "color"
        },
        "200": {
          "value": "#e5e7eb",
          "type": "color"
        },
        "500": {
          "value": "#6b7280",
          "type": "color"
        },
        "900": {
          "value": "#111827",
          "type": "color"
        }
      }
    },
    "typography": {
      "fontSize": {
        "base": {
          "value": "14px",
          "type": "fontSizes"
        },
        "sm": {
          "value": "12px",
          "type": "fontSizes"
        },
        "lg": {
          "value": "16px",
          "type": "fontSizes"
        },
        "xl": {
          "value": "18px",
          "type": "fontSizes"
        },
        "2xl": {
          "value": "24px",
          "type": "fontSizes"
        }
      },
      "fontWeight": {
        "normal": {
          "value": "400",
          "type": "fontWeights"
        },
        "medium": {
          "value": "500",
          "type": "fontWeights"
        },
        "semibold": {
          "value": "600",
          "type": "fontWeights"
        },
        "bold": {
          "value": "700",
          "type": "fontWeights"
        }
      },
      "lineHeight": {
        "tight": {
          "value": "1.25",
          "type": "lineHeights"
        },
        "normal": {
          "value": "1.5",
          "type": "lineHeights"
        },
        "relaxed": {
          "value": "1.75",
          "type": "lineHeights"
        }
      }
    },
    "spacing": {
      "xs": {
        "value": "4px",
        "type": "spacing"
      },
      "sm": {
        "value": "8px",
        "type": "spacing"
      },
      "md": {
        "value": "16px",
        "type": "spacing"
      },
      "lg": {
        "value": "24px",
        "type": "spacing"
      },
      "xl": {
        "value": "32px",
        "type": "spacing"
      },
      "2xl": {
        "value": "48px",
        "type": "spacing"
      }
    },
    "borderRadius": {
      "sm": {
        "value": "4px",
        "type": "borderRadius"
      },
      "md": {
        "value": "8px",
        "type": "borderRadius"
      },
      "lg": {
        "value": "10px",
        "type": "borderRadius"
      },
      "xl": {
        "value": "16px",
        "type": "borderRadius"
      }
    },
    "shadows": {
      "sm": {
        "value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "type": "boxShadow"
      },
      "md": {
        "value": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "type": "boxShadow"
      },
      "lg": {
        "value": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "type": "boxShadow"
      }
    }
  },
  "light": {
    "colors": {
      "background": {
        "primary": {
          "value": "{global.colors.semantic.background}",
          "type": "color"
        },
        "secondary": {
          "value": "{global.colors.neutral.50}",
          "type": "color"
        }
      },
      "text": {
        "primary": {
          "value": "{global.colors.brand.primary}",
          "type": "color"
        },
        "secondary": {
          "value": "{global.colors.neutral.500}",
          "type": "color"
        }
      }
    }
  },
  "dark": {
    "colors": {
      "background": {
        "primary": {
          "value": "{global.colors.neutral.900}",
          "type": "color"
        },
        "secondary": {
          "value": "{global.colors.neutral.800}",
          "type": "color"
        }
      },
      "text": {
        "primary": {
          "value": "{global.colors.neutral.50}",
          "type": "color"
        },
        "secondary": {
          "value": "{global.colors.neutral.200}",
          "type": "color"
        }
      }
    }
  }
} as const;
export default tokens;
