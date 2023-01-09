import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import dayjs from "dayjs";

import Week from "./Week";
import { getMonthInfo, getWeekDay } from "../../helpers";

const MonthCalendar = forwardRef(
  (
    {
      dataPrice,
      hidden,
      month,
      year,
      onSelectDate,
      onHoverDate,
      fromDate,
      toDate,
      hoverDate,
      isAnimating,
      startWeekDay,
      minDate,
      maxDate,
      disableDate,
      monthFormat,
      weekDayFormat,
      isSingle,
      highlightToday,
      singleCalendar,
      handleHoverDay,
    },
    ref
  ) => {
    function generateWeek() {
      const { totalWeek, totalDay } = getMonthInfo(year, month, startWeekDay);

      return totalWeek.map((week, index) => (
        <Week
          // eslint-disable-next-line react/no-array-index-key
          dataPrice={dataPrice}
          key={index}
          week={week}
          month={month}
          year={year}
          isFirst={index === 0}
          onSelectDate={onSelectDate}
          onHoverDate={onHoverDate}
          fromDate={fromDate}
          toDate={toDate}
          hoverDate={hoverDate}
          totalDay={totalDay}
          minDate={minDate}
          maxDate={maxDate}
          disableDate={disableDate}
          isSingle={isSingle}
          weekIndex={index}
          highlightToday={highlightToday}
          handleHoverDay={handleHoverDay}
          ref={ref}
        />
      ));
    }

    function generateWeekDay() {
      const arrWeekDay = getWeekDay(startWeekDay, weekDayFormat);

      return arrWeekDay.map((day, index) => (
        <div className="weekday" key={index}>
          {day}
        </div>
      ));
    }

    return (
      <div
        className={cx("month-calendar", {
          isAnimating,
          hidden,
          single: singleCalendar,
        })}
        data-month-index={month + 1}
      >
        <div className="month-name">
          {monthFormat
            ? dayjs(`${year}-${month + 1}-1`).format(monthFormat)
            : dayjs(`${year}-${month + 1}-1`).format("MMMM YYYY")}
        </div>
        <div className="weekdays">{generateWeekDay()}</div>
        <div className="week-container">{generateWeek()}</div>
      </div>
    );
  }
);

MonthCalendar.propTypes = {
  dataPrice: PropTypes.object,
  month: PropTypes.number,
  year: PropTypes.number,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  hoverDate: PropTypes.instanceOf(Date),
  hidden: PropTypes.bool,
  isAnimating: PropTypes.bool,
  startWeekDay: PropTypes.string,
  weekDayFormat: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disableDate: PropTypes.instanceOf(Date),
  monthFormat: PropTypes.string,
  isSingle: PropTypes.bool,
  highlightToday: PropTypes.bool,
  singleCalendar: PropTypes.bool,
  handleHoverDay: PropTypes.func,
};

MonthCalendar.defaultProps = {
  dataPrice: null,
  month: null,
  year: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  fromDate: null,
  toDate: null,
  hoverDate: null,
  hidden: false,
  isAnimating: false,
  startWeekDay: null,
  weekDayFormat: "",
  minDate: null,
  maxDate: null,
  disableDate: null,
  monthFormat: "",
  isSingle: false,
  highlightToday: false,
  singleCalendar: false,
  handleHoverDay: () => {},
};

export default MonthCalendar;
