import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";
import { Navbar } from "../components/navbar/navbar";
import { useDataAccess } from "../data-access/data-layer";

const thisMonth = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

  return [firstDay, lastDay];
}

const useAnalyticsDataProvider = () => {
  const { studentsRepository, plansRepository } = useDataAccess();
  const [loading, setLoading] = useState(true);
  const [membersCount, setMembersCount] = useState(0);
  const [revenue, setRevenue] = useState(undefined);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const students = (await studentsRepository.list());

      const [first, last] = thisMonth();

      setMembersCount(students.length);

      const plansWithCount = students.reduce((plans, student) => {
        if (plans[student.plan] == undefined) {
          plans[student.plan] = 0;
        }
        plans[student.plan] = plans[student.plan] + 1;
        return plans;
      }, {});

      let rev = 0;

      for (const planId of Object.keys(plansWithCount)) {
        const plan = (await plansRepository.get(planId));
        rev += plan.pricing * plansWithCount[planId];

      }
      setRevenue(Math.ceil(rev * 100) / 100);

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
    chartData, revenue
  }
}

export function Analytics({ }) {
  const { studentsRepository } = useDataAccess();

  const { loading, membersCount, chartData, revenue } = useAnalyticsDataProvider(studentsRepository);

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
                  {membersCount} <sup>+ 1 this month</sup>
                </p>
              </aside>
              <aside>
                <h3>Current MRR</h3>
                <b>$ {revenue}</b>
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
