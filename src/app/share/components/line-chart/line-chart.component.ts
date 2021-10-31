import {Attribute, Component, Input, ViewChild} from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent {
  @Input() set data(items: any[]){
    const data: number[] = [];
    const categories: any[] = [];
    items.forEach(item => {
      const count = item.reduce((sum: number, item: any)=>{ return sum + item?.value;}, 0);
      data.push(count);
      categories.push(item[0].key);
    });

    this.series[0].data = data.reverse();

    this.xaxis = {
      categories: categories.reverse()
    }

    this.yaxis.max = Math.max(...data) + 3;
  }

  series: ApexAxisChartSeries = [];
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;

  @ViewChild('chart', {static: true}) chartRef: ChartComponent | undefined;

  constructor(
    @Attribute('label') public label: string,
    @Attribute('yaxisLabel') public yaxisLabel: string,
  ) {
    this.series = [
      {
        name: yaxisLabel,
        data: []
      }
    ];
    this.chart = {
      height: 350,
      type: "line"
    };
    this.title = {
      text: label,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 700
      }
    };
    this.xaxis = {
      categories: []
    }
    this.yaxis = {
      min: 0,
      max: 10,
      tickAmount: 5,
      title: {
        text: yaxisLabel,
        style: {
          fontWeight: 600
        }
      }
    }
  }
}
