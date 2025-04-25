import api from '../api';

export const getPosts = async (nextUrl?: string) => {
  const nextUrlToGet = nextUrl ? nextUrl.split('careers/')[1] : ''

  const response = await api
    .get(nextUrlToGet)
    .then((response) => response.data)
    .catch(() => {throw 'Failed to get posts!'});

  return response;
};

export const createPostEndpoint = async (payload: Carrer.CreatePayload) => {
  const response = await api
    .post('', payload)
    .then((response) => response.data)
    .catch(() => {throw 'Failed to create post!'});

  return response;
};

export const updatePostEndpoint = async (payload: Carrer.UpdatePayload) => {
  const response = await api
    .patch(`${payload.id}/`, {
      title: payload.title,
      content: payload.content,
    })
    .then((response) => response.data)
    .catch(() => {throw 'Failed to update post!'});

  return response;
};

export const deletePostEndpoint = async (id: number) => {
  const response = await api
    .delete(`${id}/`)
    .then()
    .catch(() => {throw 'Failed to delete post!'});

  return response;
};
