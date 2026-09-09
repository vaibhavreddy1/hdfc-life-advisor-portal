import fs from "fs";
import path from "path";
import { useRouter } from "next/router";

export default function PolicyDetail({ policy }) {
  const router = useRouter();

  return (
    <div>
      <h1>Policy Details</h1>

      <p>Policy id: {router.query.id}</p>

      <div
        style={{
          background: "white",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>{policy.policyNo}</h2>

        <p>{policy.customer}</p>

        <p>{policy.type}</p>

        <p>{policy.basePremium}</p>

        <p>{policy.status}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "policies.json");

  const fileData = fs.readFileSync(filePath, "utf-8");

  const policies = JSON.parse(fileData);

  const paths = policies.map((policy) => ({
    params: {
      id: policy.policyNo,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "policies.json");

  const fileData = fs.readFileSync(filePath, "utf-8");

  const policies = JSON.parse(fileData);

  const policy = policies.find(
    (item) => item.policyNo === params.id
  );

  if (!policy) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      policy,
    },
  };
}