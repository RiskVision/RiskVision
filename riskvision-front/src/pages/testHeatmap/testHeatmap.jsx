import React, { Component } from "react";
import Chart from "react-apexcharts";

class Heatmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "scatter"
        },
         xaxis: {
          tickAmount: 5,
        },
        yaxis: {
          tickAmount: 5,
        }, 
       },

      series: [{
        name: "Riesgo A",
        data: [
        [3, 4]]
      },{
        name: "Riesgo B",
        data: [
        [2, 5]]
      },{
        name: "Riesgo C",
        data: [
        [1,1]]
      }]
    };
  }

  render() {
    return (
      <div className="scatter">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="scatter"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Heatmap;