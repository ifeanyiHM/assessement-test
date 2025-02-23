import Menu from "../../../components/Menu";
import CreateProfile from "./CreateProfile";

function Page() {
  return (
    <div className="w-full">
      {" "}
      <Menu title="Card Profile" subtitle="Create Profile" />
      <CreateProfile />
    </div>
  );
}

export default Page;
