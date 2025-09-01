import axios from "axios";
import { API_BASE_URL } from "../api-config";

const url = `${API_BASE_URL}/mobile/file`;

export async function apiFileUpload({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      // timeout: 30000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiFileDelete({
  token,
  id,
}: {
  token: string;
  id: string;
}) {
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // timeout: 30000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
