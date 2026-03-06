export default function Page({ params }: { params: { username: string } }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Route works</h1>
      <p>{params.username}</p>
    </div>
  )
}