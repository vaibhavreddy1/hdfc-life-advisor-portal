import fs from "fs";
import path from "path";
import Link from "next/link";

export default function PolicyCategory({ policies, slug }) {
  return (
    <div>
      <h1>Policy Category</h1>

      <p>Category: {slug.join(" / ")}</p>

      {policies.length === 0 ? (
        <p>No policies found.</p>
      ) : (
        policies.map((policy) => (
          <div
            key={policy.policyNo}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h2>
              <Link href={`/policies/${policy.policyNo}`}>
                {policy.policyNo}
              </Link>
            </h2>

            <p>Customer: {policy.customer}</p>
            <p>Type: {policy.type}</p>
            <p>Status: {policy.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "policies.json");

  const fileData = fs.readFileSync(filePath, "utf-8");

  const allPolicies = JSON.parse(fileData);

  const slug = params.slug;

  const type = slug[0]?.toLowerCase();
  const status = slug[1]?.toLowerCase();

  const policies = allPolicies.filter((policy) => {
    const typeMatches = policy.type.toLowerCase() === type;

    const statusMatches =
      !status || policy.status.toLowerCase() === status;

    return typeMatches && statusMatches;
  });

  return {
    props: {
      policies,
      slug,
    },
  };
}