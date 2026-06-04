export default function InternshipRequestDetail({ params }) {
  const { id } = params || {}

  return (
    <div>
      <h1>Internship Request #{id ?? 'detail'}</h1>
      <p>Details are not implemented yet.</p>
    </div>
  )
}
