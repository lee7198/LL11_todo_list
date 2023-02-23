import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/https://lee7198.github.io/LL11_todo_list//",
  plugins: [react()],
});
