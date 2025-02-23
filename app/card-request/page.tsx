import Menu from "../../components/Menu";
import CardRequests from "./CardRequests";

function page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Card Request" />
      <CardRequests />
    </div>
  );
}

export default page;
