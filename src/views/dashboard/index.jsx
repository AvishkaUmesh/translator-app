import Card from "components/card";

const Dashboard = () => {
  return (
    <div>
      {/* Tables & Charts */}

      <div className="grid grid-cols-1 gap-5 mt-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <Card extra={"w-full h-full sm:overflow-auto px-6"}>
            <header className="relative flex items-center justify-between pt-4">
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                hello world
              </div>
            </header>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
