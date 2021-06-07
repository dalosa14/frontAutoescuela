import { auth_http, http } from "../config";

export function createTestPackage(TestPackageData) {
  return auth_http.post("tests/createTestPackage",TestPackageData);
}
export function addTestPackageToUser(TestPackageData) {
  return auth_http.post("tests/addTestPackageToUser",{packageId:TestPackageData});
}
export function getBuyedTestPackages() {
  return auth_http.get("tests/getBuyedTestPackages");
}
export function getAllTestsOfPackage(packageId) {
  return auth_http.get(`tests/getAllTestsOfPackage/${packageId}`,);
}

export function getAllTestPackages() {
  return http.get("tests/getAllTestPackages");
}

