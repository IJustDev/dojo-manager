import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";
import { Navbar } from "../components/navbar/navbar";

export function Analytics({ studentsRepository, mastersRepository }) {
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setMembersCount(await studentsRepository.count());
    };

    fetch();
  }, []);
  const data = [
    { month: "January", members: 43 },
    { month: "February", members: 45 },
    { month: "March", members: 46 },
    { month: "April", members: 50 },
    { month: "June", members: 56 },
    { month: "July", members: 62 },
    { month: "August", members: 60 },
    { month: "October", members: 65 },
  ];
  return (
    <>
      <header>
        <Navbar></Navbar>
        <h1>
          ✨ Your Dojo in <u>Numbers</u> 🥋
        </h1>
        <p>This is how you're doing at a glance </p>

        <section>
          <aside>
            <h3>New registrations this month</h3>
            <p>5</p>
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
            data={data}
            x={"month"}
            y={"members"}
            style={{ data: { fill: "#2596be", cornerRadius: "5px" } }}
          />
        </VictoryChart>
      </header>
    </>
  );
}
