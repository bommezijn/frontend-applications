const { useEffect, useRef } = require('react');
import * as d3 from 'd3';

/**
 * @description Custom useEffect hook to make d3.js work. Ref Hook persist values between renders.
 * @param {Function} renderChart Function that renders a chart based on the given param.
 * @param {Array} dependencies List of dependencies when useEffect is being activated.
 */
const useD3 = (renderChart, dependencies) => {
  const ref = useRef()

  useEffect(() => {
    renderChart(d3.select(ref.current))
    return () => {}
  }, [...dependencies])
  return ref
}

export default useD3