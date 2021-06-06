import { http } from "../config";

export function getPages() {
  return http.get("pages");
}