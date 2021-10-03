export const Timer = function () {
  return (() => {
    let isPending = false;
    let isRunning = false;
    let isFinish = false;
    let currentSec = 60;
    let currentMin = 0;
    let interval = '';

    let $targetDom = '';
    let $pomoStatusDom = '';
    let $pomoStartDom = '';
    let $pomoPauseDom = '';
    let $pomoStopDom = '';
    let $headerPomoTimeCountDom = '';
    let $headerCustomCheckboxDom = '';

    let callbackFnc = {};

    return {
      startCountDownTimer: function () {
        $pomoStatusDom.classList.remove('hidden');
        $pomoStartDom.classList.add('hidden');
        $pomoPauseDom.classList.add('hidden');
        $pomoStopDom.classList.remove('hidden');

        interval = setInterval(() => {
          if (isFinish) {
            $targetDom.innerHTML = '';
            $headerPomoTimeCountDom.innerHTML = '';
            $headerCustomCheckboxDom.checked = true;
            clearInterval(interval);
            $pomoStatusDom.classList.add('hidden');
            this.stopCountDownTimer();
            callbackFnc.finishEvnet();
            isFinish = false;
            currentMin = 0;
            currentSec = 60;
          }
          if (!isPending) {
            currentSec -= 1;
            if (currentSec === 0 && currentMin === 0) {
              isFinish = true;
              $targetDom.innerHTML = '00:00';
              $headerPomoTimeCountDom.innerHTML = '00:00';
              return;
            }
            if (currentSec == 0) {
              currentSec = 59;
              currentMin -= 1;
            }

            const min = ('0' + currentMin).slice(-2);
            const sec = ('0' + currentSec).slice(-2);

            const currentTime = `${min}:${sec}`;

            console.log({ currentTime });
            if (currentSec >= 0 && currentMin >= 0) {
              $targetDom.innerHTML = currentTime;
              $headerPomoTimeCountDom.innerHTML = currentTime;
            }
          }
        }, 500);
      },
      pauseCountDownTimer: function () {
        $pomoStartDom.classList.add('hidden');
        $pomoPauseDom.classList.remove('hidden');
        $pomoStopDom.classList.add('hidden');
        this.setPending(true);
      },
      stopCountDownTimer: function () {
        $pomoStartDom.classList.remove('hidden');
        $pomoPauseDom.classList.add('hidden');
        $pomoStopDom.classList.add('hidden');
        this.setPending(true);
      },
      setMinute: (min) => {
        currentMin = min - 1;
      },
      setIsRunning: (arg) => {
        return (isRunning = arg), arg;
      },
      getIsRunning: () => {
        return isRunning;
      },
      setPending: (pending) => {
        console.log('setPending');
        return (isPending = pending), pending;
      },
      getPending: () => {
        console.log('getPending');
        return isPending;
      },
      setTargetDom: (targetDom) => {
        $targetDom = targetDom;
      },
      setStatusDom: ({
        $pomoStatus,
        $pomoStart,
        $pomoPause,
        $pomoStop,
        $headerPomoTimeCount,
        $headerCustomCheckbox,
      }) => {
        $pomoStatusDom = $pomoStatus;
        $pomoStartDom = $pomoStart;
        $pomoPauseDom = $pomoPause;
        $pomoStopDom = $pomoStop;
        $headerPomoTimeCountDom = $headerPomoTimeCount;
        $headerCustomCheckboxDom = $headerCustomCheckbox;
      },
      finishTodo: (event) => {
        callbackFnc.finishEvnet = event;
      },
    };
  })();
};
