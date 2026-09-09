export default function Docs({ slug }) {
  return (
    <div>
      <h1>Advisor Docs</h1>

      {slug && (
        <p>{slug.join("/")}</p>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug || [],
    },
  };
}