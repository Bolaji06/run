import { getCookie } from "@/lib/utils";

const WORKSPACE_API = "http://localhost:3000/api/workspace";

export async function getAllWorkspace(tokenId: string, title: string) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenId,
    },
  };

  try {
    const response = await fetch(`${WORKSPACE_API}?title=${title}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function getWorkSpace(id: string) {
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${WORKSPACE_API}/${id}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function createWorkSpace(username: string, name: string) {
  const tokenId = getCookie("login");
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenId,
    },
    body: JSON.stringify({ name }),
  };

  try {
    const response = await fetch(`${WORKSPACE_API}/${username}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}

export async function updateWorkspace(id: string, contents: string[]) {
  const tokenId = getCookie("login");

  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenId,
    },
    body: JSON.stringify({
      sheetContents: contents,
    }),
  };

  try {
    const response = await fetch(`${WORKSPACE_API}/${id}`, option);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}


