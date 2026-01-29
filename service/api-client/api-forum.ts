import { apiConfig } from "../api-config";

export async function apiForumCreate({ data }: { data: any }) {
  try {
    const response = await apiConfig.post(`/mobile/forum`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetAll({
  search,
  authorId,
  userLoginId,
  category,
  page,
}: {
  search?: string;
  authorId?: string;
  userLoginId?: string;
  category: "beranda" | "forumku";
  page?: string;
}) {
  const categoryQuery = `?category=${category}`;
  const authorQuery = authorId ? `&authorId=${authorId}` : "";
  const userLoginQuery = userLoginId ? `&userLoginId=${userLoginId}` : "";
  const searchQuery = search ? `&search=${search}` : "";
  const pageQuery = page ? `&page=${page}` : "";
  const query = `${categoryQuery}${authorQuery}${userLoginQuery}${searchQuery}${pageQuery}`;

  try {
    const response = await apiConfig.get(`/mobile/forum${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetOne({ id }: { id: string }) {
  try {
    const response = await apiConfig.get(`/mobile/forum/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumUpdate({ id, data }: { id: string; data: any }) {
  try {
    const response = await apiConfig.put(`/mobile/forum/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumUpdateStatus({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumDelete({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/forum/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumCreateComment({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(`/mobile/forum/${id}/comment`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumGetComment({ id, page = "1" }: { id: string, page?: string }) {
  try {
    const response = await apiConfig.get(`/mobile/forum/${id}/comment?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumDeleteComment({ id }: { id: string }) {
  try {
    const response = await apiConfig.delete(`/mobile/forum/${id}/comment`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function  apiForumGetReportPosting({id}: {id:string}) {
   try {
    const response = await apiConfig.get(`/mobile/forum/${id}/preview-report-posting`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function  apiForumGetReportComment({id}: {id:string}) {
   try {
    const response = await apiConfig.get(`/mobile/forum/${id}/preview-report-comment`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function apiForumCreateReportPosting({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/forum/${id}/report-posting`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function apiForumCreateReportCommentar({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const response = await apiConfig.post(
      `/mobile/forum/${id}/report-commentar`,
      {
        data: data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}