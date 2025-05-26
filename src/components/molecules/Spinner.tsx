import TubeSpinner from '../../assets/svgs/TubeSpinner'

const Spinner = ({
  classes,
  widthInRem
}: {
  classes: string
  widthInRem: number
}) => (
  <div className={classes}>
    <TubeSpinner widthInRem={widthInRem} />
  </div>
)

export default Spinner
