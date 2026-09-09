import fs from "fs";
import path from "path";
import Link from "next/link";

export default function Policies({ policies }) {
  return (
    <div>
      <h1>Policy Catalogue</h1>

      <p>{policies.length} policies</p>

      <div>
        {policies.map((policy) => (
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
            <p>Premium: ₹{policy.basePremium}</p>
            <p>Status: {policy.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "policies.json");

  const fileData = fs.readFileSync(filePath, "utf-8");

  const policies = JSON.parse(fileData);

  return {
    props: {
      policies,
    },
    revalidate: 60,
  };
}