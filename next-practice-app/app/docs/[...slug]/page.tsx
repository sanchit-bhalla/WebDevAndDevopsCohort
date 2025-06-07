export default async function Document({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <div>{JSON.stringify(slug)}</div>;
}
