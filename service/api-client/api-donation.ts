import { apiConfig } from "../api-config";

export async function apiDonationCreate({
  data,
  category,
}: {
  data: any;
  category: "temporary" | "permanent";
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/donation?category=${category}`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetOne({
  id,
  category,
}: {
  id: string;
  category: "temporary" | "permanent";
}) {
  try {
    const response = await apiConfig.get(
      `/mobile/donation/${id}?category=${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationGetByStatus({
  authorId,
  status,
}: {
  authorId: string;
  status: string;
}) {
  const authorQuery = `/${authorId}`;
  const statusQuery = `/${status}`;

  try {
    const response = await apiConfig.get(
      `/mobile/donation${authorQuery}${statusQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationUpdateStatus({
  id,
  status,
}: {
  id: string;
  status: "draft" | "review" | "publish" | "reject";
}) {
  try {
    const response = await apiConfig.put(`/mobile/donation/${id}/${status}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiDonationDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/donation/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
