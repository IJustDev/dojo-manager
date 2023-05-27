import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";
import { Navbar } from "../components/navbar/navbar";
import { useDataAccess } from "../data-access/data-layer";

const useAnalyticsDataProvider = (studentsRepository) => {
  const [loading, setLoading] = useState(true);
  const [membersCount, setMembersCount] = useState(0);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const items = (await studentsRepository.list());

      setMembersCount(items.length);
      setChartData([
        { month: "January", members: 43 },
        { month: "February", members: 45 },
        { month: "March", members: 46 },
        { month: "April", members: 50 },
        { month: "June", members: 56 },
        { month: "July", members: 62 },
        { month: "August", members: 60 },
        { month: "October", members: 65 },
      ]);
      setLoading(false);
    }
    fetch();
  }, []);

  return {
    loading,
    membersCount,
    chartData
  }
}

export function Analytics({}) {
  const {studentsRepository} = useDataAccess();

  const { loading, membersCount, chartData } = useAnalyticsDataProvider(studentsRepository);

  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>
          ✨ Your Dojo in <u>Numbers</u> 🥋
        </h1>
        <p>This is how you're doing at a glance </p>

        {loading ? <p>Loading your data. Please stand by...</p> :
          <>
            <section>
              <aside>
                <h3>New registrations this month</h3>
                <p>{membersCount}</p>
              </aside>
              <aside>
                <h3>Active members</h3>
                <p>
                  {membersCount} <sup>+ 5 this month</sup>
                </p>
              </aside>
              <aside>
                <h3>Revenue</h3>
                <p>4.480 €</p>
              </aside>
            </section>
            <VictoryChart>
              <VictoryBar
                data={chartData}
                x={"month"}
                y={"members"}
                style={{ data: { fill: "#2596be", cornerRadius: "5px" } }}
              />
            </VictoryChart>
          </>
        }
      </header>
    </>
  );
}
