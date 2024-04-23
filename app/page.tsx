import RobotsFetcher from "@/components/RobotsFetcher";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center">
        <h1 className="text-6xl m-24">Robots.txt 檢查</h1>
        <RobotsFetcher />
      </div>
    </>
  );
}
