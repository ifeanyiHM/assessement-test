import ComingSoon from "../../components/ComingSoon";
import Menu from "../../components/Menu";

function page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Branches" />
      <ComingSoon title="Branches" />
    </div>
  );
}

export default page;
