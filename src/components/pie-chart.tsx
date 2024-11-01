import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieChartProps {
  characters: DisneyCharacter[];
}

const PieChart = ({ characters }: PieChartProps) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: "400px",
    },
    title: {
      text: "Participation in shows by Disney characters",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Characters",
        data: characters?.map((character) => ({
          name: character.name,
          y: character.tvShows.length,
        })),
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-9">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const csv = characters.map((character) => `${character.name},${character.tvShows.length}`).join("\n");
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "disney-characters.csv";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export to CSV
      </button>
    </div>
  );
};

export default PieChart;
