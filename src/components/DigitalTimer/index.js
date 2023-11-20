// Write your code here
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    TimerElapsedInSeconds: 0,
    TimerLimitInMinutes: 25,
    }
  componentWillUnmount(){
    this.clearIntervalTimer()
  }
  clearIntervalTimer = () => clearInterval(this.intervalId)
  onDecreaseTimer = () => {
      const {TimerLimitInMinutes} = this.state
      if (TimerLimitInMinutes > 1) {
        this.setState(prevState => ({TimerLimitInMinutes: prevState - 1}))
      }
    }
    onIncreaseTimer = () => {
      const {TimerLimitInMinutes} = this.state
      this.setState(prevState => ({TimerLimitInMinutes: prevState+1}))
    }
  renderTimeLimiter = () => {
    return(
    <div>
      <h1>Set Timer limit</h1>
        <div>
          <button type="button" onClick={this.onDecreaseTimer}>
            -
          </button>
          <p>{TimerLimitInMinutes}</p>
          <button type="button" onClick={this.onIncreaseTimer}>
              +
          </button>
        </div>
    </div>
    )
 }

  resetTimer = () => {
    this.clearIntervalTimer()
    this.setState({
      isTimerRunning: false,
      TimerElapsedInSeconds: 0,
      TimerLimitInMinutes: 25,
    })
}
  IncrementElapsedTimer = () => {
    const {isTimerRunning,TimerElapsedInSeconds} = this.state
    const isTimerCompleted = TimerElapsedInSeconds === TimerLimitInMinutes * 60
    if (isTimerCompleted) {
        this.clearIntervalTimer()
        this.setState({TimerElapsedInSeconds: 0})
    } else {
        this.setState(prevState => ({TimerElapsedInSeconds: prevState.TimerElapsedInSeconds + 1}))        
    }
  }
  startOrPauseTimer = () => {
    const {isTimerRunning,TimerElapsedInSeconds,TimerLimitInMinutes} = this.state
    const isTimerCompleted = TimerElapsedInSeconds === TimerLimitInMinutes * 60
      if (isTimerCompleted) {
        this.setState({TimerElapsedInSeconds: 0})
      }
      if (isTimerRunning) {
          this.clearIntervalTimer()
      }
      else {
          this.intervalId = this.setInterval(this.IncrementElapsedTimer, 1000)
          }
          this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      }
    }
  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png' : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startOrPauseText = isTimerRunning ? 'Start' : 'Pause'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
        <div>
        <div>
            <button type="button" onClick = {this.startOrPauseTimer}>
                <img src={startOrPauseImageUrl} alt = {startOrPauseAltText}/>
            </button>
            <p>{startOrPauseText}</p>
        </div>
        <div>
            <button type="button" onClick={this.resetTimer}>
                <img src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png" alt="reset icon"/>
            </button>
            <p>Reset</p>
        </div>
        </div>
    )
  }

  getTimerElapsed = () => {
    const {TimerElapsedInSeconds, TimerLimitInMinutes} = this.state
    const TimerRemainingSeconds = TimerLimitInMinutes * 60 - TimerElapsedInSeconds
    const minutes = Math.floor(TimerRemainingSeconds/60)
    const seconds = Math.floor(TimerRemainingSeconds%60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning? 'Running' : 'Paused'
    return(
      <div>
          <h1>Digital Timer</h1>
          <div>
            <h1>{this.getTimerElapsed}</h1>
            <p>{labelText}</p>
          </div>
          <div>
              {this.renderTimeController}
              {this.renderTimeLimiter}
          </div>
      </div>
    )
  }
}

export default DigitalTimer
