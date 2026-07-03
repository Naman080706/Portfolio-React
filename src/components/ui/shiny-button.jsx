// 21st.dev "shiny-cta" button — CSS lives in index.css (.shiny-cta), themed orange.
export function ShinyButton({ children, onClick, className = '' }) {
  return (
    <button className={`shiny-cta ${className}`.trim()} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}

export default ShinyButton
