export default function Home() {
  return (
    <main>
      <h1>Welcome to {process.env.NEXT_PUBLIC_COMPANY_NAME}</h1>

      <p>
        Advisor portal for managing policies and claims.
      </p>
    </main>
  );
}