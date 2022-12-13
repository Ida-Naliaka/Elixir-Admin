import Chart from "../../Components/chart/chart";
import "./home.css";
import FeaturedInfo from "../../Components/featuredInfo/featuredInfo";
import { userData } from "../../dummyData";
import WidgetSm from "../../Components/WidgetSm/WidgetSm";
import WidgetLg from "../../Components/WidgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ActiveTabState } from "../../Context/ActiveTabProvider";


function Home() {
  const [userStats, setUserStats] = useState(userData);
  const user = useSelector((state) => state.user.currentUser);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.get(`/api/users/stats`, config).then((res) => {
          const userData = res.data;
          userData.map((item) =>
            setUserStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], "Active User": item.total },
            ])
          );
        });
      } catch {}
    };
    getStats();
    // eslint-disable-next-line
  }, [MONTHS]);
  return (
    <>
      <div className="home">
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </>
  );
}
export default Home;
