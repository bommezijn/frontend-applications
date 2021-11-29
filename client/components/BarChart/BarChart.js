import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'
import styles from '../BarChart/BarChart.module.css'


/**
 * @description Bar chart component.
 * @todo Make the size more modular. with e.g. props 
 * @param {Object} Dataset dataset from an API. JSON format
 * @returns d3js rendered bar chart
 */
const BarChart = ({dWidth, dHeight}) => {
  const dimensions = {
    margin: { t: 20, r: 20, b: 30, l: 40 },
    get width() { return dWidth - this.margin.l - this.margin.r },
    get height() { return dHeight - this.margin.t - this.margin.b }
  }
  const dataset = useContext(DataContext)
  console.log(dataset)

  const ref = useD3(
    (svg) => {
      const xscale = d3
        .scaleBand()
        .domain(dataset.map(d => d.name))
        .range([0, dimensions.width])
        .padding(0.2)

      const yscale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => { return d.rating })])
        .range([dimensions.height, 0])

      const xaxis = g =>
        g
          .attr('transform', `translate(0, ${dimensions.height})`)
          .attr('class', 'x-axis')
          .call(d3.axisBottom(xscale))

      const yaxis = g =>
        g
          .attr('tranform', `translate(${dimensions.height})`)
          .attr('class', 'y-axis')
          .call(d3.axisLeft(yscale))

      svg.select('.x-axis').call(xaxis)
        .selectAll('text')
        .attr('transform', `translate(-10,0) rotate(-45)`)
        .style('text-anchor', 'end');
      svg.select('.y-axis').transition().call(yaxis)

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
          (exit) => { return exit.remove() }
        )
        .transition()
        .ease(d3.easeQuadIn)
        .delay((d, i) => { return i * 80 })
        .attr('class', 'bar') //Why give it a class?
        .attr('x', (d) => { return xscale(d.name) })
        .attr('width', xscale.bandwidth())
        .attr('y', (d) => { return yscale(d.rating) })
        .transition()
        .style('fill', '#B61544')
        .attr('height', (d) => { return dimensions.height - yscale(d.rating) })
        .select('title').text(d => { return `${d.name}: ${d.rating}` });
    }
    , [dataset.length])

  return (
    <svg
      ref={ref}
      className={styles.graph}
      style={{
        transform: `translate(${dimensions.margin.l}, ${dimensions.margin.t})`
      }}
    >
      <g style={{transform: `translate(${dimensions.margin.l}px, ${dimensions.margin.t}px)`}}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </g>
    </svg>
  )
}

export default BarChart