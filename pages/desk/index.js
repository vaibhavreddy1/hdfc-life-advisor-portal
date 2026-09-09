import { getSession } from "next-auth/react";

export default function Desk({ session }) {
  return (
    <div>
      <h1>Advisor Desk</h1>

      <p>{session.user.email}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}