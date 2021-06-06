import { auth_http } from "../config";

export function getBillingsAddresses() {
  return auth_http.get("profile/billingaddresses");
}

export function createBillingsAddress(new_address) {
  return auth_http.post("profile/billingaddresses/create", new_address);
}

export function updateBillingsAddress(new_address) {
  return auth_http.put("profile/billingaddresses/update", new_address);
}