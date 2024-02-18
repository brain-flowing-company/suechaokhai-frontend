import { PersonalInfo } from "@/app/register/page";

export default async function userRegister(personalInfo: PersonalInfo) {
  const formData = new FormData();
  formData.append("email", personalInfo.email);
  formData.append("password", personalInfo.password);
  formData.append("first_name", personalInfo.firstName);
  formData.append("last_name", personalInfo.lastName);
  formData.append(
    "phone_number",
    personalInfo.phoneNumber.replace(/[^\d]/g, "")
  );
  formData.append("profile_image", personalInfo.img);

  console.log(formData.get("email"));

  const response = await fetch("http://localhost:8000/api/v1/register", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch register");
  }
  return await response.json();
}