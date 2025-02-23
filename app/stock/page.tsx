import ComingSoon from "../../components/ComingSoon";
import Menu from "../../components/Menu";

function page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Stock" />
      <ComingSoon title="Stock" />
    </div>
  );
}

export default page;
