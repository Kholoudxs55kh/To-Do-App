'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/api/task")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setTasks(data.data)});
        // console.log(tasks)
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Here will be our TO-DO-APP</h1>
        <ul>
          {tasks && tasks.map((task: taskI) => (
            <li key={task.id}>{`- ${task.name}`}</li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
