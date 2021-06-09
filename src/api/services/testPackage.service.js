import { auth_http, http } from "../config";


export function addTestPackageToUser(TestPackageData) {
  return auth_http.post("tests/addTestPackageToUser",{packageId:TestPackageData});
}
export function getBuyedTestPackages() {
  return auth_http.get("tests/getBuyedTestPackages");
}
export function getAllTestsOfPackage(packageId) {
  return auth_http.get(`tests/getAllTestsOfPackage/${packageId}`,);
}
export function getAllQuestionsAndAnswersOfTest(testId) {
  return auth_http.get(`tests/getAllQuestionsAndAnswersOfTest/${testId}`,);
}
export function getOwnedTestPackages() {
  return auth_http.get(`tests/getOwnedTestPackages`);
}
//create testpack
export function createTestPackage(payload) {
  return auth_http.post(`tests/createTestPackage`,payload);
}
export function createTest(payload) {
  return auth_http.post(`tests/createTest`,payload);
}
export function createQuestion(payload) {
  return auth_http.post(`tests/createQuestion`,payload);
}
export function createAnswer(payload) {
  return auth_http.post(`tests/createAnswer`,payload);
}

export function getAllTestPackages() {
  return http.get("tests/getAllTestPackages");
}

