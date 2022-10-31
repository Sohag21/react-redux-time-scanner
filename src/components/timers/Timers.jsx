import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify';

const Timers = ({ taskList }) => {
    const dataset = [...taskList].sort((a, b) => (a.duration < b.duration ? -1 : 1));

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 80));
        time.s === 0 && toast(dataset[0]?.name + ' is starting!')
    };

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m;

    const run = () => {
        if (updatedS === 60) {
            updatedS = 0;
        }
        if (updatedM === 76) {
            updatedS++;
            updatedM = 0;
            updatedS < dataset?.length && toast(dataset[updatedS]?.name + ' is starting!');
        }
        updatedMs++;
        updatedM++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM });
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };
    const resume = () => start();
    

    useEffect(() => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0 })
    }, [time.s === dataset.length]);

    return (
        <div className='time-layout'>
            
            <div className="timers-header">
                <h3 className="timers-title">Live Time</h3>
                <div>
                {(status === 0) &&
                    <Button variant='info'
                        onClick={start}>Start</Button>
                }

                {(status === 1) &&
                    <div>
                        <Button variant='danger'
                            onClick={stop}>Stop</Button>
                            <span>Your time is on!</span>
                    </div>
                }

                {(status === 2) &&
                    <div>
                        <Button variant='warning'
                            onClick={resume}>Resume</Button>
                        <span>Restart your time</span>
                    </div>
                }
                </div>
            </div>
            <div className="timers-content">
                <ul>
                    <span style={{ top: `${time.ms}px` }} className='time-scanner'></span>
                    {
                        taskList &&
                        dataset?.map((data) => {
                            if (data?.duration <= 60) {
                                return (
                                    <li>
                                        <h5>{data?.name}</h5>
                                        <span>{data?.duration} seconds</span>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Timers