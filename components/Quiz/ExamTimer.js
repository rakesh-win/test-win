import { Timer } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Alert from 'react-popup-alert';
import { useTimer } from 'react-timer-hook';

const ExamTimer = ({ onTimerUpdate }) => {
  const [alert, setAlert] = useState({
    type: 'ok',
    text: '',
    show: false
  });
  const [alertShown, setAlertShown] = useState(false);

  // Timer hook
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600); // 10 seconds for testing
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => handleExpire()
  });

  useEffect(() => {
    // Update the timer display every second
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    onTimerUpdate(formatTime(totalSeconds));
  }, [hours, minutes, seconds, onTimerUpdate]);

  const handleExpire = () => {
    onShowAlert('error', "Time for the exam has expired. You will be shown your score card shortly. The quiz will be automatically submitted in 5 seconds. Please do not refresh the page.");
  };

  const onCloseAlert = () => {
    setAlert({
      type: '',
      text: '',
      show: false
    });
  };

  const onShowAlert = (type, text) => {
    setAlert({
      type: type,
      text: text,
      show: true
    });
    setAlertShown(true);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <>
      <Alert
        header={'Alert'}
        btnText={'Close'}
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
        alertStyles={{}}
        headerStyles={{}}
        textStyles={{}}
        buttonStyles={{}}
      />
      <span><Timer /> {formatTime(hours * 3600 + minutes * 60 + seconds)}</span>
    </>
  );
};

export default ExamTimer;
