import { apiConfig } from "../api-config";

export async function apiUser(id: string) {
  const response = await apiConfig.get(`/mobile/user/${id}`);
  return response.data;
}

export async function apiAllUser({ search }: { search: string }) {
  const response = await apiConfig.get(`/mobile/user?search=${search}`);
  return response.data;
}

export async function apiDeleteUser({id}:{id: string}) {
  const response = await apiConfig.delete(`/mobile/user/${id}`);
  return response.data;
}

export async function apiForumBlockUser({
  data,
}: {
  data: {
    // Id yang di blokir
    blockedId: string;
    // Id yang melakukan blokir
    blockerId: string;
    menuFeature: "Event" | "Forum";
  };
}) {
  console.log("[FETCH API]", data);
  try {
    const response = await apiConfig.post(`/mobile/block-user`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiAcceptForumTerms({category, userId}:{category:"Forum" | "Event", userId: string}) {
  try {
    const response = await apiConfig.post(`/mobile/user/${userId}/terms-of-app?category=${category}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
    
