import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/https://github.com/lee7198/LL11_todo_list.git/",
  plugins: [react()],
});
