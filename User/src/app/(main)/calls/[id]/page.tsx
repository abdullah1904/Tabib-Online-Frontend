import Call from "@/components/calls/Call";

type Props = {
  params: Promise<{ id: string }>
}

const CallPage = async ({params}: Props) => {
    const {id} = await params;
  return (
    <Call appointmentId={id}/>
  )
}

export default CallPage