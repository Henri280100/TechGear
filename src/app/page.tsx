import Landing from "./landing/page";
import ReactQueryProvider from "./ReactQueryProvider";

export default function Home() {
  return (
    <ReactQueryProvider>
      <Landing/>
    </ReactQueryProvider>
  );
}
