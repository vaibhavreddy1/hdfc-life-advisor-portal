import Link from "next/link";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <h1>HDFC Life Advisor Portal</h1>

        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/policies">Policies</Link>
          {" | "}
          <Link href="/claims">Claims</Link>
          {" | "}
          <Link href="/claims/new">File a Claim</Link>
          {" | "}
          <Link href="/desk">Advisor Desk</Link>
        </nav>
      </header>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}