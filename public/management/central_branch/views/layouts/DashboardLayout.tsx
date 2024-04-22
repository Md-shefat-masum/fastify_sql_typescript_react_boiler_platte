import React, { useState } from 'react';
import CommonAppWindow from '../components/CommonAppWindow';
import AppNav from './shared/AppNav';

export interface Props {}

const DashboardLayout: React.FC<Props> = (props: Props) => {
    const [left, setleft] = useState(100);
    const [top, settop] = useState(100);
    const [height, setheight] = useState(100);
    const [width, setwidth] = useState(100);
    const [rotateAngle, setrotateAngle] = useState(0);

    const handleResize = (style, isShiftKey, type) => {
        // type is a string and it shows which resize-handler you clicked
        // e.g. if you clicked top-right handler, then type is 'tr'
        let { top, left, width, height } = style;
        top = Math.round(top);
        left = Math.round(left);
        width = Math.round(width);
        height = Math.round(height);

        setleft(left);
        settop(top);
        setwidth(width);
        setheight(height);
    };

    const handleRotate = (rotateAngle) => {
        setrotateAngle(rotateAngle);
    };

    const handleDrag = (deltaX, deltaY) => {
        setleft(left + deltaX);
        settop(top + deltaY);
    };

    return (
        <div>
            <div className="app_body">
                <div className="app_window">
                    {/* <CommonAppWindow></CommonAppWindow> */}
                </div>
                <div>
                    <div className="home_time_and_date">
                        <div className="home_time_and_date_body">
                            <div className="date">
                                <div className="day">Monday</div>
                                <div className="month">
                                    <div className="month_name">April</div>
                                    <div className="">22</div>
                                </div>
                            </div>
                            <div className="time">
                                <div className="amt hour">01</div>
                                <div className="divider">:</div>
                                <div className="amt min">18</div>
                                <div className="divider">:</div>
                                <div className="amt sec">56</div>
                                <div className="med">am</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppNav />
        </div>
    );
};
export default DashboardLayout;
