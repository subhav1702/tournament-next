import Login from '@/components/login';
import prisma from '@/lib/prisma'

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <Login />
  );
}
