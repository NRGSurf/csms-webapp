/**
 * Script to convert design tokens to CSS custom properties
 * This would typically be run as part of your build process
 * to sync tokens from Tokens Studio exports
 */

const fs = require('fs');
const path = require('path');

// This would typically read from a tokens export from Tokens Studio
const tokens = require('../tokens/design-tokens.json');

function flattenTokens(obj, prefix = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.type) {
      // This is a token with a value
      result[newKey] = value.value;
    } else if (value && typeof value === 'object') {
      // This is a group, recurse
      Object.assign(result, flattenTokens(value, newKey));
    }
  }
  
  return result;
}

function resolveTokenReferences(tokens) {
  const resolved = { ...tokens };
  
  // Simple reference resolution (handles {global.colors.brand.primary} syntax)
  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const reference = value.slice(1, -1);
      const path = reference.split('.');
      
      let resolvedValue = tokens;
      for (const segment of path) {
        resolvedValue = resolvedValue?.[segment];
      }
      
      if (resolvedValue && typeof resolvedValue === 'object' && resolvedValue.value) {
        resolved[key] = resolvedValue.value;
      }
    }
  }
  
  return resolved;
}

function generateCSS() {
  const globalTokens = flattenTokens(tokens.global);
  const lightTokens = flattenTokens(tokens.light);
  const darkTokens = flattenTokens(tokens.dark);
  
  const resolvedGlobal = resolveTokenReferences(globalTokens);
  const resolvedLight = resolveTokenReferences({ ...globalTokens, ...lightTokens });
  const resolvedDark = resolveTokenReferences({ ...globalTokens, ...darkTokens });
  
  let css = `/* Generated from design tokens - DO NOT EDIT MANUALLY */\n\n`;
  
  // Root variables (light theme)
  css += `:root {\n`;
  for (const [key, value] of Object.entries(resolvedLight)) {
    css += `  --${key}: ${value};\n`;
  }
  css += `}\n\n`;
  
  // Dark theme variables
  css += `.dark {\n`;
  for (const [key, value] of Object.entries(resolvedDark)) {
    if (resolvedDark[key] !== resolvedLight[key]) {
      css += `  --${key}: ${value};\n`;
    }
  }
  css += `}\n\n`;
  
  // Tailwind theme configuration
  css += `@theme inline {\n`;
  for (const [key, value] of Object.entries(resolvedGlobal)) {
    const tailwindKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (key.startsWith('colors')) {
      css += `  --color-${tailwindKey.replace('colors-', '')}: var(--${key});\n`;
    } else if (key.startsWith('spacing')) {
      css += `  --spacing-${tailwindKey.replace('spacing-', '')}: var(--${key});\n`;
    } else if (key.startsWith('fontSize')) {
      css += `  --text-${tailwindKey.replace('font-size-', '')}: var(--${key});\n`;
    }
  }
  css += `}\n`;
  
  return css;
}

// Generate and write CSS
const generatedCSS = generateCSS();
const outputPath = path.join(__dirname, '../styles/tokens.css');

fs.writeFileSync(outputPath, generatedCSS);
console.log(`✅ Generated CSS tokens at ${outputPath}`);

module.exports = { generateCSS, flattenTokens, resolveTokenReferences };