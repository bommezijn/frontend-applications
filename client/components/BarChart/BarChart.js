import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'


/**
 * @description Bar chart component.
 * @todo Make the size more modular. with e.g. props 
 * @param {Object} Dataset dataset from an API. JSON format
 * @returns d3js rendered bar chart
 */
const BarChart = ({dataset}) => {

  const ref = useD3(
    (svg) => {
      const dimensions = {
        margin: {t:20, r: 20, b: 30, l: 40},
        get width() {return 600 - this.margin.l - this.margin.r},
        get height() {return 600 - this.margin.t - this.margin.b}
      }

      const xscale = d3
        .scaleBand()
        .range([0, dimensions.width])
        .padding(0.2)

      const yscale = d3
        .scaleLinear()
        .range([dimensions.height, 0])
      
      const xaxis = g =>
        g
        .attr('transform', `translate(0, ${dimensions.height - dimensions.margin.b})`)
        .attr('class', 'x axis')
        .call(d3.axisBottom(xscale))
      
      const yaxis = g => 
      g
        // .attr('tranform', `translate(${dimensions.height})`)
        .attr('class', 'y axis')
        .call(d3.axisLeft(yscale))

      
      /* 
      const xAxis = g => 
      g
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${dimensions.height - margin.b})`)
        .call(d3.axisBottom(x))

      const yAxis = g => 
        g
          .attr('class', 'x axis')
          .attr('transform', `translate(${margin.l},0)`)
          .call(d3.axisLeft(yscale))
      */


    }
    ,[])

  return (
    <svg>
      <g className={styles.plot-area}></g>
      <g className={styles.x-axis}></g>
      <g className={styles.y-axis}></g>
    </svg>
  )
}