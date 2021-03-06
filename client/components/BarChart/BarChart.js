import useD3 from '../../hooks/useD3'
import * as d3 from 'd3'
import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'
import styles from '../BarChart/BarChart.module.css'


/**
 * @description Bar chart component.
 * @todo Make the size more modular. with e.g. props 
//  * @param {Object} Dataset dataset from an API. JSON format
 * @param {Number} chartHeight Height of SVG in px
 * @param {Number} chartWidth Width of SVG in px
 * @param {String} string X scale values, must be strings
 * @param {String} numerical Y scale values, must be a numerical value
 * @param {Object} dataset Data you wish to show. If empty string default to DataContext
 * @returns d3js rendered bar chart
 */


const BarChart = ({dataset, string, numerical, chartWidth, chartHeight}) => {
  const dimensions = {
    margin: { t: 20, r: 20, b: 30, l: 40 },
    get width() { return chartWidth - this.margin.l - this.margin.r },
    get height() { return chartHeight - this.margin.t - this.margin.b }
  }

  dataset == '' ? dataset = useContext(DataContext) : dataset

  const ref = useD3(
    (svg) => {
      const xscale = d3
        .scaleBand()
        .domain(dataset.map(d => d[string]))
        .range([0, dimensions.width])
        .padding(0.2)

      const yscale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, d => { return d[numerical] })])
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
        .attr('className', `${styles.bar}`) //Why give it a class?
        .attr('x', (d) => { return xscale(d[string]) })
        .attr('width', xscale.bandwidth())
        .attr('y', (d) => { return yscale(d[numerical]) })
        .transition()
        .style('fill', '#B61544')
        .attr('height', (d) => { return dimensions.height - yscale(d[numerical]) })
        .select('title').text(d => { return `${d[string]}: ${d[numerical]}` });
    }
    , [dataset])

    const graph =
    <svg
      ref={ref}
      className={styles.graph}
      style={{
        width: `${chartWidth}`,
        height: `${chartHeight}`,
        transform: `translate(${dimensions.margin.l}, ${dimensions.margin.t})`
      }}
    >
      <g 
      style={{transform: `translate(${dimensions.margin.l}px, ${dimensions.margin.t}px)`}}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </g>
    </svg>

  return (
    <>
      {dataset ? graph : <h1>Waiting for data</h1>}
    </>
  )
}

export default BarChart