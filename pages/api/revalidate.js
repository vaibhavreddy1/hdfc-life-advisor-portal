export default async function handler(req, res) {
  const { secret, path } = req.query;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({
      ok: false,
    });
  }

  if (!path) {
    return res.status(400).json({
      ok: false,
    });
  }

  try {
    await res.revalidate(path);

    return res.status(200).json({
      ok: true,
      path,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
    });
  }
}