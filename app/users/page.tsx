import UserList from "@/components/UserList";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Users from DB</h1>
      <UserList />
    </div>
  );
}
