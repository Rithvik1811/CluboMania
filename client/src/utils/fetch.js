async function getRequest(url) {
  const stream = await fetch(url);
  let incase;
  try {
    incase = stream.clone();
    const data = await stream.json();
    return {
      status: stream.status,
      data,
    };
  } catch (e) {
    const text = await incase.text();
    console.log(text);
  }
}

async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res_data = await response.json();
  return {
    status: response.status,
    data: res_data,
  };
}
async function putRequest(url, data) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res_data = await response.json();
  return {
    status: response.status,
    data: res_data,
  };
}

async function deleteRequest(url, data) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res_data = await response.json();
  return {
    status: response.status,
    data: res_data,
  };
}

const fetchUtil = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
export default fetchUtil;
