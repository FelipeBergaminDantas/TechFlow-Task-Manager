import { TaskBoard } from "@/components/TaskBoard";
import { ThemeProvider } from "next-themes";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TaskBoard />
    </ThemeProvider>
  );
};

export default Index;
