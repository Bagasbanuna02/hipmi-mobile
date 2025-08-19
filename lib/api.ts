const API_BASE = (path: string) => {
//   const url = "https://stg-hipmi.wibudev.com/";
    const url = "http://172.20.173.254:3000/";
  return `${url}/${path}`;
};

export async function apiVersion() {
  const response = await fetch(API_BASE("api/version"));
  const data = await response.json();
  return data;
}

export async function apiLoginBack({ nomor }: { nomor: string }) {
  const response = await fetch(API_BASE("api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nomor: nomor }),
  });
  const data = await response.json();
  return data;
}
