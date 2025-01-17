import { AddLink, LinkList } from "~/features/link";

export default function Home() {
  return (
    <div className="max-w-80 mx-auto pt-24">
      <Header />
      <LinkList />
      <AddLink />
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex mb-10 sticky justify-between">
      <div className="flex items-center gap-2">
        <div className="grid place-items-center text-sm bg-white size-5 rounded-full">
          🧠
        </div>
        Almas
      </div>

      <div className="grid place-items-center text-sm bg-white size-5 rounded-full">
        🧠
      </div>
    </div>
  );
};
