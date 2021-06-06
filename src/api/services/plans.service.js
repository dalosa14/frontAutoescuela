import { http } from "../config";

export function getPlans() {
  return http.get("plans");
}
