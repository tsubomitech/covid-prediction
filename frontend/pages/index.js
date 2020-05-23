import Link from "next/link";
import Layout from "../components/layout";
export default function Home() {
  return (
    <Layout>
      <div className="grid">
        <a href="" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Find information about features</p>
        </a>

        <Link href="/try">
          <a href="" className="card">
            <h3>Try API&rarr;</h3>
            <p>Test the API</p>
          </a>
        </Link>

        <a href="" className="card">
          <h3>News &rarr;</h3>
          <p>Latest Updates</p>
        </a>

        <a href="" className="card">
          <h3>About &rarr;</h3>
          <p>Why we're working on this problem</p>
        </a>
      </div>
    </Layout>
  );
}
