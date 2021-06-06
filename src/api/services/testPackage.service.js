import { auth_http, http } from "../config";

export function createTestPackage(TestPackageData) {
  return auth_http.post("tests/createTestPackage",TestPackageData);
}

export function getAllTestPackages() {
  return http.get("tests/getAllTestPackages");
}

