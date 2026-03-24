import MainLayout from "@/components/layout/main";
import UserSidebar from "@/components/layout/UserSidebar";

const UserLayout = ({children}) => {
  return (
    <MainLayout>
    <div className="flex max-w-7xl mx-auto p-6 gap-8">
      <UserSidebar />
      <div className="flex-1">
      {children}
      </div>
    </div>
    </MainLayout>

  );
};

export default UserLayout;
