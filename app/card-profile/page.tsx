import Menu from "../../components/Menu";
import CardProfile from "./CardProfile";

function page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Card Profile" />
      <CardProfile />
    </div>
  );
}

export default page;
