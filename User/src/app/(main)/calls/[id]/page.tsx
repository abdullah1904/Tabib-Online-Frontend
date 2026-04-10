
type Props = {
  params: Promise<{ id: string }>
}

const CallPage = async ({params}: Props) => {
    const {id} = await params;
  return (
    <div>
        {id }
    </div>
  )
}

export default CallPage