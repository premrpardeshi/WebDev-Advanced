import Image from "next/image";
import revalidate from "./lib/actions/action1";

export default async function Home() {
  // const response = await fetch("https://sum-server.100xdevs.com/todos", {
  //   next: {
  //     revalidate: 5,
  //   },
  // });
  const response = await fetch("https://sum-server.100xdevs.com/todos", {
    next: { tags: ["todos"] },
  });
  const data = await response.json();
  revalidate();

  return (
    <div>
      {data.todos.map((todo: any) => {
        return (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </div>
        );
      })}
    </div>
  );
}
