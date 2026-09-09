import fs from "fs";
import path from "path";

export default function Claims({ claims }) {
  return (
    <div>
      <h1>Claims Desk</h1>

      <p>{claims.length} claims</p>

      {claims.map((claim) => (
        <div
          key={claim.claimNo}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>{claim.claimNo}</h2>

          <p>Policy: {claim.policyNo}</p>
          <p>Customer: {claim.customer}</p>
          <p>Claim Amount: ₹{claim.claimAmount}</p>
          <p>Urgency: {claim.urgency}</p>
          <p>Status: {claim.status}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(
    process.cwd(),
    "data",
    "claims.json"
  );

  const fileData = fs.readFileSync(filePath, "utf-8");

  const claims = JSON.parse(fileData);

  return {
    props: {
      claims,
    },
  };
}