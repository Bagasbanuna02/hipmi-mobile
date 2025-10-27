import { apiConfig } from "../api-config";

export async function apiValidationEmail({ email }: { email: string }) {
  const response = await apiConfig.post(`/mobile/validate/email`, {
    data: email,
  });
  return response.data;
}
