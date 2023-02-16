import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import dayjs from "dayjs";
import { numberSimple } from "../../helpers";

const Day = forwardRef(
  (
    {
      dateIndex,
      dataPrice,
      dateValue,
      selected,
      hovered,
      disabled,
      onSelectDate,
      onHoverDate,
      isEndDay,
      totalDay,
      highlight,
      handleHoverDay,
      language,
    },
    ref
  ) => {
    const stringDate = dayjs(dateValue).format("YYYY-MM-DD");

    function selectDate(e) {
      e.stopPropagation();
      e.preventDefault();
      if (disabled) return;
      onSelectDate(dateValue);
    }

    function handleHoverDate() {
      if (disabled || !onHoverDate) return;
      onHoverDate(dateValue);
      handleHoverDay(dateValue);
    }

    return (
      <div
        className={cx("day", {
          selected,
          hovered,
          disabled,
          highlight,
          end: isEndDay,
        })}
        onClick={selectDate}
        onMouseEnter={handleHoverDate}
        role="button"
        tabIndex="-1"
        data-day-index={dateIndex}
        data-date-value={dateValue}
      >
        {hovered &&
          !(isEndDay && dateIndex === totalDay) &&
          !(dateIndex === 1 && selected && !isEndDay) && (
            <div
              className={cx("background-day", {
                "first-day": dateIndex === 1,
                "last-day": dateIndex === totalDay,
              })}
            />
          )}
        <div className="text-day">{dateIndex}</div>
        <div className="text-price">
          {dataPrice?.[stringDate]?.prices
            ? numberSimple(dataPrice?.[stringDate]?.prices, language)
            : "--"}
        </div>
      </div>
    );
  }
);

Day.propTypes = {
  dateIndex: PropTypes.number,
  dataPrice: PropTypes.object,
  dateValue: PropTypes.string,
  isEndDay: PropTypes.bool,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelectDate: PropTypes.func,
  onHoverDate: PropTypes.func,
  totalDay: PropTypes.number,
  highlight: PropTypes.bool,
  handleHoverDay: PropTypes.func,
  language: PropTypes.string,
};

Day.defaultProps = {
  dateIndex: null,
  dataPrice: null,
  dateValue: null,
  isEndDay: false,
  selected: false,
  hovered: false,
  disabled: false,
  totalDay: null,
  onSelectDate: () => {},
  onHoverDate: () => {},
  highlight: false,
  handleHoverDay: () => {},
  language: "",
};

export default Day;
