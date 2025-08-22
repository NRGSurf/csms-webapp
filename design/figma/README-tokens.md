# Design Tokens Integration with Tokens Studio

## Overview

This project is set up to work with Tokens Studio for Figma, allowing you to manage design tokens in Figma and sync them with your code.

## Setup Process

### 1. Install Tokens Studio in Figma

1. Open Figma
2. Go to Community → Plugins
3. Search for "Tokens Studio for Figma"
4. Install the plugin

### 2. Configure Tokens Studio

1. Open your Figma file
2. Launch Tokens Studio plugin
3. Import the `/tokens/design-tokens.json` file as a starting point
4. Set up your token structure in Figma

### 3. Token Structure

Our tokens are organized into:

- **Global tokens**: Base values (colors, typography, spacing)
- **Light theme tokens**: Light mode specific values
- **Dark theme tokens**: Dark mode specific values

### 4. Sync Workflow

#### Option A: Manual Export
1. Export tokens from Tokens Studio as JSON
2. Replace `/tokens/design-tokens.json` with exported file
3. Run the CSS generation script (if you have Node.js locally)

#### Option B: GitHub Integration (Recommended)
1. Set up GitHub integration in Tokens Studio
2. Configure automatic commits to your repository
3. Set up GitHub Actions to regenerate CSS on token updates

### 5. Current CSS Integration

Your current `/styles/globals.css` already follows design token patterns:

```css
:root {
  --font-size: 14px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  /* ... more tokens */
}
```

### 6. Benefits of Using Tokens Studio

- **Single source of truth**: Manage all design decisions in Figma
- **Design-dev sync**: Automatically sync changes between design and code
- **Theme management**: Easy switching between light/dark themes
- **Consistency**: Ensure design consistency across your application
- **Collaboration**: Designers can update tokens without touching code

### 7. Integration with Your EV Charging Portal

For your EV charging portal, you could create semantic tokens like:

```json
{
  "semantic": {
    "charging": {
      "available": { "value": "#22c55e" },
      "busy": { "value": "#f59e0b" },
      "error": { "value": "#d4183d" }
    },
    "pricing": {
      "primary": { "value": "#030213" },
      "accent": { "value": "#3b82f6" }
    }
  }
}
```

### 8. Next Steps

1. Install Tokens Studio in your Figma workspace
2. Import the sample token structure
3. Customize tokens to match your brand
4. Set up automated sync (GitHub integration)
5. Update your components to use semantic token names

## Example Usage in Components

Instead of hardcoded colors:
```tsx
<div className="bg-green-500 text-white">Available</div>
```

Use semantic tokens:
```tsx
<div className="bg-charging-available text-charging-available-foreground">Available</div>
```

This approach makes your design system more maintainable and allows non-developers to update the visual design through Figma.