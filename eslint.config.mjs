import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the explicit any rule
      "@typescript-eslint/no-explicit-any": "off",
      
      // Allow unused variables (for cases where variables are assigned but not used)
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Allow prefer-const rule to be more flexible
      "prefer-const": "warn",
      
      // Allow img elements (for cases where Next.js Image component is not suitable)
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;
