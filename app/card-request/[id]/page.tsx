import Menu from "../../../components/Menu";
import CardRequestDetails from "./CardRequestDetails";

function Page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Card Request" subtitle="Request Details" />
      <CardRequestDetails />
    </div>
  );
}

export default Page;
