import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { ResumeInfoProvider } from "./context/ResumeInfoContext";
function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <ResumeInfoProvider>
      <Header />
      <Outlet />
      <Toaster />
    </ResumeInfoProvider>
  );
}

export default App;
