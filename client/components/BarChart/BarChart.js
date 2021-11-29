import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'


/**
 * @description Bar chart component.
 * @todo Make the size more modular. with e.g. props 
 * @param {Object} Dataset dataset from an API. JSON format
 * @returns d3js rendered bar chart
 */
const BarChart = () => {
  const dataset = useContext(DataContext)
  console.log(dataset)

  const ref = useD3(
    (svg) => {
      const dimensions = {
        margin: {t:20, r: 20, b: 30, l: 40},
        get width() {return 600 - this.margin.l - this.margin.r},
        get height() {return 600 - this.margin.t - this.margin.b}
      }

      const xscale = d3
        .scaleBand()
        .domain(dataset.map(d=> d.name))
        .range([0, dimensions.width])
        .padding(0.2)

      const yscale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d=> {return d.rating})])
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

      svg.select('.x-axis').call(xaxis)      
      svg.select('.y-axis').call(yaxis)
      
      svg
        .select('.plot-area')
        .selectAll('rect')
        .data(dataset)
        .join(
          (enter) => {
            const r = enter.append('rect')
            r
              .style('opacity', 0.75)
              .append('title')
            return r
          },
          (update) => {
            return update.transition().style('fill', '#DC5A41')
          },
          (exit) => {return exit.remove()}
        )
      .attr('class', 'bar') //Why give it a class?
      .attr('x', (d) => {return xscale(d.name)})
      .attr('width', xscale.bandwidth())
      .attr('y', (d) => {return yscale(d.rating)})
      .transition()
      .style('fill', '#B61544')
      .attr('height', (d) => {return dimensions.height - yscale(d.rating)})  
      .select('title').text(d => {return `${d.name}: ${d.rating}`});
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
    ,[dataset.length])

  return (
    <svg
      ref={ref}
    >
      <g className="plot-area"></g>
      <g className="x-axis"></g>
      <g className="y-axis"></g>
    </svg>
  )
}

export default BarChart