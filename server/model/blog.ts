import { sql } from '~~/server/db';

export type BlogModel = {
  id: number;
  title: string;
  content: string;
  created_date: string;
};

export const read = async () => {
  const result = await sql({
    query: 'SELECT id, title, content, created_date FROM blog'
  });

  return result as BlogModel[];
};

export const create = async (data: Pick<BlogModel, 'title' | 'content'>) => {
  const result = (await sql({
    query: `
      INSERT INTO blog (
        title,
        content
      ) VALUES (
        ?,
        ?
      ) RETURNING *
    `,
    values: [data.title, data.content]
  })) as any;

  return result.length === 1 ? (result[0] as BlogModel) : null;
};

export const detail = async (id: string) => {
  const result = (await sql({
    query: 'SELECT id, title, content, created_date FROM blog WHERE id = ?',
    values: [id]
  })) as any;

  return result.length === 1 ? (result[0] as BlogModel) : null;
};

export const update = async (id: string, data: Pick<BlogModel, 'title' | 'content'>) => {
  await sql({
    query: `
      UPDATE blog
      SET
        title = ?,
        content = ?
      WHERE id = ?
    `,
    values: [data.title, data.content, id]
  });

  return await detail(id);
};

export const remove = async (id: string) => {
  await sql({
    query: 'DELETE FROM blog WHERE id = ?',
    values: [id]
  });

  return true;
};
