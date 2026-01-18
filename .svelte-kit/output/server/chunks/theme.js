import { w as writable } from "./index2.js";
function createThemeStore() {
  const { subscribe, set, update } = writable("light");
  return {
    subscribe,
    toggle: () => {
      update((current) => {
        const newTheme = current === "light" ? "dark" : "light";
        return newTheme;
      });
    }
  };
}
const theme = createThemeStore();
export {
  theme as t
};
