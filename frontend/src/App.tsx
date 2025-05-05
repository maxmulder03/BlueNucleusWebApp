import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="flex flex-col h-screen min-h-0 mx-auto my-2 w-[95%]">
      <QueryClientProvider client={queryClient}>
        <div className="flex justify-between items-center px-9 text-xs font-extrabold text-[var(--foreground2)] mr-10">
          <pre className="text-start pl-9 text-xs font-extrabold text-[var(--foreground2)]">
            {String.raw`
__________.__                   _______                .__                       
\______   \  |  __ __   ____    \      \  __ __   ____ |  |   ____  __ __  ______
 |    |  _/  | |  |  \_/ __ \   /  |    \|  |  \_/ ___\|  | _/ __ \|  |  \/  ___/
 |    |   \  |_|  |  /\  ___/  /   |     \  |  /\  \___|  |_\  ___/|  |  /\___ \ 
 |________/____/____/  \____>  \___|_____/____/  \_____>____/\____>_____//______>
          `}
          </pre>
          <pre className="m-0 text-sm text-end">
            <pre>© 2025 Blue Nucleus</pre>
            <pre>user: max-mulder</pre>
            <pre>{new Date().toLocaleString()}</pre>
          </pre>
        </div>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
