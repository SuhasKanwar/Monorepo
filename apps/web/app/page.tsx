import Link from "next/link";
import styles from "./page.module.css";
import { prismaClient } from "db/client";

type User = {
  id: string;
  username: string;
  password: string;
};

export default async function Home() {
  const users: User[] = await prismaClient.user.findMany();
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Welcome to the Web App</h1>
        <p className={styles.description}>
          This is a dummy monorepo app just for try CI/CD using Docker on the prodcution server.
        </p>
        <p>
          This data is being fetched from the PG database.
        </p>
      </section>
      <section className={styles.scrollable}>
      {users?.map((user: User) => (
        <div key={user.id}>
          Name: {user.username} - Password: {user.password}
        </div>
      ))}
      </section>

      <Link href="https://www.linkedin.com/in/suhas-kanwar-4a3a09291" target="_blank" rel="noopener noreferrer">
        Made by Suhas Kanwar.
      </Link>
    </div>
  );
}