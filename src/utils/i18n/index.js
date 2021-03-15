import { get } from "lodash";
import { general, home, login, register, user, users } from "./pages";
import { useGlobal } from "reactn";
import { english, spanish } from "./flags";

const i18nJson = {
  general,
  login,
  register,
  home,
  users,
  user,
};

export const languages = [
  { code: "en", name: "English", flag: english },
  { code: "es", name: "Español", flag: spanish },
];

export const useI18n = () => {
  const [globalCurrentLanguageCode] = useGlobal("currentLanguageCode");

  return (findField, _default = "Not found") =>
    get(i18nJson, [...findField, globalCurrentLanguageCode], _default);
};
