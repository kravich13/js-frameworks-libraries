interface IUsersData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getData() {
  const data: IUsersData[] = [];

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 } });
    const resData = await res.json();

    data.push(...resData);
  } catch (err) {
    console.log(err);
  }

  return data;
}

export default async function Users() {
  const users = await getData();

  return (
    <div>
      <h1>Users</h1>
      {users.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
    </div>
  );
}
